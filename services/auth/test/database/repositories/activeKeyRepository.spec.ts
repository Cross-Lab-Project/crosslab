import assert from "assert";
import { FindOptionsWhere } from "typeorm";
import { ActiveKeyModel } from "../../../src/database/model"; 
import { AbstractRepositoryTest } from "./abstractRepository.spec";

export class ActiveKeyRepositoryTest extends AbstractRepositoryTest<ActiveKeyModel> {
    constructor() {
        super(ActiveKeyModel)
    }

    validateCreate(model: ActiveKeyModel, data?: { use: string; } | undefined): boolean {
        // throw new Error("Method not implemented.");
        if (data) {
            assert(model.use === data.use)
            assert(model.key.use === data.use)
        } else {
            assert(model.use === undefined)
        }
        return true
    }

    validateWrite(model: ActiveKeyModel, data: { use: string; }): boolean {
        // throw new Error("Method not implemented.");
        assert(model.use === data.use)
        return true
    }

    validateFormat(model: ActiveKeyModel, data: undefined): boolean {
        // throw new Error("Method not implemented.");
        assert(data === undefined)
        return true
    }

    compareModels(firstModel: ActiveKeyModel, secondModel: ActiveKeyModel, _complete?: boolean | undefined): boolean {
        // throw new Error("Method not implemented.");
        assert(firstModel.use === secondModel.use)
        assert(firstModel.key.uuid === secondModel.key.uuid)
        return true
    }
    
    getFindOptionsWhere(model?: ActiveKeyModel | undefined): FindOptionsWhere<ActiveKeyModel> {
        // throw new Error("Method not implemented.");
        return model ? {
            key: {
                uuid: model.key.uuid
            },
            use: model.use
        } : {
            key: {
                uuid: "non-existent"
            }
        }
    }
}