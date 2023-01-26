import assert from "assert";
import { FindOptionsWhere } from "typeorm";
import { RoleModel } from "../../../src/database/model";
import { Role } from "../../../src/generated/types";
import { AbstractRepositoryTestSuite } from "./abstractRepository.spec";
import Mocha from "mocha"

class RoleRepositoryTestSuite extends AbstractRepositoryTestSuite<RoleModel> {
    constructor() {
        super(RoleModel)
    }

    public async initialize(): Promise<void> {
        await super.initialize()
        this.addTestToSuite(
            "additional", 
            (data) => new Mocha.Test("it should not write property 'name' if it is not provided", async function () {
                const model: RoleModel = data.entityData.superadmin.model
                const oldName = model.name
                await data.repository.write(model, {})
                assert(model.name === oldName)
            })
        )
        this.addTestToSuite(
            "additional", 
            (data) => new Mocha.Test("it should not write property 'scopes' if it is not provided", async function () {
                const model: RoleModel = data.entityData.superadmin.model
                const oldScopes = JSON.stringify(model.scopes)
                await data.repository.write(model, {})
                assert(JSON.stringify(model.scopes) === oldScopes)
            })
        )
    }

    validateCreate(model: RoleModel, data?: Role<"request">): boolean {
        if (data) return this.validateWrite(model, data)

        assert(model.name === undefined)
        assert(model.scopes === undefined)
        assert(model.users === undefined)

        return true
    }

    validateWrite(model: RoleModel, data: Role<"request">): boolean {
        assert(model.name === data.name, "Role was created with another name")
        if (data.scopes) {
            for (const scope of model.scopes) {
                assert(data.scopes.includes(scope.name), "Role contains additional scopes")
            }
            for (const scope of data.scopes) {
                assert(model.scopes.find((s) => s.name === scope), "Role is missing a scope")
            }
        }
        assert(model.users === undefined, "Property 'users' is defined")
        return true
    }

    validateFormat(model: RoleModel, data: Role<"response">): boolean {
        assert(data.name === model.name)
        assert(data.scopes)
        assert(Array.isArray(data.scopes))
        assert(data.scopes.length === model.scopes.length)

        for (const scope of model.scopes) {
            assert(data.scopes.includes(scope.name), "Formatted role is missing a scope")
        }
        for (const scope of data.scopes) {
            assert(model.scopes.find((s) => s.name === scope), "Formatted role contains too many scopes")
        }

        return true
    }

    compareModels(firstModel: RoleModel, secondModel: RoleModel, complete?: boolean): boolean {
        if (!complete) {
            return firstModel.name === secondModel.name
        }

        assert(firstModel.name === secondModel.name)

        for (const scope of firstModel.scopes) {
            assert(secondModel.scopes.find((s) => s.name === scope.name), "First model contains more scopes than second model")
        }
        for (const scope of secondModel.scopes) {
            assert(firstModel.scopes.find((s) => s.name === scope.name), "First model contains less scopes than second model")
        }
    
        // TODO: add comparison of users

        return true
    }

    getFindOptionsWhere(model?: RoleModel | undefined): FindOptionsWhere<RoleModel> {
        return {
            name: model ? model.name : "non-existent"
        }
    }
}

export const roleRepositoryTestSuite = new RoleRepositoryTestSuite()