import { expect } from 'chai';
import { randomBytes } from 'crypto';
import express from 'express';
import http from 'http';
import * as jose from 'jose';
import { SignJWT } from 'jose';

import { app } from '../src/app.js';
import { LTIPlatform } from '../src/business/lti_platform.js';
import { chai } from './helper.js';

export class PlatformHost {
  private publicKey: jose.JWK | undefined;
  private privateKey: jose.KeyLike | undefined;
  private kid: string | undefined;
  private server: http.Server | undefined;

  get iss() {
    if (!this.server) {
      throw new Error('Server not initialized');
    }
    const address = this.server.address() as any;
    return 'http://localhost:' + address.port;
  }

  get_login_parameters(target_link_uri: string) {
    return {
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
      nonce,
    };
    const id_token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'ES256', kid: this.kid })
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(this.privateKey!);

    return {
      state,
      id_token,
    };
  }
  private async init_keys() {
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

    app.post('/access_token', (_req, res) => {
      res.send({
        access_token: 'Host Token',
        token_type: 'Bearer',
        expires_in: 3600,
      });
    });

    app.get('/context_memberships', (_req, res) => {
      res.send({
        id: 'https://lms.example.com/sections/2923/memberships?rlid=49566-rkk96',
        context: {
          id: '2923-abc',
          label: 'CPS 435',
          title: 'CPS 435 Learning Analytics',
        },
        members: [
          {
            status: 'Active',
            name: 'Jane Q. Public',
            picture: 'https://platform.example.edu/jane.jpg',
            given_name: 'Jane',
            family_name: 'Doe',
            middle_name: 'Marie',
            email: 'jane@platform.example.edu',
            user_id: '0ae836b9-7fc9-4060-006f-27b2066ac545',
            lis_person_sourcedid: '59254-6782-12ab',
            lti11_legacy_user_id: '668321221-2879',
            roles: ['Instructor', 'Mentor'],
            message: [
              {
                'https://purl.imsglobal.org/spec/lti/claim/message_type':
                  'LtiResourceLinkRequest',
                'https://purl.imsglobal.org/spec/lti-bo/claim/basicoutcome': {
                  lis_result_sourcedid: 'example.edu:71ee7e42-f6d2-414a-80db-b69ac2defd4',
                  lis_outcome_service_url: 'https://www.example.com/2344',
                },
                'https://purl.imsglobal.org/spec/lti/claim/custom': {
                  country: 'Canada',
                  user_mobile: '123-456-7890',
                },
              },
            ],
          },
        ],
      });
    });

    // find free port:
    this.server = http.createServer(app);
    this.server.listen(0);
  }

  close() {
    if (this.server) {
      this.server.close();
    }
  }
}

export async function launch(platform: LTIPlatform, platformHost: PlatformHost) {
  let res = await chai
    .request(app)
    .post('/lti/platform/' + platform.platform_id + '/login')
    .send(
      platformHost.get_login_parameters(
        '/lti/platform/' + platform.platform_id + '/launch',
      ),
    );
  expect(res.status).to.equal(200, res.text);
  res = await chai
    .request(app)
    .post('/lti/platform/' + platform.platform_id + '/launch')
    .send(
      await platformHost.get_launch_parameters(res.body.authentication_request_url, {
        'sub': 'Test User',
        'https://purl.imsglobal.org/spec/lti/claim/message_type':
          'LtiResourceLinkRequest',
        'https://purl.imsglobal.org/spec/lti/claim/roles': [
          '"http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student',
        ],
        'https://purl.imsglobal.org/spec/lti/claim/resource_link': {
          id: '200d101f-2c14-434a-a0f3-57c2a42369fd',
          description: 'Assignment to introduce who you are',
          title: 'Introduction Assignment',
        },
        'https://purl.imsglobal.org/spec/lti-nrps/claim/namesroleservice': {
          context_memberships_url: platformHost.iss + '/context_memberships',
          service_versions: ['2.0'],
        },
      }),
    );
  return res;
}
