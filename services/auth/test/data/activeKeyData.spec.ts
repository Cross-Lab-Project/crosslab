import { ActiveKeyModel } from "../../src/database/model";
import { EntityData } from "./index.spec";
import { keyData } from "./keyData.spec";

export const activeKeyNames = ["active key 1"] as const
export type ActiveKeyName = typeof activeKeyNames[number]
export type ActiveKeyData = Record<ActiveKeyName, EntityData<ActiveKeyModel>>

export const activeKeyData: ActiveKeyData = {
    "active key 1": {
        request: {
            use: "sig",
            key: keyData["key 1"].model.uuid
        },
        model: {
            key: keyData["key 1"].model,
            use: "sig"
        },
        response: undefined
    }
}