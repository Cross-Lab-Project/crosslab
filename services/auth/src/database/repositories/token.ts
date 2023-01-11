import { MissingEntityError } from "@crosslab/service-common";
import { FindOptionsWhere } from "typeorm";
import { AbstractRepository } from ".";
import { Token } from "../../types/types";
import { TokenModel } from "../model";
import { scopeRepository } from "./scope";

class TokenRepository extends AbstractRepository<TokenModel, typeof TokenModel, Token> {
    constructor() {
        super(TokenModel)
    }

    public async create(data: Token): Promise<TokenModel> {
        const model = this.repository.create()
        await this.write(model, data)
        return model
    }

    public async write(model: TokenModel, data: Token): Promise<void> {
        model.device = data.device
        model.expiresOn = data.expiresOn
        model.scopes 
    }

    public async save(model: TokenModel): Promise<void> {
        await this.repository.save(model)
    }

    public async find(options: FindOptionsWhere<TokenModel>): Promise<TokenModel[]> {
        return await this.repository.findBy(options)
    }

    public async findOne(options: FindOptionsWhere<TokenModel>): Promise<TokenModel> {
        const model = await this.repository.findOneBy(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested token does not exist in the database`,
                404
            )
        }

        return model
    }

    public async format(model: TokenModel): Promise<Token> {
        return {
            token: model.token,
            scopes: await Promise.all(
                model.scopes.map(async (scope) => {
                    const { name } = await scopeRepository.format(scope)
                    return name
                })
            )
        }
    }

    public async delete(model: TokenModel): Promise<void> {
        await this.repository.softRemove(model)
    }
}