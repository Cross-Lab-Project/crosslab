import { Institution } from "@cross-lab-project/api-client/dist/generated/federation/types";
import { CompareOptions, updateCompareOptions } from "./common.js";

export interface CompareOptionsInstitution extends CompareOptions<Institution> {
    name: boolean
    homepage: boolean
    api: boolean
    federatedApi: boolean
}

export function compareInstitutions(institutionA: Institution, institutionB: Institution, options?: Partial<CompareOptionsInstitution> | boolean): boolean {
    const defaultOptions: CompareOptionsInstitution = {
        api: true,
        federatedApi: true,
        homepage: true,
        name: true
    }

    const compareOptions = updateCompareOptions(defaultOptions, options)

    if (compareOptions.api && (institutionA.api != institutionB.api)) return false
    if (compareOptions.federatedApi && (institutionA.federatedApi != institutionB.federatedApi)) return false
    if (compareOptions.homepage && (institutionA.homepage != institutionB.homepage)) return false
    if (compareOptions.name && (institutionA.name != institutionB.name)) return false
    
    return true
}