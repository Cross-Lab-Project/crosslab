import subprocess

from crosslab.soa_client.media.udp_track import UDPTrack


class GstTrack(UDPTrack):
    def __init__(self, pipeline, kind="video") -> None:
        port = 1234
        super().__init__(port, kind)
        subprocess.Popen(
            f"gst-launch-1.0 {pipeline} ! rtph264pay config-interval=10 mtu=1300 ! udpsink host=127.0.0.1 port=1234",
            shell=True,
        )
