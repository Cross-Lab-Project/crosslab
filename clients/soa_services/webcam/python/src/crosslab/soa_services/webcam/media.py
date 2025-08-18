import platform
from typing import Literal, Union

from aiortc import MediaStreamTrack

from ._media import MediaPlayer


def WebcamTrack(
    webcam: Union[str, None] = None, rotate: Literal["0", "90", "180", "270"] = "0"
) -> MediaStreamTrack:
    options = {"framerate": "30", "video_size": "640x480"}
    if platform.system() == "Darwin":
        track = MediaPlayer(
            webcam if webcam else "default:none",
            format="avfoundation",
            options=options,
            rotate=rotate,
        ).video
    elif platform.system() == "Windows":
        track = MediaPlayer(
            webcam if webcam else "video=Integrated Camera",
            format="dshow",
            options=options,
            rotate=rotate,
        ).video
    else:
        track = MediaPlayer(
            webcam if webcam else "/dev/video0",
            format="v4l2",
            options=options,
            rotate=rotate,
        ).video
    if track:
        return track
    raise ValueError(
        "Could not create webcam track. Please check if the webcam is connected and accessible."
    )
