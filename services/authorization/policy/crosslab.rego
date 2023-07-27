package crosslab

import future.keywords.if
import future.keywords.in

import data.openfga

default allow := false

object_type := split(input.object, ":")[0]

# Allow Owner to edit/delete
allow if {
    object_type in ["device", "experiment", "peerconnection", "booking", "federation"]
    input.action in ["edit", "delete"]
    openfga.check_relation(input.subject, "owner", input.object)
}

# Allow Viewer to view
allow if {
    object_type in ["device", "experiment", "peerconnection", "booking", "federation"]
    input.action in ["view"]
    openfga.check_relation(input.subject, "viewer", input.object)
}

# Allow Booker to instatiate/messsage a device
allow if {
    object_type in ["device"]
    input.action in ["instantiate", "message"]
    openfga.check_relation(input.subject, "owner", input.object)
}
