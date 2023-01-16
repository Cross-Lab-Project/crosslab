import { ActiveKey } from "../../src/types/types";

type ActiveKeyNames = "active key 1" | string

export const activeKeyData: Record<ActiveKeyNames, ActiveKey<"request">> = {
    "active key 1": {
        use: "sig"
    }
}