import { config } from "./config";

let institutePrefixURL: URL[];

export function CheckAuth(token: string): [URL, boolean] {
    throw new Error("TODO");
    return [new URL(""), false];
};

function convertInstitutionPrefix(): void {
    if(!institutePrefixURL) {
        institutePrefixURL = [];
        for(let i = 0; i < config.InstitutePrefix.length; i++) {
            try {
                let url = new URL(config.InstitutePrefix[i])
                institutePrefixURL.push(url);
            } catch (e) {
                console.error("Skipping" + config.InstitutePrefix[i] + "for belonging check:", e)
            };
        };
    };
};

export function BelongsToUs(url: URL): boolean {
    convertInstitutionPrefix();
    for(let i = 0; i < institutePrefixURL.length; i++) {
        if(url.hostname == institutePrefixURL[i].hostname) {
            return true;
        };
    };
    return false;
};