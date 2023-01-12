import activeKeyRepositorySpec from "./activeKeyRepository.spec";
import keyRepositorySpec from "./keyRepository.spec";
import roleRepositorySpec from "./roleRepository.spec";
import scopeRepositorySpec from "./scopeRepository.spec";
import tokenRepositorySpec from "./tokenRepository.spec";
import userRepositorySpec from "./userRepository.spec";

const tests = [
    activeKeyRepositorySpec,
    keyRepositorySpec,
    roleRepositorySpec,
    scopeRepositorySpec,
    tokenRepositorySpec,
    userRepositorySpec
]

export default () => describe("Repositories", async function () {
    for (const test of tests) {
        test()
    }
})