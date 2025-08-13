import asyncio
import errno
import fractions
import logging
import threading
import time
from typing import Any, Literal, Optional, Union

import av
import av.container
from aiortc.mediastreams import AUDIO_PTIME, MediaStreamError, MediaStreamTrack
from av import AudioFrame, VideoFrame
from av.audio import AudioStream
from av.filter.graph import Graph
from av.frame import Frame
from av.packet import Packet
from av.video.stream import VideoStream

logger = logging.getLogger(__name__)

REAL_TIME_FORMATS = [
    "alsa",
    "android_camera",
    "avfoundation",
    "bktr",
    "decklink",
    "dshow",
    "fbdev",
    "gdigrab",
    "iec61883",
    "jack",
    "kmsgrab",
    "openal",
    "oss",
    "pulse",
    "sndio",
    "rtsp",
    "v4l2",
    "vfwcap",
    "x11grab",
]

_AudioOrVideoStream = Union[AudioStream, VideoStream]


def link_nodes(*nodes):
    for c, n in zip(nodes, nodes[1:]):
        c.link_to(n)


def player_worker_decode(
    loop: asyncio.AbstractEventLoop,
    container: av.container.InputContainer,
    streams: list[_AudioOrVideoStream],
    audio_track: "PlayerStreamTrack",
    video_track: "PlayerStreamTrack",
    quit_event: threading.Event,
    throttle_playback: bool,
    loop_playback: bool,
    rotate: Literal["0", "90", "180", "270"] = "0",
) -> None:
    audio_sample_rate = 48000
    audio_samples = 0
    audio_time_base = fractions.Fraction(1, audio_sample_rate)
    audio_resampler = av.AudioResampler(
        format="s16",
        layout="stereo",
        rate=audio_sample_rate,
        frame_size=int(audio_sample_rate * AUDIO_PTIME),
    )

    video_first_pts = None

    frame_time = None
    start_time = time.time()

    video_stream = next(s for s in streams if s.type == "video")

    video_filter = None
    if rotate != "0":
        video_filter = Graph()
        if rotate == "90":
            link_nodes(
                video_filter.add_buffer(template=video_stream),
                video_filter.add("transpose", "clock"),
                video_filter.add("buffersink"),
            )
        elif rotate == "180":
            link_nodes(
                video_filter.add_buffer(template=video_stream),
                video_filter.add("hflip"),
                video_filter.add("vflip"),
                video_filter.add("buffersink"),
            )
        elif rotate == "270":
            link_nodes(
                video_filter.add_buffer(template=video_stream),
                video_filter.add("transpose", "cclock"),
                video_filter.add("buffersink"),
            )
        video_filter.configure()

    while not quit_event.is_set():
        try:
            frame = next(container.decode(*streams))
        except Exception as exc:
            if isinstance(exc, av.FFmpegError) and exc.errno == errno.EAGAIN:
                time.sleep(0.01)
                continue
            if isinstance(exc, StopIteration) and loop_playback:
                container.seek(0)
                continue
            if audio_track:
                asyncio.run_coroutine_threadsafe(audio_track._queue.put(None), loop)
            if video_track:
                asyncio.run_coroutine_threadsafe(video_track._queue.put(None), loop)
            break

        # read up to 1 second ahead
        if throttle_playback:
            elapsed_time = time.time() - start_time
            if frame_time and frame_time > elapsed_time + 1:
                time.sleep(0.1)

        if isinstance(frame, AudioFrame) and audio_track:
            for frame in audio_resampler.resample(frame):
                # fix timestamps
                frame.pts = audio_samples
                frame.time_base = audio_time_base
                audio_samples += frame.samples

                frame_time = frame.time
                asyncio.run_coroutine_threadsafe(audio_track._queue.put(frame), loop)
        elif isinstance(frame, VideoFrame) and video_track:
            if frame.pts is None:  # pragma: no cover
                logger.warning(
                    "MediaPlayer(%s) Skipping video frame with no pts", container.name
                )
                continue

            # video from a webcam doesn't start at pts 0, cancel out offset
            if video_first_pts is None:
                video_first_pts = frame.pts
            frame.pts -= video_first_pts

            frame_time = frame.time
            if video_filter:
                video_filter.push(frame)
                _frame = video_filter.pull()
            else:
                _frame = frame
            asyncio.run_coroutine_threadsafe(video_track._queue.put(_frame), loop)


class PlayerStreamTrack(MediaStreamTrack):
    def __init__(self, player: "MediaPlayer", kind: str) -> None:
        super().__init__()
        self.kind = kind
        self._player: Optional[MediaPlayer] = player
        self._queue: asyncio.Queue[Union[Frame, Packet, None]] = asyncio.Queue()
        self._start: Optional[float] = None

    async def recv(self) -> Union[Frame, Packet]:
        if self.readyState != "live":
            raise MediaStreamError

        if self._player is None:
            raise MediaStreamError
        self._player._start(self)
        data = await self._queue.get()
        if data is None:
            self.stop()
            raise MediaStreamError
        if isinstance(data, Frame):
            data_time = data.time
        elif isinstance(data, Packet):
            if data.pts is None:
                raise MediaStreamError("Packet has no pts")
            data_time = float(data.pts * data.time_base)

        # control playback rate
        if (
            self._player is not None
            and self._player._throttle_playback
            and data_time is not None
        ):
            if self._start is None:
                self._start = time.time() - data_time
            else:
                wait = self._start + data_time - time.time()
                await asyncio.sleep(wait)

        return data

    def stop(self) -> None:
        super().stop()
        if self._player is not None:
            self._player._stop(self)
            self._player = None


class MediaPlayer:
    """
    A media source that reads audio and/or video from a file.

    Examples:

    .. code-block:: python

        # Open a video file.
        player = MediaPlayer('/path/to/some.mp4')

        # Open an HTTP stream.
        player = MediaPlayer(
            'http://download.tsi.telecom-paristech.fr/'
            'gpac/dataset/dash/uhd/mux_sources/hevcds_720p30_2M.mp4')

        # Open webcam on Linux.
        player = MediaPlayer('/dev/video0', format='v4l2', options={
            'video_size': '640x480'
        })

        # Open webcam on OS X.
        player = MediaPlayer('default:none', format='avfoundation', options={
            'video_size': '640x480'
        })

        # Open webcam on Windows.
        player = MediaPlayer('video=Integrated Camera', format='dshow', options={
            'video_size': '640x480'
        })

    :param file: The path to a file, or a file-like object.
    :param format: The format to use, defaults to autodect.
    :param options: Additional options to pass to FFmpeg.
    :param timeout: Open/read timeout to pass to FFmpeg.
    :param loop: Whether to repeat playback indefinitely (requires a seekable file).
    """

    def __init__(
        self,
        file: Any,
        format: Optional[str] = None,
        options: Optional[dict[str, str]] = None,
        timeout: Optional[int] = None,
        loop: bool = False,
        rotate: Literal["0", "90", "180", "270"] = "0",
    ) -> None:
        self.__container = av.open(
            file=file, format=format, mode="r", options=options, timeout=timeout
        )
        self.__thread: Optional[threading.Thread] = None
        self.__thread_quit: Optional[threading.Event] = None

        # examine streams
        self.__started: set[PlayerStreamTrack] = set()
        self.__streams: list[_AudioOrVideoStream] = []
        self.__decode = True
        self.__rotate = rotate
        self.__audio: Optional[PlayerStreamTrack] = None
        self.__video: Optional[PlayerStreamTrack] = None
        for stream in self.__container.streams:
            if stream.type == "audio" and not self.__audio:
                if self.__decode:
                    self.__audio = PlayerStreamTrack(self, kind="audio")
                    self.__streams.append(stream)
                elif stream.codec_context.name in ["opus", "pcm_alaw", "pcm_mulaw"]:
                    self.__audio = PlayerStreamTrack(self, kind="audio")
                    self.__streams.append(stream)
            elif stream.type == "video" and not self.__video:
                if self.__decode:
                    self.__video = PlayerStreamTrack(self, kind="video")
                    self.__streams.append(stream)
                elif stream.codec_context.name in ["h264", "vp8"]:
                    self.__video = PlayerStreamTrack(self, kind="video")
                    self.__streams.append(stream)

        # check whether we need to throttle playback
        container_format = set(self.__container.format.name.split(","))
        self._throttle_playback = not container_format.intersection(REAL_TIME_FORMATS)

        # check whether the looping is supported
        assert (
            not loop or self.__container.duration is not None
        ), "The `loop` argument requires a seekable file"
        self._loop_playback = loop

    @property
    def audio(self) -> Optional[MediaStreamTrack]:
        """
        A :class:`aiortc.MediaStreamTrack` instance if the file contains audio.
        """
        return self.__audio

    @property
    def video(self) -> Optional[MediaStreamTrack]:
        """
        A :class:`aiortc.MediaStreamTrack` instance if the file contains video.
        """
        return self.__video

    def _start(self, track: PlayerStreamTrack) -> None:
        self.__started.add(track)
        if self.__thread is None:
            self.__log_debug("Starting worker thread")
            self.__thread_quit = threading.Event()
            self.__thread = threading.Thread(
                name="media-player",
                target=player_worker_decode,
                args=(
                    asyncio.get_event_loop(),
                    self.__container,
                    self.__streams,
                    self.__audio,
                    self.__video,
                    self.__thread_quit,
                    self._throttle_playback,
                    self._loop_playback,
                    self.__rotate,
                ),
            )
            self.__thread.start()

    def _stop(self, track: PlayerStreamTrack) -> None:
        self.__started.discard(track)

        if not self.__started and self.__thread is not None:
            self.__log_debug("Stopping worker thread")
            if self.__thread_quit:
                self.__thread_quit.set()
            self.__thread.join()
            self.__thread = None

        if not self.__started and self.__container is not None:
            self.__container.close()
            self.__container = None

    def __log_debug(self, msg: str, *args: object) -> None:
        logger.debug(f"MediaPlayer(%s) {msg}", self.__container.name, *args)
