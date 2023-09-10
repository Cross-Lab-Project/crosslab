import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import * as schemas from "./schemas.js";

function escapeRegex(string: string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * This function attempts to parse a Response as ResponseData.
 */
async function parseResponse(response: Response) {
    let text = null;
    try {
        text = await response.text();
        const json = JSON.parse(text);
        return { status: response.status, body: json };
    } catch {
        return { status: response.status, body: text };
    }
}

export class Client {
    private BASE_URL: string;
    private SERVICE_URL: string;

    constructor(BASE_URL: string, SERVICE_URL?: string) {
        this.BASE_URL = BASE_URL;
        this.SERVICE_URL = SERVICE_URL || BASE_URL;
    }

    private fetch = async (url: RequestInfo | URL, init: RequestInit) => {
        let raw_response;
        init.headers = init.headers || {"Content-Type": "application/json"};
        try {
            raw_response = await fetch(url, init);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            } else if (typeof error === 'string') {
                throw new Error(error);
            } else {
                throw new Error(
                    'Something went wrong while trying to fetch the request'
                );
            }
        }
        return await parseResponse(raw_response);
    };

    /*
    Authenticate user
    
    This endpoint will authenticate a user and return a JWT for the internal use of the microservice architecture.
    The return code will always be 200, but the JWT will be empty if the authentication failed.
    */
    public async auth(url: string = "/auth", authorization?: string, xRealIP?: string, xForwardedProto?: string): Promise<schemas.AuthResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(auth)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/auth'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)

        // build query params
        if (authorization){
            url_with_query_params.searchParams.set('Authorization', authorization)
        }
        if (xRealIP){
            url_with_query_params.searchParams.set('X-Real-IP', xRealIP)
        }
        if (xForwardedProto){
            url_with_query_params.searchParams.set('X-Forwarded-Proto', xForwardedProto)
        }
        
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Login user
    
    This endpoint will login a user and return an access token for the use of the microservice architecture.
    */
    public async login(body: schemas.LoginRequest, url: string = "/login"): Promise<schemas.LoginResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(login)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/login'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Logout user
    
    This endpoint will logout a user and remove the corresponding access token for the use of the microservice architecture.
    */
    public async logout(body: schemas.LogoutRequest, url: string = "/logout"): Promise<schemas.LogoutResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(logout)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/logout'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 204){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Get all users
    
    */
    public async listUsers(url: string = "/users"): Promise<schemas.ListUsersResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(users)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/users'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Create a user
    
    */
    public async createUser(body: schemas.CreateUserRequest, url: string = "/users"): Promise<schemas.CreateUserResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(users)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/users'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Get a user
    
    */
    public async getUser(url: string): Promise<schemas.GetUserResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(users\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Update a user
    
    */
    public async updateUser(url: string, body: schemas.UpdateUserRequest): Promise<schemas.UpdateUserResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(users\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "patch", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Delete a user
    
    */
    public async deleteUser(url: string): Promise<schemas.DeleteUserResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(users\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "delete"});
           
        // transform response
        if (response.status === 204){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Get identity
    
    */
    public async getIdentity(url: string = "/identity"): Promise<schemas.GetIdentityResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(identity)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/identity'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Update identity
    
    */
    public async updateIdentity(url: string = "/identity", body?: schemas.UpdateIdentityRequest): Promise<schemas.UpdateIdentityResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(identity)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/identity'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "patch", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Create a new token
    
    This endpoint will create a new token for the use of the microservice architecture.
    */
    public async createToken(body: schemas.CreateTokenRequest, url: string = "/token"): Promise<schemas.CreateTokenResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(token)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/token'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }
}
