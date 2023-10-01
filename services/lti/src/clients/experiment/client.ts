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
    List experiments
    
    */
    public async listExperiments(url: string = "/experiments"): Promise<schemas.ListExperimentsResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(experiments)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/experiments'
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
    Create a new experiment
    
    */
    public async createExperiment(body: schemas.CreateExperimentRequest, url: string = "/experiments"): Promise<schemas.CreateExperimentResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(experiments)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/experiments'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        if (response.status === 202){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    View an experiment.
    
    */
    public async getExperiment(url: string): Promise<schemas.GetExperimentResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(experiments\/[^?]*?)()?$').exec(url)
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
    Update an existing experiment.
    
    With this endpoint an experiment can be changed. The request body may be skipped if you just want to set a hook via the query string parameters.
    
    If a body is supplied you can choose to include any first level fields which will fully replace the field in the existing experiment.
    
    */
    public async updateExperiment(url: string, body?: schemas.UpdateExperimentRequest, changedURL?: string): Promise<schemas.UpdateExperimentResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(experiments\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)

        // build query params
        if (changedURL){
            url_with_query_params.searchParams.set('changedURL', changedURL)
        }
        
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "patch", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        if (response.status === 202){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Delete an experiment
    
    */
    public async deleteExperiment(url: string): Promise<schemas.DeleteExperimentResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(experiments\/[^?]*?)()?$').exec(url)
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
    List templates
    
    */
    public async listTemplate(url: string = "/templates"): Promise<schemas.ListTemplateResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(templates)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/templates'
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
    Create a new template
    
    */
    public async createTemplate(body: schemas.CreateTemplateRequest, url: string = "/templates"): Promise<schemas.CreateTemplateResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(templates)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/templates'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.BASE_URL)
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        if (response.status === 202){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    View an template.
    
    */
    public async getTemplate(url: string): Promise<schemas.GetTemplateResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(templates\/[^?]*?)()?$').exec(url)
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
    Update an existing template.
    
    With this endpoint an template can be changed. The request body may be skipped if you just want to set a hook via the query string parameters.
    
    If a body is supplied you can choose to include any first level fields which will fully replace the field in the existing template.
    
    */
    public async updateTemplate(url: string, body: schemas.UpdateTemplateRequest): Promise<schemas.UpdateTemplateResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(templates\/[^?]*?)()?$').exec(url)
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
        if (response.status === 202){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Delete an template
    
    */
    public async deleteTemplate(url: string): Promise<schemas.DeleteTemplateResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(templates\/[^?]*?)()?$').exec(url)
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
}
