import { config } from "../config.js"

const host = (url: string) => new URL(url).host
const path = (base_url: string, path: string) => new URL(path, base_url).toString()

export const tool_configuration = {
    client_name: "Crosslab",
    initiate_login_uri: path(config.BASE_URL, ""),
    redirect_uris: [path(config.BASE_URL, "")],
    jwks_uri: path(config.BASE_URL, ".well-known/jwks.json"),
    logo_uri:  path(config.BASE_URL, "logo.png"),
    scope: 'https://purl.imsglobal.org/spec/lti-nrps/scope/contextmembership.readonly',
    'https://purl.imsglobal.org/spec/lti-tool-configuration': {
        domain: host(config.BASE_URL),
        description: "Allows to execute CrossLab compatible experiments.",
        target_link_uri: path(config.BASE_URL, ""),
        claims: ["iss", "sub"/*, "name", "given_name", "family_name"*/],
        messages: [
            { type: 'LtiDeepLinkingRequest' },
            { type: 'LtiResourceLink' }
        ]
    }
}