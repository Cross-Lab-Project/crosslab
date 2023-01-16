import { Key } from "../../src/types/types";

type KeyNames = "key 1" | string

export const keyData: Record<KeyNames, Key<"request">> = {
    "key 1": {
        alg: "RS256",
        private_key: "private_key",
        public_key: "public_key",
        use: "sig"
    }
}