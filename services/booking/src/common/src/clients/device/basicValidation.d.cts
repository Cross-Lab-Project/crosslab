export declare function validateAuthenticationMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AuthenticationMessage<T>

export declare function validateConnectionStateChangedMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConnectionStateChangedMessage<T>

export declare function validateUserReference<T extends 'request' | 'response' | 'all'>(
    object: unknown
): UserReference<T>

export declare function validateDeviceOverview<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceOverview<T>

export declare function validateServiceDescription<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ServiceDescription<T>

export declare function validateInstantiableCloudDevice<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableCloudDevice<T>

export declare function validateTimeSlot<T extends 'request' | 'response' | 'all'>(
    object: unknown
): TimeSlot<T>

export declare function validateAvailability<T extends 'request' | 'response' | 'all'>(
    object: unknown
): Availability<T>

export declare function validateConcreteDevice<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConcreteDevice<T>

export declare function validateInstantiableBrowserDevice<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableBrowserDevice<T>

export declare function validateDeviceReference<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceReference<T>

export declare function validateDeviceGroup<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceGroup<T>

export declare function validateDevice<T extends 'request' | 'response' | 'all'>(
    object: unknown
): Device<T>

export declare function validateCallback<T extends 'request' | 'response' | 'all'>(
    object: unknown
): Callback<T>

export declare function validateEventCallback<T extends 'request' | 'response' | 'all'>(
    object: unknown
): EventCallback<T>

export declare function validateDeviceChangedEventCallback<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceChangedEventCallback<T>

export declare function validateDeviceOverviewUpdate<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceOverviewUpdate<T>

export declare function validateInstantiableCloudDeviceUpdate<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableCloudDeviceUpdate<T>

export declare function validateConcreteDeviceUpdate<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConcreteDeviceUpdate<T>

export declare function validateInstantiableBrowserDeviceUpdate<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableBrowserDeviceUpdate<T>

export declare function validateDeviceGroupUpdate<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceGroupUpdate<T>

export declare function validateDeviceUpdate<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceUpdate<T>

export declare function validateAvailabilityRule<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AvailabilityRule<T>

export declare function validateMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): Message<T>

export declare function validateCommandMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CommandMessage<T>

export declare function validateServiceConfig<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ServiceConfig<T>

export declare function validateCreatePeerconnectionMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CreatePeerconnectionMessage<T>

export declare function validateClosePeerconnectionMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ClosePeerconnectionMessage<T>

export declare function validateSignalingMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): SignalingMessage<T>

export declare function validateConfigurationMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConfigurationMessage<T>

export declare function validateExperimentStatusChangedMessage<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ExperimentStatusChangedMessage<T>

export declare function validateConnectionStatus<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConnectionStatus<T>

export declare function validatePeerconnectionCommon<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionCommon<T>

export declare function validatePeerconnectionOverview<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionOverview<T>

export declare function validateConfiguredDeviceReference<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConfiguredDeviceReference<T>

export declare function validatePeerconnection<T extends 'request' | 'response' | 'all'>(
    object: unknown
): Peerconnection<T>

export declare function validatePeerconnectionClosedEventCallback<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionClosedEventCallback<T>

export declare function validatePeerconnectionStatusChangedEventCallback<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionStatusChangedEventCallback<T>

export declare function validateChangedUrl<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ChangedUrl<T>

export declare function validateDeviceId<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceId<T>

export declare function validateFlatGroup<T extends 'request' | 'response' | 'all'>(
    object: unknown
): FlatGroup<T>

export declare function validateStartTime<T extends 'request' | 'response' | 'all'>(
    object: unknown
): StartTime<T>

export declare function validateEndTime<T extends 'request' | 'response' | 'all'>(
    object: unknown
): EndTime<T>

export declare function validateClosedUrl<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ClosedUrl<T>

export declare function validateStatusChangedUrl<T extends 'request' | 'response' | 'all'>(
    object: unknown
): StatusChangedUrl<T>

export declare function validatePeerconnectionId<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionId<T>

export declare function validateDeviceUrl<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceUrl<T>

export declare function validateListDevicesResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): listDevicesResponse200<T>

export declare function validateCreateDeviceBody<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createDeviceBody<T>

export declare function validateCreateDeviceResponse201<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createDeviceResponse201<T>

export declare function validateGetDeviceResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getDeviceResponse200<T>

export declare function validateUpdateDeviceBody<T extends 'request' | 'response' | 'all'>(
    object: unknown
): updateDeviceBody<T>

export declare function validateUpdateDeviceResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): updateDeviceResponse200<T>

export declare function validateInstantiateDeviceResponse201<T extends 'request' | 'response' | 'all'>(
    object: unknown
): instantiateDeviceResponse201<T>

export declare function validateGetDeviceAvailabilityResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getDeviceAvailabilityResponse200<T>

export declare function validateAddDeviceAvailabilityRulesBody<T extends 'request' | 'response' | 'all'>(
    object: unknown
): addDeviceAvailabilityRulesBody<T>

export declare function validateAddDeviceAvailabilityRulesResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): addDeviceAvailabilityRulesResponse200<T>

export declare function validateCreateWebsocketTokenResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createWebsocketTokenResponse200<T>

export declare function validateSendSignalingMessageBody<T extends 'request' | 'response' | 'all'>(
    object: unknown
): sendSignalingMessageBody<T>

export declare function validateListPeerconnectionsResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): listPeerconnectionsResponse200<T>

export declare function validateCreatePeerconnectionBody<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionBody<T>

export declare function validateCreatePeerconnectionResponse201<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionResponse201<T>

export declare function validateCreatePeerconnectionResponse202<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionResponse202<T>

export declare function validateGetPeerconnectionResponse200<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getPeerconnectionResponse200<T>

export declare function validatePatchPeerconnectionDeviceStatusBody<T extends 'request' | 'response' | 'all'>(
    object: unknown
): patchPeerconnectionDeviceStatusBody<T>

export declare function validateAuthenticationMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AuthenticationMessageRequest<T>

export declare function validateAuthenticationMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AuthenticationMessageResponse<T>

export declare function validateConnectionStateChangedMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConnectionStateChangedMessageRequest<T>

export declare function validateConnectionStateChangedMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConnectionStateChangedMessageResponse<T>

export declare function validateUserReferenceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): UserReferenceRequest<T>

export declare function validateUserReferenceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): UserReferenceResponse<T>

export declare function validateDeviceOverviewRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceOverviewRequest<T>

export declare function validateDeviceOverviewResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceOverviewResponse<T>

export declare function validateServiceDescriptionRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ServiceDescriptionRequest<T>

export declare function validateServiceDescriptionResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ServiceDescriptionResponse<T>

export declare function validateInstantiableCloudDeviceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableCloudDeviceRequest<T>

export declare function validateInstantiableCloudDeviceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableCloudDeviceResponse<T>

export declare function validateTimeSlotRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): TimeSlotRequest<T>

export declare function validateTimeSlotResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): TimeSlotResponse<T>

export declare function validateAvailabilityRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AvailabilityRequest<T>

export declare function validateAvailabilityResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AvailabilityResponse<T>

export declare function validateConcreteDeviceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConcreteDeviceRequest<T>

export declare function validateConcreteDeviceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConcreteDeviceResponse<T>

export declare function validateInstantiableBrowserDeviceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableBrowserDeviceRequest<T>

export declare function validateInstantiableBrowserDeviceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableBrowserDeviceResponse<T>

export declare function validateDeviceReferenceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceReferenceRequest<T>

export declare function validateDeviceReferenceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceReferenceResponse<T>

export declare function validateDeviceGroupRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceGroupRequest<T>

export declare function validateDeviceGroupResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceGroupResponse<T>

export declare function validateDeviceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceRequest<T>

export declare function validateDeviceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceResponse<T>

export declare function validateCallbackRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CallbackRequest<T>

export declare function validateCallbackResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CallbackResponse<T>

export declare function validateEventCallbackRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): EventCallbackRequest<T>

export declare function validateEventCallbackResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): EventCallbackResponse<T>

export declare function validateDeviceChangedEventCallbackRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceChangedEventCallbackRequest<T>

export declare function validateDeviceChangedEventCallbackResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceChangedEventCallbackResponse<T>

export declare function validateDeviceOverviewUpdateRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceOverviewUpdateRequest<T>

export declare function validateDeviceOverviewUpdateResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceOverviewUpdateResponse<T>

export declare function validateInstantiableCloudDeviceUpdateRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableCloudDeviceUpdateRequest<T>

export declare function validateInstantiableCloudDeviceUpdateResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableCloudDeviceUpdateResponse<T>

export declare function validateConcreteDeviceUpdateRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConcreteDeviceUpdateRequest<T>

export declare function validateConcreteDeviceUpdateResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConcreteDeviceUpdateResponse<T>

export declare function validateInstantiableBrowserDeviceUpdateRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableBrowserDeviceUpdateRequest<T>

export declare function validateInstantiableBrowserDeviceUpdateResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): InstantiableBrowserDeviceUpdateResponse<T>

export declare function validateDeviceGroupUpdateRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceGroupUpdateRequest<T>

export declare function validateDeviceGroupUpdateResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceGroupUpdateResponse<T>

export declare function validateDeviceUpdateRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceUpdateRequest<T>

export declare function validateDeviceUpdateResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceUpdateResponse<T>

export declare function validateAvailabilityRuleRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AvailabilityRuleRequest<T>

export declare function validateAvailabilityRuleResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): AvailabilityRuleResponse<T>

export declare function validateMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): MessageRequest<T>

export declare function validateMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): MessageResponse<T>

export declare function validateCommandMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CommandMessageRequest<T>

export declare function validateCommandMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CommandMessageResponse<T>

export declare function validateServiceConfigRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ServiceConfigRequest<T>

export declare function validateServiceConfigResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ServiceConfigResponse<T>

export declare function validateCreatePeerconnectionMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CreatePeerconnectionMessageRequest<T>

export declare function validateCreatePeerconnectionMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): CreatePeerconnectionMessageResponse<T>

export declare function validateClosePeerconnectionMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ClosePeerconnectionMessageRequest<T>

export declare function validateClosePeerconnectionMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ClosePeerconnectionMessageResponse<T>

export declare function validateSignalingMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): SignalingMessageRequest<T>

export declare function validateSignalingMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): SignalingMessageResponse<T>

export declare function validateConfigurationMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConfigurationMessageRequest<T>

export declare function validateConfigurationMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConfigurationMessageResponse<T>

export declare function validateExperimentStatusChangedMessageRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ExperimentStatusChangedMessageRequest<T>

export declare function validateExperimentStatusChangedMessageResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ExperimentStatusChangedMessageResponse<T>

export declare function validateConnectionStatusRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConnectionStatusRequest<T>

export declare function validateConnectionStatusResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConnectionStatusResponse<T>

export declare function validatePeerconnectionCommonRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionCommonRequest<T>

export declare function validatePeerconnectionCommonResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionCommonResponse<T>

export declare function validatePeerconnectionOverviewRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionOverviewRequest<T>

export declare function validatePeerconnectionOverviewResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionOverviewResponse<T>

export declare function validateConfiguredDeviceReferenceRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConfiguredDeviceReferenceRequest<T>

export declare function validateConfiguredDeviceReferenceResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ConfiguredDeviceReferenceResponse<T>

export declare function validatePeerconnectionRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionRequest<T>

export declare function validatePeerconnectionResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionResponse<T>

export declare function validatePeerconnectionClosedEventCallbackRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionClosedEventCallbackRequest<T>

export declare function validatePeerconnectionClosedEventCallbackResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionClosedEventCallbackResponse<T>

export declare function validatePeerconnectionStatusChangedEventCallbackRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionStatusChangedEventCallbackRequest<T>

export declare function validatePeerconnectionStatusChangedEventCallbackResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionStatusChangedEventCallbackResponse<T>

export declare function validateChangedUrlRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ChangedUrlRequest<T>

export declare function validateChangedUrlResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ChangedUrlResponse<T>

export declare function validateDeviceIdRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceIdRequest<T>

export declare function validateDeviceIdResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceIdResponse<T>

export declare function validateFlatGroupRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): FlatGroupRequest<T>

export declare function validateFlatGroupResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): FlatGroupResponse<T>

export declare function validateStartTimeRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): StartTimeRequest<T>

export declare function validateStartTimeResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): StartTimeResponse<T>

export declare function validateEndTimeRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): EndTimeRequest<T>

export declare function validateEndTimeResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): EndTimeResponse<T>

export declare function validateClosedUrlRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ClosedUrlRequest<T>

export declare function validateClosedUrlResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): ClosedUrlResponse<T>

export declare function validateStatusChangedUrlRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): StatusChangedUrlRequest<T>

export declare function validateStatusChangedUrlResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): StatusChangedUrlResponse<T>

export declare function validatePeerconnectionIdRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionIdRequest<T>

export declare function validatePeerconnectionIdResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): PeerconnectionIdResponse<T>

export declare function validateDeviceUrlRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceUrlRequest<T>

export declare function validateDeviceUrlResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): DeviceUrlResponse<T>

export declare function validateListDevicesResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): listDevicesResponse200Request<T>

export declare function validateListDevicesResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): listDevicesResponse200Response<T>

export declare function validateCreateDeviceBodyRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createDeviceBodyRequest<T>

export declare function validateCreateDeviceBodyResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createDeviceBodyResponse<T>

export declare function validateCreateDeviceResponse201Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createDeviceResponse201Request<T>

export declare function validateCreateDeviceResponse201Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createDeviceResponse201Response<T>

export declare function validateGetDeviceResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getDeviceResponse200Request<T>

export declare function validateGetDeviceResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getDeviceResponse200Response<T>

export declare function validateUpdateDeviceBodyRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): updateDeviceBodyRequest<T>

export declare function validateUpdateDeviceBodyResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): updateDeviceBodyResponse<T>

export declare function validateUpdateDeviceResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): updateDeviceResponse200Request<T>

export declare function validateUpdateDeviceResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): updateDeviceResponse200Response<T>

export declare function validateInstantiateDeviceResponse201Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): instantiateDeviceResponse201Request<T>

export declare function validateInstantiateDeviceResponse201Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): instantiateDeviceResponse201Response<T>

export declare function validateGetDeviceAvailabilityResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getDeviceAvailabilityResponse200Request<T>

export declare function validateGetDeviceAvailabilityResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getDeviceAvailabilityResponse200Response<T>

export declare function validateAddDeviceAvailabilityRulesBodyRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): addDeviceAvailabilityRulesBodyRequest<T>

export declare function validateAddDeviceAvailabilityRulesBodyResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): addDeviceAvailabilityRulesBodyResponse<T>

export declare function validateAddDeviceAvailabilityRulesResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): addDeviceAvailabilityRulesResponse200Request<T>

export declare function validateAddDeviceAvailabilityRulesResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): addDeviceAvailabilityRulesResponse200Response<T>

export declare function validateCreateWebsocketTokenResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createWebsocketTokenResponse200Request<T>

export declare function validateCreateWebsocketTokenResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createWebsocketTokenResponse200Response<T>

export declare function validateSendSignalingMessageBodyRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): sendSignalingMessageBodyRequest<T>

export declare function validateSendSignalingMessageBodyResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): sendSignalingMessageBodyResponse<T>

export declare function validateListPeerconnectionsResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): listPeerconnectionsResponse200Request<T>

export declare function validateListPeerconnectionsResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): listPeerconnectionsResponse200Response<T>

export declare function validateCreatePeerconnectionBodyRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionBodyRequest<T>

export declare function validateCreatePeerconnectionBodyResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionBodyResponse<T>

export declare function validateCreatePeerconnectionResponse201Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionResponse201Request<T>

export declare function validateCreatePeerconnectionResponse201Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionResponse201Response<T>

export declare function validateCreatePeerconnectionResponse202Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionResponse202Request<T>

export declare function validateCreatePeerconnectionResponse202Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): createPeerconnectionResponse202Response<T>

export declare function validateGetPeerconnectionResponse200Request<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getPeerconnectionResponse200Request<T>

export declare function validateGetPeerconnectionResponse200Response<T extends 'request' | 'response' | 'all'>(
    object: unknown
): getPeerconnectionResponse200Response<T>

export declare function validatePatchPeerconnectionDeviceStatusBodyRequest<T extends 'request' | 'response' | 'all'>(
    object: unknown
): patchPeerconnectionDeviceStatusBodyRequest<T>

export declare function validatePatchPeerconnectionDeviceStatusBodyResponse<T extends 'request' | 'response' | 'all'>(
    object: unknown
): patchPeerconnectionDeviceStatusBodyResponse<T>

