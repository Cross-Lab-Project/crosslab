import { AbstractRepository } from "./abstractRepository";
import { Key } from "../../types/types";
import { KeyModel } from "../model";
import { AppDataSource } from "../dataSource";

class KeyRepository extends AbstractRepository<KeyModel> {
    constructor() {
        super(KeyModel)
    }

    public initialize(): void {
        this.repository = AppDataSource.getRepository(KeyModel)
    }

    public async write(model: KeyModel, data: Required<Key>): Promise<void> {
        model.alg = data.alg
        model.private_key = data.private_key
        model.public_key = data.public_key
        model.use = data.use
    }

    public async format(_model: KeyModel): Promise<Key<"response">> {
        return undefined
    }
}

export const keyRepository: KeyRepository = new KeyRepository()