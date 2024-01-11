import { AbstractApplicationDataSource } from '@crosslab/service-common';
import { DataSourceOptions } from 'typeorm/browser';

import { config } from '../config.js';
import { InstitutionRepository } from './repositories/institution.js';

type RepositoryMapping = {
  institution: InstitutionRepository;
};

class ApplicationDataSource extends AbstractApplicationDataSource<RepositoryMapping> {
  public repositories: RepositoryMapping;

  constructor(options: DataSourceOptions) {
    super(options);
    this.repositories = this.createRepositories();
  }

  protected createRepositories(): RepositoryMapping {
    const institutionRepository = new InstitutionRepository();

    return {
      institution: institutionRepository,
    };
  }
}

export const AppDataSource = new ApplicationDataSource(config.orm);
export const repositories = AppDataSource.repositories;
export const dataSource = AppDataSource.dataSource;
