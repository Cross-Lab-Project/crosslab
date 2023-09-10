import { AbstractApplicationDataSource } from '@crosslab/service-common';
import { DataSourceOptions } from 'typeorm';

import { config } from '../config.js';
import { DeviceRepository } from './repositories/device.js';
import { ExperimentRepository } from './repositories/experiment.js';
import { InstanceRepository } from './repositories/instance.js';
import { ParticipantRepository } from './repositories/participant.js';
import { PeerconnectionRepository } from './repositories/peerconnection.js';
import { RoleRepository } from './repositories/role.js';
import { ServiceConfigurationRepository } from './repositories/serviceConfiguration.js';
import { TemplateRepository } from './repositories/template.js';

type RepositoryMapping = {
  device: DeviceRepository;
  experiment: ExperimentRepository;
  instance: InstanceRepository;
  participant: ParticipantRepository;
  peerconnection: PeerconnectionRepository;
  role: RoleRepository;
  serviceConfiguration: ServiceConfigurationRepository;
  template: TemplateRepository;
};

class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
  public repositories: RepositoryMapping;

  constructor(options: DataSourceOptions) {
    super(options);
    this.repositories = this.createRepositories();
  }

  protected createRepositories(): RepositoryMapping {
    const deviceRepository = new DeviceRepository();
    const experimentRepository = new ExperimentRepository();
    const instanceRepository = new InstanceRepository();
    const participantRepository = new ParticipantRepository();
    const peerconnectionRepository = new PeerconnectionRepository();
    const roleRepository = new RoleRepository();
    const serviceConfigurationRepository = new ServiceConfigurationRepository();
    const templateRepository = new TemplateRepository();

    deviceRepository.setDependencies({
      instance: instanceRepository,
    });
    experimentRepository.setDependencies({
      device: deviceRepository,
      peerconnection: peerconnectionRepository,
      role: roleRepository,
      serviceConfiguration: serviceConfigurationRepository,
    });
    serviceConfigurationRepository.setDependencies({
      participant: participantRepository,
    });

    return {
      device: deviceRepository,
      experiment: experimentRepository,
      instance: instanceRepository,
      participant: participantRepository,
      peerconnection: peerconnectionRepository,
      role: roleRepository,
      serviceConfiguration: serviceConfigurationRepository,
      template: templateRepository,
    };
  }
}

export const AppDataSource = new ApplicationDataSource(config.orm);
export const repositories = AppDataSource.repositories;
export const dataSource = AppDataSource.dataSource;
