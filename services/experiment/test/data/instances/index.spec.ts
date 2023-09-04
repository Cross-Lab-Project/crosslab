import { InstanceRepository } from '../../../src/database/repositories/instance';
import { example_instance } from './example_instance.spec';
import { EntityData } from '@crosslab/service-common/test-helper';

export const instanceNames = ['example instance'] as const;
export type InstanceName = (typeof instanceNames)[number];
export type InstanceData = Record<InstanceName, EntityData<InstanceRepository>>;

export const instanceData: InstanceData = { 'example instance': { ...example_instance } };
