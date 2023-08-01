package openfga

encode_object(object) := concat(":",[prefix, encoded]) {
    index := indexof(object, ":")
    prefix := substring(object, 0, index)
    id := substring(object, index+1, -1)
    encoded := urlquery.encode(id)
}

check_relation(subject, relation, object) := true {
    http.send(
        {
            "method": "post",
            "url": concat("/", ["http://localhost:8080","stores",input.openfga.store,"check"]),
            "body": {
                "authorization_model_id": input.openfga.authorization_model_id,
                "tuple_key": {
                    "user": encode_object(subject),
                    "relation": relation,
                    "object": encode_object(object)
                }
            }
        }
    ).body.allowed
}