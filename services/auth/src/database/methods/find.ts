import { roleRepository, scopeRepository, tokenRepository, userRepository } from "../repositories";

export async function findUserModelByUsername(username: string) {
    return userRepository.findOneBy({ username })
}

export async function findTokenModelByToken(token: string) {
    return tokenRepository.findOneBy({ token })
}

export async function findScopeModelByName(name: string) {
    return scopeRepository.findOneBy({ name })
}

export async function findRoleModelByName(name: string) {
    return roleRepository.findOneBy({ name })
}