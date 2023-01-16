import { User } from "../../src/generated/types";
import { roleData } from "./roleData.spec";

type UserNames = "superadmin" | string

export const userData: Record<UserNames, User<"request">> = {
    "superadmin": {
        username: "superadmin",
        password: "superadmin",
        roles: [
            roleData.superadmin
        ]
    }
}