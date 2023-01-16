import { Scope } from "../../src/types/types";

type ScopeNames = "scope 1" | "scope 2" | "scope 3" | "scope 4" | "scope 5" | string

export const scopeData: Record<ScopeNames, Scope<"request">> = {
    "scope 1": "test scope 1",
    "scope 2": "test scope 2",
    "scope 3": "test scope 3",
    "scope 4": "test scope 4",
    "scope 5": "test scope 5"
}

scopeData