export type ListDevicesResponse200Items = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device' | 'group' | 'edge instantiable' | 'cloud instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
};

export type ListDevicesResponse200 = ListDevicesResponse200Items[];

export type ListDevicesResponse = ListDevicesResponse200;

export type CreateDeviceRequestAlt1ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type CreateDeviceRequestAlt1 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'cloud instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  instantiateUrl?: string;
  services?: CreateDeviceRequestAlt1ServicesItems[];
};

export type CreateDeviceRequestAlt2AnnouncedavailabilityItems = {
  start?: string;
  end?: string;
};

export type CreateDeviceRequestAlt2ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type CreateDeviceRequestAlt2 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;

  /* If true, the device is connected to the service and can be used.
   */
  connected?: boolean;

  /* A list of time slots that the maintainer of the device announced it is available
   */
  announcedAvailability?: CreateDeviceRequestAlt2AnnouncedavailabilityItems[];
  experiment?: string;
  services?: CreateDeviceRequestAlt2ServicesItems[];
};

export type CreateDeviceRequestAlt3ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type CreateDeviceRequestAlt3 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'edge instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  codeUrl?: string;
  services?: CreateDeviceRequestAlt3ServicesItems[];
};

export type CreateDeviceRequestAlt4DevicesItems = {
  /* URL of the device */
  url: string;
};

export type CreateDeviceRequestAlt4 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'group';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  devices: CreateDeviceRequestAlt4DevicesItems[];
};

export type CreateDeviceRequest =
  | CreateDeviceRequestAlt1
  | CreateDeviceRequestAlt2
  | CreateDeviceRequestAlt3
  | CreateDeviceRequestAlt4;

export type CreateDeviceResponse201Alt1ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type CreateDeviceResponse201Alt1 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'cloud instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  instantiateUrl?: string;
  services?: CreateDeviceResponse201Alt1ServicesItems[];
};

export type CreateDeviceResponse201Alt2AnnouncedavailabilityItems = {
  start?: string;
  end?: string;
};

export type CreateDeviceResponse201Alt2ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type CreateDeviceResponse201Alt2 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;

  /* If true, the device is connected to the service and can be used.
   */
  connected?: boolean;

  /* A list of time slots that the maintainer of the device announced it is available
   */
  announcedAvailability?: CreateDeviceResponse201Alt2AnnouncedavailabilityItems[];
  experiment?: string;
  services?: CreateDeviceResponse201Alt2ServicesItems[];
};

export type CreateDeviceResponse201Alt3ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type CreateDeviceResponse201Alt3 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'edge instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  codeUrl?: string;
  services?: CreateDeviceResponse201Alt3ServicesItems[];
};

export type CreateDeviceResponse201Alt4DevicesItems = {
  /* URL of the device */
  url: string;
};

export type CreateDeviceResponse201Alt4 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'group';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  devices: CreateDeviceResponse201Alt4DevicesItems[];
};

export type CreateDeviceResponse201 =
  | CreateDeviceResponse201Alt1
  | CreateDeviceResponse201Alt2
  | CreateDeviceResponse201Alt3
  | CreateDeviceResponse201Alt4;

export type CreateDeviceResponse = CreateDeviceResponse201;

export type GetDeviceResponse200Alt1ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type GetDeviceResponse200Alt1 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'cloud instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  instantiateUrl?: string;
  services?: GetDeviceResponse200Alt1ServicesItems[];
};

export type GetDeviceResponse200Alt2AnnouncedavailabilityItems = {
  start?: string;
  end?: string;
};

export type GetDeviceResponse200Alt2ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type GetDeviceResponse200Alt2 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;

  /* If true, the device is connected to the service and can be used.
   */
  connected?: boolean;

  /* A list of time slots that the maintainer of the device announced it is available
   */
  announcedAvailability?: GetDeviceResponse200Alt2AnnouncedavailabilityItems[];
  experiment?: string;
  services?: GetDeviceResponse200Alt2ServicesItems[];
};

export type GetDeviceResponse200Alt3ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type GetDeviceResponse200Alt3 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'edge instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  codeUrl?: string;
  services?: GetDeviceResponse200Alt3ServicesItems[];
};

export type GetDeviceResponse200Alt4DevicesItems = {
  /* URL of the device */
  url: string;
};

export type GetDeviceResponse200Alt4 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'group';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  devices: GetDeviceResponse200Alt4DevicesItems[];
};

export type GetDeviceResponse200 =
  | GetDeviceResponse200Alt1
  | GetDeviceResponse200Alt2
  | GetDeviceResponse200Alt3
  | GetDeviceResponse200Alt4;

export type GetDeviceResponse = GetDeviceResponse200;

export type UpdateDeviceRequestAlt1ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type UpdateDeviceRequestAlt1 = {
  /* Name of the device */
  name?: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'cloud instantiable';

  /* If true, the device may be seen and used by every user. */
  isPublic?: boolean;
  instantiateUrl?: string;
  services?: UpdateDeviceRequestAlt1ServicesItems[];
};

export type UpdateDeviceRequestAlt2ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type UpdateDeviceRequestAlt2 = {
  /* Name of the device */
  name?: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device';

  /* If true, the device may be seen and used by every user. */
  isPublic?: boolean;
  experiment?: string;
  services?: UpdateDeviceRequestAlt2ServicesItems[];
};

export type UpdateDeviceRequestAlt3ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type UpdateDeviceRequestAlt3 = {
  /* Name of the device */
  name?: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'edge instantiable';

  /* If true, the device may be seen and used by every user. */
  isPublic?: boolean;
  codeUrl?: string;
  services?: UpdateDeviceRequestAlt3ServicesItems[];
};

export type UpdateDeviceRequestAlt4DevicesItems = {
  /* URL of the device */
  url: string;
};

export type UpdateDeviceRequestAlt4 = {
  /* Name of the device */
  name?: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'group';

  /* If true, the device may be seen and used by every user. */
  isPublic?: boolean;
  devices?: UpdateDeviceRequestAlt4DevicesItems[];
};

export type UpdateDeviceRequest =
  | UpdateDeviceRequestAlt1
  | UpdateDeviceRequestAlt2
  | UpdateDeviceRequestAlt3
  | UpdateDeviceRequestAlt4;

export type UpdateDeviceResponse200Alt1ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type UpdateDeviceResponse200Alt1 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'cloud instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  instantiateUrl?: string;
  services?: UpdateDeviceResponse200Alt1ServicesItems[];
};

export type UpdateDeviceResponse200Alt2AnnouncedavailabilityItems = {
  start?: string;
  end?: string;
};

export type UpdateDeviceResponse200Alt2ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type UpdateDeviceResponse200Alt2 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;

  /* If true, the device is connected to the service and can be used.
   */
  connected?: boolean;

  /* A list of time slots that the maintainer of the device announced it is available
   */
  announcedAvailability?: UpdateDeviceResponse200Alt2AnnouncedavailabilityItems[];
  experiment?: string;
  services?: UpdateDeviceResponse200Alt2ServicesItems[];
};

export type UpdateDeviceResponse200Alt3ServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type UpdateDeviceResponse200Alt3 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'edge instantiable';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  codeUrl?: string;
  services?: UpdateDeviceResponse200Alt3ServicesItems[];
};

export type UpdateDeviceResponse200Alt4DevicesItems = {
  /* URL of the device */
  url: string;
};

export type UpdateDeviceResponse200Alt4 = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'group';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;
  devices: UpdateDeviceResponse200Alt4DevicesItems[];
};

export type UpdateDeviceResponse200 =
  | UpdateDeviceResponse200Alt1
  | UpdateDeviceResponse200Alt2
  | UpdateDeviceResponse200Alt3
  | UpdateDeviceResponse200Alt4;

export type UpdateDeviceResponse = UpdateDeviceResponse200;

export type DeleteDeviceResponse = void;

export type InstantiateDeviceResponse201InstanceAnnouncedavailabilityItems = {
  start?: string;
  end?: string;
};

export type InstantiateDeviceResponse201InstanceServicesItems = {
  serviceType?: string;
  serviceId?: string;
  serviceDirection?: 'consumer' | 'producer' | 'prosumer';
};

export type InstantiateDeviceResponse201Instance = {
  /* URL of the device */
  url: string;

  /* Name of the device */
  name: string;

  /* Extended description of the device, features, etc. */
  description?: string;

  /* Type of the device */
  type: 'device';
  owner: string;

  /* If true, the device may be seen and used by every user. */
  isPublic: boolean;

  /* If true, the device is connected to the service and can be used.
   */
  connected?: boolean;

  /* A list of time slots that the maintainer of the device announced it is available
   */
  announcedAvailability?: InstantiateDeviceResponse201InstanceAnnouncedavailabilityItems[];
  experiment?: string;
  services?: InstantiateDeviceResponse201InstanceServicesItems[];
};

export type InstantiateDeviceResponse201 = {
  instance: InstantiateDeviceResponse201Instance;
  deviceToken: string;
};

export type InstantiateDeviceResponse = InstantiateDeviceResponse201;

export type GetDeviceAvailabilityResponse200Items = {
  start?: string;
  end?: string;
};

export type GetDeviceAvailabilityResponse200 = GetDeviceAvailabilityResponse200Items[];

export type GetDeviceAvailabilityResponse = GetDeviceAvailabilityResponse200;

export type DeleteDeviceAvailabilityRulesResponse = void;

export type AddDeviceAvailabilityRulesRequestItems = {};

export type AddDeviceAvailabilityRulesRequest = AddDeviceAvailabilityRulesRequestItems[];

export type AddDeviceAvailabilityRulesResponse200Items = {
  start?: string;
  end?: string;
};

export type AddDeviceAvailabilityRulesResponse200 =
  AddDeviceAvailabilityRulesResponse200Items[];

export type AddDeviceAvailabilityRulesResponse = AddDeviceAvailabilityRulesResponse200;

export type CreateWebsocketTokenResponse200 = string;

export type CreateWebsocketTokenResponse = CreateWebsocketTokenResponse200;

export type SendSignalingMessageRequestAlt1ServicesItems = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};

export type SendSignalingMessageRequestAlt1Config = {};

export type SendSignalingMessageRequestAlt1 = {
  messageType: 'command';
  command: 'createPeerconnection';
  connectionType: 'webrtc' | 'websocket' | 'local';
  connectionUrl: string;
  services: SendSignalingMessageRequestAlt1ServicesItems[];
  tiebreaker: boolean;
  config?: SendSignalingMessageRequestAlt1Config;
};

export type SendSignalingMessageRequestAlt2 = {
  messageType: 'command';
  command: 'closePeerconnection';
  connectionUrl: string;
};

export type SendSignalingMessageRequestAlt3Content = {};

export type SendSignalingMessageRequestAlt3 = {
  messageType: 'signaling';
  signalingType: 'offer' | 'answer' | 'candidate';
  connectionUrl: string;
  content: SendSignalingMessageRequestAlt3Content;
};

export type SendSignalingMessageRequest =
  | SendSignalingMessageRequestAlt1
  | SendSignalingMessageRequestAlt2
  | SendSignalingMessageRequestAlt3;

export type SendSignalingMessageResponse = void;

export type ListPeerconnectionsResponse200ItemsDevicesItems = {
  /* URL of the device */
  url: string;
};

export type ListPeerconnectionsResponse200Items = {
  /* URL of the peerconnection */
  url: string;

  /* Type of the peerconnection */
  type: 'local' | 'webrtc';

  /* The status of the peerconnection. */
  status?: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  devices: ListPeerconnectionsResponse200ItemsDevicesItems[];
};

export type ListPeerconnectionsResponse200 = ListPeerconnectionsResponse200Items[];

export type ListPeerconnectionsResponse = ListPeerconnectionsResponse200;

export type CreatePeerconnectionRequestDevicesItemsConfigServicesItems = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};

export type CreatePeerconnectionRequestDevicesItemsConfig = {
  services?: CreatePeerconnectionRequestDevicesItemsConfigServicesItems[];
};

export type CreatePeerconnectionRequestDevicesItems = {
  /* URL of the device */
  url: string;
  config?: CreatePeerconnectionRequestDevicesItemsConfig;
};

export type CreatePeerconnectionRequest = {
  /* URL of the peerconnection */
  url: string;

  /* Type of the peerconnection */
  type: 'local' | 'webrtc';

  /* The status of the peerconnection. */
  status?: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  devices: CreatePeerconnectionRequestDevicesItems[];
};

export type CreatePeerconnectionResponse201DevicesItemsConfigServicesItems = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};

export type CreatePeerconnectionResponse201DevicesItemsConfig = {
  services?: CreatePeerconnectionResponse201DevicesItemsConfigServicesItems[];
};

export type CreatePeerconnectionResponse201DevicesItems = {
  /* URL of the device */
  url: string;
  config?: CreatePeerconnectionResponse201DevicesItemsConfig;
};

export type CreatePeerconnectionResponse201 = {
  /* URL of the peerconnection */
  url: string;

  /* Type of the peerconnection */
  type: 'local' | 'webrtc';

  /* The status of the peerconnection. */
  status?: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  devices: CreatePeerconnectionResponse201DevicesItems[];
};

export type CreatePeerconnectionResponse202DevicesItemsConfigServicesItems = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};

export type CreatePeerconnectionResponse202DevicesItemsConfig = {
  services?: CreatePeerconnectionResponse202DevicesItemsConfigServicesItems[];
};

export type CreatePeerconnectionResponse202DevicesItems = {
  /* URL of the device */
  url: string;
  config?: CreatePeerconnectionResponse202DevicesItemsConfig;
};

export type CreatePeerconnectionResponse202 = {
  /* URL of the peerconnection */
  url: string;

  /* Type of the peerconnection */
  type: 'local' | 'webrtc';

  /* The status of the peerconnection. */
  status?: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  devices: CreatePeerconnectionResponse202DevicesItems[];
};

export type CreatePeerconnectionResponse =
  | CreatePeerconnectionResponse201
  | CreatePeerconnectionResponse202;

export type GetPeerconnectionResponse200DevicesItemsConfigServicesItems = {
  serviceType: string;
  serviceId: string;
  remoteServiceId: string;
};

export type GetPeerconnectionResponse200DevicesItemsConfig = {
  services?: GetPeerconnectionResponse200DevicesItemsConfigServicesItems[];
};

export type GetPeerconnectionResponse200DevicesItems = {
  /* URL of the device */
  url: string;
  config?: GetPeerconnectionResponse200DevicesItemsConfig;
};

export type GetPeerconnectionResponse200 = {
  /* URL of the peerconnection */
  url: string;

  /* Type of the peerconnection */
  type: 'local' | 'webrtc';

  /* The status of the peerconnection. */
  status?: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
  devices: GetPeerconnectionResponse200DevicesItems[];
};

export type GetPeerconnectionResponse = GetPeerconnectionResponse200;

export type DeletePeerconnectionResponse = void;

export type PatchPeerconnectionDeviceStatusRequest = {
  /* The status of the peerconnection. */
  status: 'new' | 'connecting' | 'connected' | 'disconnected' | 'failed' | 'closed';
};

export type PatchPeerconnectionDeviceStatusResponse = void;
