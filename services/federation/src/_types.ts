import { Institution } from "./generated/types";

export type UserType = {
    username: string
}

export type getProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type postProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type patchProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type deleteProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type optionsProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type headProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type traceProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };
export type putProxySignature = (parameters: { URL: string }, body: never, user: UserType) => Promise<{ status: number, data?: any }> | { status: number, data?: any };


export type getInstitutionsSignature = (parameters: { }, body: never, user: UserType) => Promise<{ status: number, data?: Institution[] }> | { status: number, data?: Institution[] };
export type postInstitutionsSignature = (parameters: {  }, body: Institution, user: UserType) => Promise<{ status: number, data?: Institution }> | { status: number, data?: Institution };
export type getInstitutionsByInstitutionIdSignature = (parameters: { institution_id: string }, body: never, user: UserType) => Promise<{ status: number, data?: Institution }> | { status: number, data?: Institution };
export type patchInstitutionsByInstitutionIdSignature = (parameters: { institution_id: string }, body: Institution, user: UserType) => Promise<{ status: number, data?: Institution }> | { status: number, data?: Institution };
export type deleteInstitutionsByInstitutionIdSignature = (parameters: { institution_id: string }, body: never, user: UserType) => Promise<{ status: number, data?: never }> | { status: number, data?: never };
