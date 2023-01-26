import { AbstractRepository } from "./abstractRepository";
import { ScopeModel } from "../model";
import { AppDataSource } from "../dataSource";
import { Scope } from "../../types/types";

export class ScopeRepository extends AbstractRepository<ScopeModel> {
    constructor() {
        super(ScopeModel)
    }

    public initialize(): void {
        this.repository = AppDataSource.getRepository(ScopeModel)
    }

    public async write(model: ScopeModel, data: Scope<"request">): Promise<void> {
        model.name = data
    }

    public async format(model: ScopeModel): Promise<Scope<"response">> {
        return model.name
    }
}

export const scopeRepository: ScopeRepository = new ScopeRepository()