import { JWK } from "jose";
import { KeyModel } from "../../src/database/model";
import { EntityData } from "./index.spec";

export const keyNames = ["key 1"] as const
export type KeyName = typeof keyNames[number]
export type KeyData = Record<KeyName, EntityData<KeyModel>>

const keys: Record<KeyName, { private: JWK, public: JWK }> = {
    "key 1": {
        private: {
            "kty": "RSA",
            "n": "tqY-Cy4Afldmw1UpEMia_C_gaLoOyZPRpuhKbA8-zcxWoUDv1rGALjLHR_VdWYzQxBt_4vyjIFWntMIRzpl6G_NYu1LTY15W5C-VIH7aLLVKoLmpLgV2ujRZZSWQEo8ezNM9xQBIj0g_Uc6VICiUJRDOg9WysVhPdhaijOkxzlJVo8s467swtT2w3I_Hf6KUnjIF_VFp2R4sjT32JHeV8PG4R1478VJYFM0tDSlqWM5u4kXPdWSvVCGg59_DyYKlxw0P_zOonCKBSBG5iJIVDO-GVBhDP9NLInmocIfLPQS4xcsy0vGrETVtmrg1Q5wOfFcMxjM-9qBPTR1P5eKBBQ",
            "e": "AQAB",
            "d": "E_f23ogH-8gYbxCXbcNQ1nNxiGGXDki_6gyJXmkIR72oVvbfgcxkJCjfCqnzq7-ub1JGWA2g0_8pV6TEB59V70pakBhNDhcZTtc46ZWUysCDSTEjIunsAg2JHHrP1oeZKXGK1kfipu-SJKJ-QUbOc4Lz4Qvy_lqWTWXKHbe8_z5nVB8IHlWy0QB6wIKWpFII5Q57KsIdFr88oGTonKKP1zfVFKOrUvgFg-zI59YivD_U4zUzE4OyaE-NDJdZOR5ZI40PPmZLx3VCgGhILn80hqj6Eib4rGO78cOe6x-TUOjrGVVWCIhr3df2AhYs0aV9rPO9C1uo9sKlH9F9BX2bgQ",
            "p": "-7_IRTCcv7HC9qLoTQWqf_-iCpgcF7VUQvPQnPqV9mudfcvsVuh9_rJZYPrZuJD0TXtnmmaMTlZKW2jOTMMANASH4LGB_lSAlHBcDlEa2UJRoM5PaeKGQAgn7rfh_69WZHA8t2IXI0rdQrpyP-r8GChbTMaWN7YB0sCv-qO1rWE",
            "q": "ubvEfSHrIP2lHHH8r-4-Wi5SzjmbzDtJc9lT34WXkzzhvcUy8OjW54R0skneaY7hIOZ0OWQ14pTMZZyjSFiqmEeRoDoqo1JHSBI960l-xYhSMig-cLNbrjBhNSOjmZYtGLFvxxWVvMB0irM_dYNq22h6KQDWuDROdQdinrfzsiU",
            "dp": "3g5BCX6ilJeof8IcI2wfAz4p4Sxggy0HgPLsjLqfsjckOMS518LE9_a6zccWai05wGpcbR2NHsAQYGamqaDLOhbQ_4mzPvGsZMJjAKHbi81qkOvJsn0Dq9FF39PEfbJcAsXZWGwmOpQbbHNmuSh9apWWSrdT4xogq5QY5XynkKE",
            "dq": "foINuOnEfOkncHOXmMGfCM_qqPsGSprLUjRic6pL7wcV_6t1IjCGSJWo4tN7wcyHPWCbI4hFR7rwafnCIgH62NROtaNI7Yuab9W1BTE_Pw62ZeGRfjQ8qy3a2FYZFgD7YIljSGhEYJd6CgtDmyhTPXUxWAJxPnCqS_4mx1Mmk10",
            "qi": "7YmGMGSuKT9xQ1z35HZPYPtK-v6fjEOD0uelo1grimaNAxa4LnBTSl1ktZ5nY2ng5hkhzADNHfM9wijGKwztk9nQlbLQ1aRu7oqwfMd8Mn7-fDoTH72n7R6fDnQyrS7SQG9cgxeTXVeY4pWEs-hMih0j_sy9Gm48H_kEF9CYJO8"
        },
        public: {
            "kty": "RSA",
            "n": "tqY-Cy4Afldmw1UpEMia_C_gaLoOyZPRpuhKbA8-zcxWoUDv1rGALjLHR_VdWYzQxBt_4vyjIFWntMIRzpl6G_NYu1LTY15W5C-VIH7aLLVKoLmpLgV2ujRZZSWQEo8ezNM9xQBIj0g_Uc6VICiUJRDOg9WysVhPdhaijOkxzlJVo8s467swtT2w3I_Hf6KUnjIF_VFp2R4sjT32JHeV8PG4R1478VJYFM0tDSlqWM5u4kXPdWSvVCGg59_DyYKlxw0P_zOonCKBSBG5iJIVDO-GVBhDP9NLInmocIfLPQS4xcsy0vGrETVtmrg1Q5wOfFcMxjM-9qBPTR1P5eKBBQ",
            "e": "AQAB"
        }
    }
}

export const keyData: KeyData = {
    "key 1": {
        request: {
            alg: "RS256",
            private_key: keys["key 1"].private,
            public_key: keys["key 1"].public,
            use: "sig"
        },
        model: {
            uuid: "aa561d74-9e1f-4ebb-a10e-a91c378be7e4",
            alg: "RS256",
            private_key: keys["key 1"].private,
            public_key: keys["key 1"].public,
            use: "sig"
        },
        response: undefined
    }
}