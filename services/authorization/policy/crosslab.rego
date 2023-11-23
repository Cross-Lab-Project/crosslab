package crosslab

import future.keywords.if
import future.keywords.in

import data.openfga

default scope_allow := false
default rebac_allow := false
default allow := false
default scopes := ["read", "write", "connect"]


object := input.object
# Preprocessing
object_type := split(input.object, ":")[0]

payload := x {
    io.jwt.verify_hs256(input.subject, data.jwt_secret)
    [_, x, _] := io.jwt.decode(input.subject)
}
subject_alt := payload.sub if {payload} else := input.subject
subject := subject_alt if {startswith(subject_alt, "user:")} else := concat(":",["user", subject_alt])
scopes := payload.scopes

enc := openfga.encode_object(subject)

# override authorization for root
allow if {
    subject in ["user:root", "user:experiment-service"] 
}

# Check Scopes
scope_allow if {
    input.action in ["view", "instantiate", "message"]
    "read" in scopes
}

scope_allow if {
    input.action in ["edit", "delete", "create"]
    "write" in scopes
}

scope_allow if {
    input.action in ["connect"]
    "connect" in scopes
}

rebac_allow if {
    payload.admin == true
}

# Allow Owner to edit/delete
rebac_allow if {
    object_type in ["device", "experiment", "peerconnection", "booking", "federation"]
    input.action in ["edit", "delete"]
    openfga.check_relation(subject, "owner", input.object)
}

# Allow Viewer to view
rebac_allow if {
    object_type in ["user", "device", "experiment", "peerconnection", "booking", "federation"]
    input.action in ["view"]
    openfga.check_relation(subject, "viewer", input.object)
}

# Allow Booker to instatiate/messsage a device
rebac_allow if {
    object_type in ["device"]
    input.action in ["instantiate", "message"]
    openfga.check_relation(subject, "owner", input.object)
}

# Final decision
allow if {
    scope_allow
    rebac_allow
}