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
        private fixedHeaders: Record<string, string>

    constructor(BASE_URL: string, SERVICE_URL?: string, fixedHeaders?: Record<string, string>) {
        this.BASE_URL = BASE_URL;
        this.SERVICE_URL = SERVICE_URL ?? BASE_URL;
        this.fixedHeaders=fixedHeaders??{};
    }

    private fetch = async (url: RequestInfo | URL, init: RequestInit) => {
        let raw_response;
        init.headers = init.headers || { 'Content-Type': 'application/json' };
        init.headers = {...this.fixedHeaders, ...init.headers,}
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
    List devices
    
    */
    public async listDevices(url: string = "/devices"): Promise<schemas.ListDevicesResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(devices)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/devices'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Create a new device
    
    */
    public async createDevice(body: schemas.CreateDeviceRequest, url: string = "/devices", changedUrl?: string): Promise<schemas.CreateDeviceResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(devices)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/devices'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        if (changedUrl){
            
            url_with_query_params.searchParams.set('changedUrl', changedUrl)
            
        }
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    View a registered device
    
    */
    public async getDevice(url: string, flatGroup?: boolean): Promise<schemas.GetDeviceResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        if (flatGroup){
            
            url_with_query_params.searchParams.set('flatGroup', "true")
            
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
    Update an existing device
    
    */
    public async updateDevice(url: string, body?: schemas.UpdateDeviceRequest, changedUrl?: string): Promise<schemas.UpdateDeviceResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        if (changedUrl){
            
            url_with_query_params.searchParams.set('changedUrl', changedUrl)
            
        }
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "patch", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Delete a registered device
    
    */
    public async deleteDevice(url: string): Promise<schemas.DeleteDeviceResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "delete"});
           
        // transform response
        if (response.status === 204){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Instantiate a cloud instantiable device
    
    */
    public async instantiateDevice(url: string, changedUrl?: string): Promise<schemas.InstantiateDeviceResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        if (changedUrl){
            
            url_with_query_params.searchParams.set('changedUrl', changedUrl)
            
        }
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post"});
           
        // transform response
        if (response.status === 201){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Get the availability of a device
    
    */
    public async getDeviceAvailability(url: string, startTime?: string, endTime?: string): Promise<schemas.GetDeviceAvailabilityResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)(\/availability)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/availability'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        if (startTime){
            
            url_with_query_params.searchParams.set('startTime', startTime)
            
        }
        if (endTime){
            
            url_with_query_params.searchParams.set('endTime', endTime)
            
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
    Delete the availability rules of a device
    
    */
    public async deleteDeviceAvailabilityRules(url: string): Promise<schemas.DeleteDeviceAvailabilityRulesResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)(\/availability)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/availability'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "delete"});
           
        // transform response
        if (response.status === 204){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Add availability rules for a device
    
    */
    public async addDeviceAvailabilityRules(url: string, body?: schemas.AddDeviceAvailabilityRulesRequest): Promise<schemas.AddDeviceAvailabilityRulesResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)(\/availability)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/availability'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Create new websocket token for device
    
    */
    public async createWebsocketToken(url: string): Promise<schemas.CreateWebsocketTokenResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)(\/websocket)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/websocket'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Send signaling message to device
    
    */
    public async sendSignalingMessage(url: string, body: schemas.SendSignalingMessageRequest, peerconnectionUrl: string): Promise<schemas.SendSignalingMessageResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(devices\/[^?]*?)(\/signaling)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/signaling'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        
        url_with_query_params.searchParams.set('peerconnectionUrl', peerconnectionUrl)
            
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "post", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    List Peer Connection
    
    */
    public async listPeerconnections(url: string = "/peerconnections"): Promise<schemas.ListPeerconnectionsResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(peerconnections)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/peerconnections'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Create a new Peer Connection
    
    */
    public async createPeerconnection(body: schemas.CreatePeerconnectionRequest, url: string = "/peerconnections", closedUrl?: string, statusChangedUrl?: string): Promise<schemas.CreatePeerconnectionResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?()(peerconnections)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/peerconnections'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        if (closedUrl){
            
            url_with_query_params.searchParams.set('closedUrl', closedUrl)
            
        }
        if (statusChangedUrl){
            
            url_with_query_params.searchParams.set('statusChangedUrl', statusChangedUrl)
            
        }
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
    View a peer connection
    
    */
    public async getPeerconnection(url: string): Promise<schemas.GetPeerconnectionResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(peerconnections\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "get"});
           
        // transform response
        if (response.status === 200){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Delete a peer connection
    
    */
    public async deletePeerconnection(url: string): Promise<schemas.DeletePeerconnectionResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(peerconnections\/[^?]*?)()?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+''
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        // make http call
        const response = await this.fetch(url_with_query_params, {method: "delete"});
           
        // transform response
        if (response.status === 202){
            return response.body
        }
        if (response.status === 204){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }

    /*
    Sets the peerconnection status of a single device.
    
    */
    public async patchPeerconnectionDeviceStatus(url: string, body: schemas.PatchPeerconnectionDeviceStatusRequest, deviceUrl: string): Promise<schemas.PatchPeerconnectionDeviceStatusResponse> {
        // match path to url schema
        const m = new RegExp('^('+escapeRegex(this.BASE_URL)+')?\/?(peerconnections\/[^?]*?)(\/device_status)?$').exec(url)
        if (!m) throw new Error("Invalid url")
        let valid_url = '/'+m[2]+'/device_status'
        if (valid_url.startsWith('//')) valid_url = valid_url.slice(1)

        const url_with_query_params = new URL(this.SERVICE_URL+valid_url, this.SERVICE_URL)

        
        url_with_query_params.searchParams.set('deviceUrl', deviceUrl)
            
        // make http call
        const response = await this.fetch(url_with_query_params, {method: "patch", body: JSON.stringify(body)});
           
        // transform response
        if (response.status === 204){
            return response.body
        }
        throw new Error("Unexpected status code: "+response.status)
    }
}
