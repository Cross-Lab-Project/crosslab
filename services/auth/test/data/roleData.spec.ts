import { Role } from "../../src/generated/types";
import { scopeData } from "./scopeData.spec";

type RoleNames = "superadmin" | string

export const roleData: Record<RoleNames, Role<"request">> = {
    "superadmin": {
        name: "superadmin",
        scopes: [
            scopeData["scope 1"]
        ]
    }
}