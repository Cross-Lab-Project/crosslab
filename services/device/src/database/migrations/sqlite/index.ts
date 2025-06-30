import { Setup1692095173359 } from './1692095173359-Setup.js';
import { RemoveOwnerProperty1701781240608 } from './1701781240608-RemoveOwnerProperty.js';
import { RemoveAnnouncedAvailability1721035468806 } from './1721035468806-RemoveAnnouncedAvailability.js';
import { PeerconnectionConfiguration1721990948580 } from './1721990948580-PeerconnectionConfiguration.js';
import { AdditionalAttributesDevice1722505386867 } from './1722505386867-AdditionalAttributesDevice.js';
import { RemoveConnectedProperty1745838315307 } from './1745838315307-RemoveConnectedProperty.js';
import { DefaultAdditionalAttributes1751017818581 } from './1751017818581-DefaultAdditionalAttributes.js';

export const Migrations = [
  Setup1692095173359,
  RemoveOwnerProperty1701781240608,
  RemoveConnectedProperty1745838315307,
  RemoveAnnouncedAvailability1721035468806,
  PeerconnectionConfiguration1721990948580,
  AdditionalAttributesDevice1722505386867,
  DefaultAdditionalAttributes1751017818581,
];
// typeorm-ts-node-commonjs migration:generate -d src/database/dataSource.ts src/database/migrations/sqlite/Setup
