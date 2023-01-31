import methodsSuite from "./methods/index.spec"
import databaseSuite from "./database/index.spec"
import { parseAllowlist, resolveAllowlist } from "../src/methods/allowlist";
import { scopeRepository } from "../src/database/repositories/scopeRepository";
import { roleRepository } from "../src/database/repositories/roleRepository";
import { userRepository } from "../src/database/repositories/userRepository";
import { tokenRepository } from "../src/database/repositories/tokenRepository";
import { activeKeyRepository } from "../src/database/repositories/activeKeyRepository";
import { DataSourceOptions } from "typeorm";
import { ScopeModel, RoleModel, UserModel, KeyModel, ActiveKeyModel, TokenModel } from "../src/database/model";
import { config } from "../src/config";
import configSpec from "./config.spec";
import operationsSuite from "./operations/index.spec"
import generatedSuite from "./generated/index.spec"

describe("Authentication Service Tests", function () {
    this.beforeAll(function () {
        console.log = () => undefined
        console.warn = () => undefined
        console.error = () => undefined
    })

    databaseSuite()
    methodsSuite()
    configSpec()
    operationsSuite()
    generatedSuite()
})