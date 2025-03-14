import { config as CommonConfig, utils } from '@crosslab/service-common';
import dotenv from 'dotenv';

import { Migrations } from './database/migrations/index.js';
import { Entities } from './database/model.js';

dotenv.config();

const basicOrmConfig = CommonConfig.readOrmConfig();

const webrtcIceServers = (()=>{
  const servers: {urls: string, username?: string, credential?: string}[]=[]
  for (const key in process.env){
    const match=RegExp("^WEBRTC_ICE_SERVER_([^_]*)$").exec(key);
    if(match){
      const server_name=match[1];
      const urls=process.env[match[0]];
      if(!urls || !RegExp("^(turn|stun):[^:]*:\d+$").exec(urls)){
        utils.die("Invalid ICE server URL: "+urls);
      }else{
        const server: {urls: string, username?: string, credential?: string} = {urls};
        if (process.env[`WEBRTC_ICE_SERVER_${server_name}_USERNAME`]){
          server.username=process.env[`WEBRTC_ICE_SERVER_${server_name}_USERNAME`];
        }
        if (process.env[`WEBRTC_ICE_SERVER_${server_name}_CREDENTIAL`]){
          server.credential=process.env[`WEBRTC_ICE_SERVER_${server_name}_CREDENTIAL`];
        }
        servers.push(server);
      }

    }
  }
  return servers;
})()

export const config = {
  PORT: parseInt(process.env.PORT ?? '3001'),
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  BASE_URL: process.env.BASE_URL ?? 'http://localhost',
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL ?? 'http://localhost:3000',
  FEDERATION_SERVICE_URL: process.env.FEDERATION_SERVICE_URL ?? 'http://localhost:3001',
  AUTHORIZATION_SERVER:
    process.env.AUTHORIZATION_SERVER ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  AUTHORIZATION_PSK:
    process.env.AUTHORIZATION_PSK ||
    utils.die('Environment variable AUTHORIZATION_PSK must be set'),
  JWT_SECRET: 'secret',
  WEBRTC_ICE_SERVERS: webrtcIceServers,
  orm: {
    ...basicOrmConfig,
    entities: Entities,
    migrations: Migrations(basicOrmConfig.type),
    migrationsRun: true,
  },
};

