import { ServiceConfiguration } from './deviceMessages.js';
import { PeerConnection } from './peer/connection.js';

export type ServiceDirection = 'consumer' | 'producer' | 'prosumer';
export const Consumer: ServiceDirection = 'consumer';
export const Producer: ServiceDirection = 'producer';
export const Prosumer: ServiceDirection = 'prosumer';
export { ServiceConfiguration };

export interface Service<T extends string = string, ID extends string=string, FS extends Record<string, any> = Record<string, any>> {
  getMeta: () => {
    serviceId: ID;
    serviceType: T;
    serviceDirection: ServiceDirection;
  };
  serviceType: T;
  serviceId: ID;
  serviceDirection: ServiceDirection;
  setupConnection(connection: PeerConnection, serviceConfig: ServiceConfiguration): void;
  get_state(): FS
}
