export type ListExperimentsResponse200ItemsStatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type ListExperimentsResponse200ItemsStatusAlt2 = "created" | "booked" | "running" | "finished";

export type ListExperimentsResponse200ItemsStatus = ListExperimentsResponse200ItemsStatusAlt1 | ListExperimentsResponse200ItemsStatusAlt2;

export type ListExperimentsResponse200Items = {
  /* URL of the experiment */
  url: string;
  status: ListExperimentsResponse200ItemsStatus;
};

export type ListExperimentsResponse200 = ListExperimentsResponse200Items[];

export type ListExperimentsResponse = ListExperimentsResponse200;

export type CreateExperimentRequestStatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type CreateExperimentRequestStatusAlt2 = "created" | "booked" | "running" | "finished";

export type CreateExperimentRequestStatus = CreateExperimentRequestStatusAlt1 | CreateExperimentRequestStatusAlt2;

export type CreateExperimentRequestBookingtime = {
  startTime?: string;
  endTime?: string;
};

export type CreateExperimentRequestDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type CreateExperimentRequestRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateExperimentRequestServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig = {};

export type CreateExperimentRequestServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: CreateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig;
};

export type CreateExperimentRequestServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: CreateExperimentRequestServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: CreateExperimentRequestServiceconfigurationsItemsParticipantsItems[];
};

export type CreateExperimentRequestInstantiateddevicesItems = {
  codeUrl: string;
  url: string;
  token: string;
  instanceOf: string;
};

export type CreateExperimentRequest = {
  /* URL of the experiment */
  url: string;
  status: CreateExperimentRequestStatus;
  bookingTime?: CreateExperimentRequestBookingtime;

  /* Devices associated with the experiment */
  devices: CreateExperimentRequestDevicesItems[];

  /* Roles that are used in this experiment */
  roles: CreateExperimentRequestRolesItems[];

  /* Connections associated with the experiment */
  connections: string[];

  /* Services associated with the experiment */
  serviceConfigurations: CreateExperimentRequestServiceconfigurationsItems[];

  /* Instantiated devices that need to be started by the user. */
  instantiatedDevices: CreateExperimentRequestInstantiateddevicesItems[];
};

export type CreateExperimentResponse201StatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type CreateExperimentResponse201StatusAlt2 = "created" | "booked" | "running" | "finished";

export type CreateExperimentResponse201Status = CreateExperimentResponse201StatusAlt1 | CreateExperimentResponse201StatusAlt2;

export type CreateExperimentResponse201Bookingtime = {
  startTime?: string;
  endTime?: string;
};

export type CreateExperimentResponse201DevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type CreateExperimentResponse201RolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateExperimentResponse201ServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItemsConfig = {};

export type CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItemsConfig;
};

export type CreateExperimentResponse201ServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: CreateExperimentResponse201ServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: CreateExperimentResponse201ServiceconfigurationsItemsParticipantsItems[];
};

export type CreateExperimentResponse201InstantiateddevicesItems = {
  codeUrl: string;
  url: string;
  token: string;
  instanceOf: string;
};

export type CreateExperimentResponse201 = {
  /* URL of the experiment */
  url: string;
  status: CreateExperimentResponse201Status;
  bookingTime?: CreateExperimentResponse201Bookingtime;

  /* Devices associated with the experiment */
  devices: CreateExperimentResponse201DevicesItems[];

  /* Roles that are used in this experiment */
  roles: CreateExperimentResponse201RolesItems[];

  /* Connections associated with the experiment */
  connections: string[];

  /* Services associated with the experiment */
  serviceConfigurations: CreateExperimentResponse201ServiceconfigurationsItems[];

  /* Instantiated devices that need to be started by the user. */
  instantiatedDevices: CreateExperimentResponse201InstantiateddevicesItems[];
};

export type CreateExperimentResponse202StatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type CreateExperimentResponse202StatusAlt2 = "created" | "booked" | "running" | "finished";

export type CreateExperimentResponse202Status = CreateExperimentResponse202StatusAlt1 | CreateExperimentResponse202StatusAlt2;

export type CreateExperimentResponse202Bookingtime = {
  startTime?: string;
  endTime?: string;
};

export type CreateExperimentResponse202DevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type CreateExperimentResponse202RolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateExperimentResponse202ServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig = {};

export type CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig;
};

export type CreateExperimentResponse202ServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: CreateExperimentResponse202ServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: CreateExperimentResponse202ServiceconfigurationsItemsParticipantsItems[];
};

export type CreateExperimentResponse202InstantiateddevicesItems = {
  codeUrl: string;
  url: string;
  token: string;
  instanceOf: string;
};

export type CreateExperimentResponse202 = {
  /* URL of the experiment */
  url: string;
  status: CreateExperimentResponse202Status;
  bookingTime?: CreateExperimentResponse202Bookingtime;

  /* Devices associated with the experiment */
  devices: CreateExperimentResponse202DevicesItems[];

  /* Roles that are used in this experiment */
  roles: CreateExperimentResponse202RolesItems[];

  /* Connections associated with the experiment */
  connections: string[];

  /* Services associated with the experiment */
  serviceConfigurations: CreateExperimentResponse202ServiceconfigurationsItems[];

  /* Instantiated devices that need to be started by the user. */
  instantiatedDevices: CreateExperimentResponse202InstantiateddevicesItems[];
};

export type CreateExperimentResponse = CreateExperimentResponse201 | CreateExperimentResponse202;

export type GetExperimentResponse200StatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type GetExperimentResponse200StatusAlt2 = "created" | "booked" | "running" | "finished";

export type GetExperimentResponse200Status = GetExperimentResponse200StatusAlt1 | GetExperimentResponse200StatusAlt2;

export type GetExperimentResponse200Bookingtime = {
  startTime?: string;
  endTime?: string;
};

export type GetExperimentResponse200DevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type GetExperimentResponse200RolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type GetExperimentResponse200ServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type GetExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig = {};

export type GetExperimentResponse200ServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: GetExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig;
};

export type GetExperimentResponse200ServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: GetExperimentResponse200ServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: GetExperimentResponse200ServiceconfigurationsItemsParticipantsItems[];
};

export type GetExperimentResponse200InstantiateddevicesItems = {
  codeUrl: string;
  url: string;
  token: string;
  instanceOf: string;
};

export type GetExperimentResponse200 = {
  /* URL of the experiment */
  url: string;
  status: GetExperimentResponse200Status;
  bookingTime?: GetExperimentResponse200Bookingtime;

  /* Devices associated with the experiment */
  devices: GetExperimentResponse200DevicesItems[];

  /* Roles that are used in this experiment */
  roles: GetExperimentResponse200RolesItems[];

  /* Connections associated with the experiment */
  connections: string[];

  /* Services associated with the experiment */
  serviceConfigurations: GetExperimentResponse200ServiceconfigurationsItems[];

  /* Instantiated devices that need to be started by the user. */
  instantiatedDevices: GetExperimentResponse200InstantiateddevicesItems[];
};

export type GetExperimentResponse = GetExperimentResponse200;

export type UpdateExperimentRequestStatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type UpdateExperimentRequestStatusAlt2 = "created" | "booked" | "running" | "finished";

export type UpdateExperimentRequestStatus = UpdateExperimentRequestStatusAlt1 | UpdateExperimentRequestStatusAlt2;

export type UpdateExperimentRequestBookingtime = {
  startTime?: string;
  endTime?: string;
};

export type UpdateExperimentRequestDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type UpdateExperimentRequestRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateExperimentRequestServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig = {};

export type UpdateExperimentRequestServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: UpdateExperimentRequestServiceconfigurationsItemsParticipantsItemsConfig;
};

export type UpdateExperimentRequestServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: UpdateExperimentRequestServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: UpdateExperimentRequestServiceconfigurationsItemsParticipantsItems[];
};

export type UpdateExperimentRequest = {
  status?: UpdateExperimentRequestStatus;
  bookingTime?: UpdateExperimentRequestBookingtime;

  /* Devices associated with the experiment */
  devices?: UpdateExperimentRequestDevicesItems[];

  /* Roles that are used in this experiment */
  roles?: UpdateExperimentRequestRolesItems[];

  /* Services associated with the experiment */
  serviceConfigurations?: UpdateExperimentRequestServiceconfigurationsItems[];
};

export type UpdateExperimentResponse200StatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type UpdateExperimentResponse200StatusAlt2 = "created" | "booked" | "running" | "finished";

export type UpdateExperimentResponse200Status = UpdateExperimentResponse200StatusAlt1 | UpdateExperimentResponse200StatusAlt2;

export type UpdateExperimentResponse200Bookingtime = {
  startTime?: string;
  endTime?: string;
};

export type UpdateExperimentResponse200DevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type UpdateExperimentResponse200RolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateExperimentResponse200ServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig = {};

export type UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItemsConfig;
};

export type UpdateExperimentResponse200ServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: UpdateExperimentResponse200ServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: UpdateExperimentResponse200ServiceconfigurationsItemsParticipantsItems[];
};

export type UpdateExperimentResponse200InstantiateddevicesItems = {
  codeUrl: string;
  url: string;
  token: string;
  instanceOf: string;
};

export type UpdateExperimentResponse200 = {
  /* URL of the experiment */
  url: string;
  status: UpdateExperimentResponse200Status;
  bookingTime?: UpdateExperimentResponse200Bookingtime;

  /* Devices associated with the experiment */
  devices: UpdateExperimentResponse200DevicesItems[];

  /* Roles that are used in this experiment */
  roles: UpdateExperimentResponse200RolesItems[];

  /* Connections associated with the experiment */
  connections: string[];

  /* Services associated with the experiment */
  serviceConfigurations: UpdateExperimentResponse200ServiceconfigurationsItems[];

  /* Instantiated devices that need to be started by the user. */
  instantiatedDevices: UpdateExperimentResponse200InstantiateddevicesItems[];
};

export type UpdateExperimentResponse202StatusAlt1 = "created" | "booked" | "setup" | "running" | "finished";

export type UpdateExperimentResponse202StatusAlt2 = "created" | "booked" | "running" | "finished";

export type UpdateExperimentResponse202Status = UpdateExperimentResponse202StatusAlt1 | UpdateExperimentResponse202StatusAlt2;

export type UpdateExperimentResponse202Bookingtime = {
  startTime?: string;
  endTime?: string;
};

export type UpdateExperimentResponse202DevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type UpdateExperimentResponse202RolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateExperimentResponse202ServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig = {};

export type UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItemsConfig;
};

export type UpdateExperimentResponse202ServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: UpdateExperimentResponse202ServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: UpdateExperimentResponse202ServiceconfigurationsItemsParticipantsItems[];
};

export type UpdateExperimentResponse202InstantiateddevicesItems = {
  codeUrl: string;
  url: string;
  token: string;
  instanceOf: string;
};

export type UpdateExperimentResponse202 = {
  /* URL of the experiment */
  url: string;
  status: UpdateExperimentResponse202Status;
  bookingTime?: UpdateExperimentResponse202Bookingtime;

  /* Devices associated with the experiment */
  devices: UpdateExperimentResponse202DevicesItems[];

  /* Roles that are used in this experiment */
  roles: UpdateExperimentResponse202RolesItems[];

  /* Connections associated with the experiment */
  connections: string[];

  /* Services associated with the experiment */
  serviceConfigurations: UpdateExperimentResponse202ServiceconfigurationsItems[];

  /* Instantiated devices that need to be started by the user. */
  instantiatedDevices: UpdateExperimentResponse202InstantiateddevicesItems[];
};

export type UpdateExperimentResponse = UpdateExperimentResponse200 | UpdateExperimentResponse202;

export type DeleteExperimentResponse = void;

export type ListTemplateResponse200Items = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;
};

export type ListTemplateResponse200 = ListTemplateResponse200Items[];

export type ListTemplateResponse = ListTemplateResponse200;

export type CreateTemplateRequestConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type CreateTemplateRequestConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type CreateTemplateRequestConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: CreateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: CreateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type CreateTemplateRequestConfiguration = {
  /* Devices associated with the templated experiment */
  devices: CreateTemplateRequestConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles: CreateTemplateRequestConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations: CreateTemplateRequestConfigurationServiceconfigurationsItems[];
};

export type CreateTemplateRequest = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration: CreateTemplateRequestConfiguration;
};

export type CreateTemplateResponse201ConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type CreateTemplateResponse201ConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateTemplateResponse201ConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type CreateTemplateResponse201ConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: CreateTemplateResponse201ConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: CreateTemplateResponse201ConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type CreateTemplateResponse201Configuration = {
  /* Devices associated with the templated experiment */
  devices: CreateTemplateResponse201ConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles: CreateTemplateResponse201ConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations: CreateTemplateResponse201ConfigurationServiceconfigurationsItems[];
};

export type CreateTemplateResponse201 = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration: CreateTemplateResponse201Configuration;
};

export type CreateTemplateResponse202ConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type CreateTemplateResponse202ConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type CreateTemplateResponse202ConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: CreateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: CreateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type CreateTemplateResponse202Configuration = {
  /* Devices associated with the templated experiment */
  devices: CreateTemplateResponse202ConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles: CreateTemplateResponse202ConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations: CreateTemplateResponse202ConfigurationServiceconfigurationsItems[];
};

export type CreateTemplateResponse202 = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration: CreateTemplateResponse202Configuration;
};

export type CreateTemplateResponse = CreateTemplateResponse201 | CreateTemplateResponse202;

export type GetTemplateResponse200ConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type GetTemplateResponse200ConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type GetTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type GetTemplateResponse200ConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: GetTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: GetTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type GetTemplateResponse200Configuration = {
  /* Devices associated with the templated experiment */
  devices: GetTemplateResponse200ConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles: GetTemplateResponse200ConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations: GetTemplateResponse200ConfigurationServiceconfigurationsItems[];
};

export type GetTemplateResponse200 = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration: GetTemplateResponse200Configuration;
};

export type GetTemplateResponse = GetTemplateResponse200;

export type UpdateTemplateRequestConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type UpdateTemplateRequestConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type UpdateTemplateRequestConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: UpdateTemplateRequestConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: UpdateTemplateRequestConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type UpdateTemplateRequestConfiguration = {
  /* Devices associated with the templated experiment */
  devices?: UpdateTemplateRequestConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles?: UpdateTemplateRequestConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations?: UpdateTemplateRequestConfigurationServiceconfigurationsItems[];
};

export type UpdateTemplateRequest = {
  /* Name of the template */
  name?: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration?: UpdateTemplateRequestConfiguration;
};

export type UpdateTemplateResponse200ConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type UpdateTemplateResponse200ConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type UpdateTemplateResponse200ConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: UpdateTemplateResponse200ConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type UpdateTemplateResponse200Configuration = {
  /* Devices associated with the templated experiment */
  devices: UpdateTemplateResponse200ConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles: UpdateTemplateResponse200ConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations: UpdateTemplateResponse200ConfigurationServiceconfigurationsItems[];
};

export type UpdateTemplateResponse200 = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration: UpdateTemplateResponse200Configuration;
};

export type UpdateTemplateResponse202ConfigurationDevicesItems = {
  /* URL to the [device](https://cross-lab-project.github.io/crosslab/api/device.html#get-/devices/-device_id-). */
  device: string;

  /* The name of the device's role. */
  role: string;
};

export type UpdateTemplateResponse202ConfigurationRolesItems = {
  /* Name for an experiment role. */
  name: string;
  description?: string;
};

/**
    Configuration of the service
    
    This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration = {};

/**
    Service configuration of the participant.
    
    This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
    
*/
export type UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig = {};

export type UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems = {
  /* The name of the participant's role. */
  role?: string;
  serviceId?: string;

  /* Service configuration of the participant.

This configuration object will be merged with the service configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  config?: UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItemsConfig;
};

export type UpdateTemplateResponse202ConfigurationServiceconfigurationsItems = {
  /* Type of the service */
  serviceType?: string;

  /* Configuration of the service

This configuration object will be merged with the participant configuration to become the service configuration send to the participant (fields of the participant configuration override the service configuration).
 */
  configuration?: UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsConfiguration;

  /* List of participants for the service */
  participants?: UpdateTemplateResponse202ConfigurationServiceconfigurationsItemsParticipantsItems[];
};

/**
    Configuration of the templated experiment
*/
export type UpdateTemplateResponse202Configuration = {
  /* Devices associated with the templated experiment */
  devices: UpdateTemplateResponse202ConfigurationDevicesItems[];

  /* Roles that are used in this templated experiment */
  roles: UpdateTemplateResponse202ConfigurationRolesItems[];

  /* Services associated with the templated experiment */
  serviceConfigurations: UpdateTemplateResponse202ConfigurationServiceconfigurationsItems[];
};

export type UpdateTemplateResponse202 = {
  /* URL of the template */
  url: string;

  /* Name of the template */
  name: string;

  /* Description of the template */
  description?: string;

  /* Configuration of the templated experiment */
  configuration: UpdateTemplateResponse202Configuration;
};

export type UpdateTemplateResponse = UpdateTemplateResponse200 | UpdateTemplateResponse202;

export type DeleteTemplateResponse = void;
