package openfga

check_relation(subject, relation, object) := true {
    http.send(
        {
            "method": "post",
            "url": concat("/", ["http://localhost:8080","stores",input.openfga.store,"check"]),
            "body": {
                "authorization_model_id": input.openfga.authorization_model_id,
                "tuple_key": {
                    "user": subject,
                    "relation": relation,
                    "object": object
                }
            }
        }
    ).body.allowed
}