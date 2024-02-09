export interface ParameterDescription {
  name: string;
  unit: string;
  minimum: number;
  maximum: number;
}

export interface ParameterServiceSetupEvent {
  parameters: ParameterDescription[];
}

export interface ParameterServiceEvent {
  parameter: string;
  value: number;
}
