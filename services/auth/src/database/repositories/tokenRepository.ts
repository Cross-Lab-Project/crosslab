import { MissingEntityError } from "@crosslab/service-common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { AbstractRepository } from "./abstractRepository";
import { Token } from "../../types/types";
import { ScopeModel, TokenModel } from "../model";
import { scopeRepository } from "./scopeRepository";
import { AppDataSource } from "../dataSource";

class TokenRepository extends AbstractRepository<TokenModel> {
    public initialize(): void {
        this.repository = AppDataSource.getRepository(TokenModel)
    }

    public async create(data: Token<"request">): Promise<TokenModel> {
        this.checkIfInitialized()
        const model = this.repository!.create()
        await this.write(model, data)
        return model
    }

    public async write(model: TokenModel, data: Token<"request">): Promise<void> {
        model.device = data.device
        model.expiresOn = data.expiresOn
        model.scopes = await Promise.all(
            data.scopes.map(async (scope) => {
                return await scopeRepository.findOneOrFail({ 
                    where: {
                        name: scope 
                    }
                })
            })
        )
    }

    public async save(model: TokenModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.save(model)
    }

    public async find(options?: FindManyOptions<TokenModel>): Promise<TokenModel[]> {
        this.checkIfInitialized()
        return await this.repository!.find(options)
    }

    public async findOne(options: FindOneOptions<TokenModel>): Promise<TokenModel | null> {
        this.checkIfInitialized()
        return await this.repository!.findOne(options)
    }

    public async findOneOrFail(options: FindOneOptions<TokenModel>): Promise<TokenModel> {
        this.checkIfInitialized()
        const model = await this.repository!.findOne(options)

        if (!model) {
            throw new MissingEntityError(
                `The requested token does not exist in the database`,
                404
            )
        }

        return model
    }

    public async format(_model: TokenModel): Promise<Token<"response">> {
        return undefined
    }

    public async delete(model: TokenModel): Promise<void> {
        this.checkIfInitialized()
        await this.repository!.remove(model)
    }

    public addScopeModelToTokenModel(tokenModel: TokenModel, scopeModel: ScopeModel) {
        if (!tokenModel.scopes.find((scope) => scope.name === scopeModel.name)) {
            tokenModel.scopes.push(scopeModel)
        }
    }
}

export const tokenRepository: TokenRepository = new TokenRepository()