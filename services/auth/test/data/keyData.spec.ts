/* eslint-disable max-len */
import { KeyRepository } from '../../src/database/repositories/keyRepository'
import { EntityData } from '@crosslab/service-common'
import { JWK } from 'jose'

export const keyNames = ['key 1', 'GET /auth key'] as const
export type KeyName = (typeof keyNames)[number]
export type KeyData = Record<KeyName, EntityData<KeyRepository>>

const keys: Record<KeyName, { private: JWK; public: JWK }> = {
    'key 1': {
        private: {
            kty: 'RSA',
            n: 'tqY-Cy4Afldmw1UpEMia_C_gaLoOyZPRpuhKbA8-zcxWoUDv1rGALjLHR_VdWYzQxBt_4vyjIFWntMIRzpl6G_NYu1LTY15W5C-VIH7aLLVKoLmpLgV2ujRZZSWQEo8ezNM9xQBIj0g_Uc6VICiUJRDOg9WysVhPdhaijOkxzlJVo8s467swtT2w3I_Hf6KUnjIF_VFp2R4sjT32JHeV8PG4R1478VJYFM0tDSlqWM5u4kXPdWSvVCGg59_DyYKlxw0P_zOonCKBSBG5iJIVDO-GVBhDP9NLInmocIfLPQS4xcsy0vGrETVtmrg1Q5wOfFcMxjM-9qBPTR1P5eKBBQ',
            e: 'AQAB',
            d: 'E_f23ogH-8gYbxCXbcNQ1nNxiGGXDki_6gyJXmkIR72oVvbfgcxkJCjfCqnzq7-ub1JGWA2g0_8pV6TEB59V70pakBhNDhcZTtc46ZWUysCDSTEjIunsAg2JHHrP1oeZKXGK1kfipu-SJKJ-QUbOc4Lz4Qvy_lqWTWXKHbe8_z5nVB8IHlWy0QB6wIKWpFII5Q57KsIdFr88oGTonKKP1zfVFKOrUvgFg-zI59YivD_U4zUzE4OyaE-NDJdZOR5ZI40PPmZLx3VCgGhILn80hqj6Eib4rGO78cOe6x-TUOjrGVVWCIhr3df2AhYs0aV9rPO9C1uo9sKlH9F9BX2bgQ',
            p: '-7_IRTCcv7HC9qLoTQWqf_-iCpgcF7VUQvPQnPqV9mudfcvsVuh9_rJZYPrZuJD0TXtnmmaMTlZKW2jOTMMANASH4LGB_lSAlHBcDlEa2UJRoM5PaeKGQAgn7rfh_69WZHA8t2IXI0rdQrpyP-r8GChbTMaWN7YB0sCv-qO1rWE',
            q: 'ubvEfSHrIP2lHHH8r-4-Wi5SzjmbzDtJc9lT34WXkzzhvcUy8OjW54R0skneaY7hIOZ0OWQ14pTMZZyjSFiqmEeRoDoqo1JHSBI960l-xYhSMig-cLNbrjBhNSOjmZYtGLFvxxWVvMB0irM_dYNq22h6KQDWuDROdQdinrfzsiU',
            dp: '3g5BCX6ilJeof8IcI2wfAz4p4Sxggy0HgPLsjLqfsjckOMS518LE9_a6zccWai05wGpcbR2NHsAQYGamqaDLOhbQ_4mzPvGsZMJjAKHbi81qkOvJsn0Dq9FF39PEfbJcAsXZWGwmOpQbbHNmuSh9apWWSrdT4xogq5QY5XynkKE',
            dq: 'foINuOnEfOkncHOXmMGfCM_qqPsGSprLUjRic6pL7wcV_6t1IjCGSJWo4tN7wcyHPWCbI4hFR7rwafnCIgH62NROtaNI7Yuab9W1BTE_Pw62ZeGRfjQ8qy3a2FYZFgD7YIljSGhEYJd6CgtDmyhTPXUxWAJxPnCqS_4mx1Mmk10',
            qi: '7YmGMGSuKT9xQ1z35HZPYPtK-v6fjEOD0uelo1grimaNAxa4LnBTSl1ktZ5nY2ng5hkhzADNHfM9wijGKwztk9nQlbLQ1aRu7oqwfMd8Mn7-fDoTH72n7R6fDnQyrS7SQG9cgxeTXVeY4pWEs-hMih0j_sy9Gm48H_kEF9CYJO8',
        },
        public: {
            kty: 'RSA',
            n: 'tqY-Cy4Afldmw1UpEMia_C_gaLoOyZPRpuhKbA8-zcxWoUDv1rGALjLHR_VdWYzQxBt_4vyjIFWntMIRzpl6G_NYu1LTY15W5C-VIH7aLLVKoLmpLgV2ujRZZSWQEo8ezNM9xQBIj0g_Uc6VICiUJRDOg9WysVhPdhaijOkxzlJVo8s467swtT2w3I_Hf6KUnjIF_VFp2R4sjT32JHeV8PG4R1478VJYFM0tDSlqWM5u4kXPdWSvVCGg59_DyYKlxw0P_zOonCKBSBG5iJIVDO-GVBhDP9NLInmocIfLPQS4xcsy0vGrETVtmrg1Q5wOfFcMxjM-9qBPTR1P5eKBBQ',
            e: 'AQAB',
        },
    },
    'GET /auth key': {
        private: {
            kty: 'RSA',
            n: 'opCFyNAxIfXUnOfg1wvhCb4YQvdtzBMXEAiuZV6idhoaoKkBMz7I_ZLgyX3NHdTGKOQ_JO83XxBA4uH5bxa4r0WR8G8cX7uqBsAFeudjliPjh6EUFG79pOhE6z_cMZzOuhFXdX0Lko2HqIKjFFkZq9FkNltKtaVCfPP57Uq8z3CB4ggpXBuT9AgQuyC9atU-45-K2ssV_rFlmLXFFT2XLaSqGGAJAWtLu2k3bC_05OILFJriHhZf8zsoWJydw1CnhJ60BebdeigipX9EX4PzT9hQFyM5U4lq5ai087_EwV6BOHD335zHWv_n3uv3QcUIkBlARoAIgth3Egi5ZA0SLQ',
            e: 'AQAB',
            d: 'AsLDkuJ-Qx5iqvuBJQXNn5W74b9D_RhB5wLOu2f9CFZvJ1VXcOBbF3tcF-_sANqxNtaRf_YUEag8Ad5mlw1iu49J6DRq3fFY9N5j-W9ekJkxbwc8SRCNfDR5nykpeyo3lI9g1dz2ylle-WymilztA679rbKlNSqGU4rtLqt7Q2aVzxABSTd3haBzQn4pZl4p4_rmksE2UZMo7ffiAxWatdbx5Mw44VUh128khVukc3j5-inS3vlfvrlwzFw_z7T4NoOPe4PSFl3Fqu1aLMihLXHh-vN-QDYgbKGRhVrPCC_Fk45DXukcKykPIfnx_7T-JLI00KSl2PEObwTqPQYzIQ',
            p: '05dse_2uccxX7Fuoz0rzNCb89Zs0QgrgoB7mn0bEN4YjaXe26rdP5kZSj1z18tnoB0hb0pXZlRUY7JDdVWkIytCf3VCZszmG7YME-hnXS8gB4YzMm6yi9yNMYtKS0YeoEgZ3sYIcmdfG_6R1P0NvG5G2pkfu2yjus5Z9Rl8qmgk',
            q: 'xK7vUgEZeGMJaWOC_sscLL7A0SFG_3kcVA1Jvzrlhmx4za6qHMgmKqzBGn0iIYcVSE7v7f9TZd8C1QMUHc-iu-49ZugQTdxgzBb5AGhzZB7wjhb-tLiGKYWj0ZJ-g6wSfhIKFRp1Hn_zJaHzKMciqw18PrcoaQSaGBvH4eW7kAU',
            dp: 'HVaOnTaUfITn4AbphiyPQjjxtCBcA5g8gxclxQnr5QL9X_9QZoUaWASCKAyssYqTSIc47B8I90ngldSUS-ZvaKe6stYdKaOdWMtk4kS4_HH0CNEcAa3TPs8vJTirUNAtdqpc6EjxLEel-QZVl3sDKeBvYejxboPjbRU9s4c4gfk',
            dq: 'XFW_9qCbg4ADGB3mjpVt6be3r7ZOrXr_CJqgZ41P2dass-ru48o22Mv3b-cVEeZn4GVmkDXQwj97BeOHGyOyQ0XqP5hspxDxxH54cW-X1IYN6rby5obGPVIHAUkj6c7rc5Imd5fPKf1ped5Y2Gj8Zo9TJ-I2r27ApNbN9Mg0UL0',
            qi: 'v7s45c72T6Qti2ogj6MVudCw-YT4DaO-1y856AhzQYOeTtAjOsE7BDP4Md4Dj-7P5LBphOpqU5hM0O_jVeVFW5yCFFgzqK_7LCDubIUN_ZjOJOWMC6b8eoB0AfE4-p7raEcNIdXy8-uWj6Qv4p2YLn8rGxglzBdmaFEpm2plXuI',
        },
        public: {
            kty: 'RSA',
            n: 'opCFyNAxIfXUnOfg1wvhCb4YQvdtzBMXEAiuZV6idhoaoKkBMz7I_ZLgyX3NHdTGKOQ_JO83XxBA4uH5bxa4r0WR8G8cX7uqBsAFeudjliPjh6EUFG79pOhE6z_cMZzOuhFXdX0Lko2HqIKjFFkZq9FkNltKtaVCfPP57Uq8z3CB4ggpXBuT9AgQuyC9atU-45-K2ssV_rFlmLXFFT2XLaSqGGAJAWtLu2k3bC_05OILFJriHhZf8zsoWJydw1CnhJ60BebdeigipX9EX4PzT9hQFyM5U4lq5ai087_EwV6BOHD335zHWv_n3uv3QcUIkBlARoAIgth3Egi5ZA0SLQ',
            e: 'AQAB',
        },
    },
}

export const keyData: KeyData = {
    'key 1': {
        request: {
            alg: 'RS256',
            private_key: keys['key 1'].private,
            public_key: keys['key 1'].public,
            use: 'sig',
        },
        model: {
            uuid: 'aa561d74-9e1f-4ebb-a10e-a91c378be7e4',
            alg: 'RS256',
            private_key: keys['key 1'].private,
            public_key: keys['key 1'].public,
            use: 'sig',
        },
        response: undefined,
    },
    'GET /auth key': {
        request: {
            alg: 'RS256',
            private_key: keys['GET /auth key'].private,
            public_key: keys['GET /auth key'].public,
            use: 'sig',
        },
        model: {
            uuid: '25aaa390-abbf-49ce-9939-3f27a2aae18c',
            alg: 'RS256',
            private_key: keys['GET /auth key'].private,
            public_key: keys['GET /auth key'].public,
            use: 'sig',
        },
        response: undefined,
    },
}
