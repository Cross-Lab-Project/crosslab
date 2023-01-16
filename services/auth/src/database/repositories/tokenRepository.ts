import { AbstractRepository } from "./abstractRepository";
import { Token } from "../../types/types";
import { ScopeModel, TokenModel } from "../model";
import { scopeRepository } from "./scopeRepository";
import { AppDataSource } from "../dataSource";

class TokenRepository extends AbstractRepository<TokenModel> {
    constructor() {
        super(TokenModel)
    }

    public initialize(): void {
        this.repository = AppDataSource.getRepository(TokenModel)
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

    public async format(_model: TokenModel): Promise<Token<"response">> {
        return undefined
    }

    public addScopeModelToTokenModel(tokenModel: TokenModel, scopeModel: ScopeModel) {
        if (!tokenModel.scopes.find((scope) => scope.name === scopeModel.name)) {
            tokenModel.scopes.push(scopeModel)
        }
    }
}

export const tokenRepository: TokenRepository = new TokenRepository()