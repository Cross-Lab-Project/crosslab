import platform
from typing import Union

from aiortc import MediaStreamTrack  # type: ignore
from aiortc.contrib.media import MediaPlayer  # type: ignore


def WebcamTrack(webcam: Union[str, None] = None) -> MediaStreamTrack:
    options = {"framerate": "30", "video_size": "640x480"}
    if platform.system() == "Darwin":
        return MediaPlayer(
            webcam if webcam else "default:none",
            format="avfoundation",
            options=options,
        ).video
    elif platform.system() == "Windows":
        return MediaPlayer(
            webcam if webcam else "video=Integrated Camera",
            format="dshow",
            options=options,
        ).video
    else:
        return MediaPlayer(
            webcam if webcam else "/dev/video0", format="v4l2", options=options
        ).video
