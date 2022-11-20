import socket
import subprocess
import shlex

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(("", 1234))

process = subprocess.Popen(
['gst-launch-1.0',
 'videotestsrc',
 '!',
 'video/x-raw,width=640,height=480,framerate=30/1',
 '!',
 'x264enc',
 '!',
 'video/x-h264,level=(string)4',
 '!',
 'rtph264pay',
 'config-interval=-1',
 'mtu=1300',
 '!',
 'udpsink',
 'host=127.0.0.1',
 'port=1234']
)

with open("h264_test.bin", "wb") as f:
    for packet in range(38):
        data = sock.recv(2048)
        f.write(len(data).to_bytes(2, byteorder="big"))
        f.write(data)

process.kill()
