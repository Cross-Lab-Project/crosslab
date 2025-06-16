import * as DateFun from 'date-fns';
import { LessThan } from 'typeorm';

import { ApplicationDataSource } from '../database/datasource.js';
import { PlatformModel } from '../database/model.js';

export async function deletePendingPlatforms() {
  const date = DateFun.sub(new Date(), { minutes: 10 });
  await ApplicationDataSource.createQueryBuilder().delete().from(PlatformModel).where( {registrated: false, createdDate: LessThan(date) }).execute();
}
