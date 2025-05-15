import { AbstractRepository } from '@crosslab/service-common';
import { EntityManager } from 'typeorm';

import { Timeslot } from '../../generated/types.js';
import { ReservationModel } from '../model.js';

export class ReservationRepository extends AbstractRepository<
  ReservationModel,
  Timeslot,
  undefined
> {
  protected dependencies: Partial<Record<string, never>> = {};

  constructor() {
    super('Reservation');
  }

  protected dependenciesMet(): boolean {
    return true;
  }

  initialize(entityManager: EntityManager): void {
    this.repository = entityManager.getRepository(ReservationModel);
  }

  async write(model: ReservationModel, data: Partial<Timeslot>): Promise<void> {
    if (data.start !== undefined) model.start = data.start;
    if (data.end !== undefined) model.end = data.end;
  }

  async format(_model: ReservationModel): Promise<undefined> {
    return undefined;
  }
}
