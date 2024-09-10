import express from 'express';

import { randomBytes } from 'crypto';
import http from 'http';
import * as jose from 'jose';
import { SignJWT } from 'jose';

export class PlatformHost {
    private publicKey: jose.JWK | undefined;
    private privateKey: jose.KeyLike| undefined;
    private kid: string | undefined;
    private server: http.Server | undefined;

    get iss(){
        if (!this.server){
            throw new Error('Server not initialized');
        }
        const address = this.server.address() as any;
        return 'http://localhost:' + address.port;
    }

    
    get_login_parameters(target_link_uri: string){
        return{
            iss: this.iss,
            client_id: 'TEST',
            lti_deployment_id: 'TEST',
            target_link_uri,
            login_hint: 'TEST',
            lti_message_hint: 'TEST',
        };
    }
    
    async get_launch_parameters(authentication_request_url: string, message: any) {
        const auth_request = new URL(authentication_request_url);
        // const rederict_uri = auth_request.searchParams.get('redirect_uri');
        const state = auth_request.searchParams.get('state');
        const nonce = auth_request.searchParams.get('nonce');

        const payload = {
            ...message,
            iss: this.iss,
            nonce
        }
        const id_token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'ES256', kid: this.kid })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(this.privateKey!);
    

        return {
            state,
            id_token
        }
    }
    private async init_keys(){
        const keyset = await jose.generateKeyPair('ES256');
        this.publicKey = await jose.exportJWK(keyset.publicKey);
        this.kid = randomBytes(8).toString('base64url');
        this.publicKey.kid = this.kid;
        this.privateKey = keyset.privateKey;
    }
    async init() {
        await this.init_keys();
        const app = express();
        app.get('/jwks', (_req, res) => {
            res.json({ keys: [this.publicKey] });
        });

        app.get('/auth_request', (_req, res) => {
            res.send();
        });

        app.get('/access_token', (_req, res) => {
            res.send();
        });

        // find free port:
        this.server=http.createServer(app);
        this.server.listen(0);
    }

    close(){
        if (this.server){
            this.server.close();
        }
    }
}
