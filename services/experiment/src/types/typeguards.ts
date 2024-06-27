import { ExperimentModel } from '../database/model.js';
import { BookingChangedCallback, ExperimentModelStatusMapping } from './types.js';

export function validateExperimentStatus<T extends ExperimentModel['status']>(
  experimentModel: ExperimentModel,
  status: T,
): experimentModel is ExperimentModelStatusMapping<T> {
  switch (status) {
    case 'created':
      return validateExperimentStatusCreated(experimentModel);
    case 'booked':
      return validateExperimentStatusBooked(experimentModel);
    case 'booking-locked':
      return validateExperimentStatusBookingLocked(experimentModel);
    case 'devices-instantiated':
      return validateExperimentStatusDevicesInstantiated(experimentModel);
    case 'booking-updated':
      return validateExperimentStatusBookingUpdated(experimentModel);
    case 'peerconnections-created':
      return validateExperimentStatusPeerconnectionsCreated(experimentModel);
    case 'running':
      return validateExperimentStatusRunning(experimentModel);
    case 'finished':
      return validateExperimentStatusFinished(experimentModel);
    default:
      return false;
  }
}

function validateExperimentStatusCreated(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'created'> {
  if (experimentModel.status !== 'created') return false;

  if (experimentModel.bookingID) return false;

  return true;
}

function validateExperimentStatusBooked(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'booked'> {
  if (experimentModel.status !== 'booked') return false;

  if (!hasDevices(experimentModel)) return false;
  if (!hasBooking(experimentModel)) return false;

  return true;
}

function validateExperimentStatusBookingLocked(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'booking-locked'> {
  if (experimentModel.status !== 'booking-locked') return false;

  if (!hasDevices(experimentModel)) return false;
  if (!hasBooking(experimentModel)) return false;

  return true;
}

function validateExperimentStatusDevicesInstantiated(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'devices-instantiated'> {
  if (experimentModel.status !== 'devices-instantiated') return false;

  if (!hasDevices(experimentModel)) return false;
  if (!hasBooking(experimentModel)) return false;

  return true;
}

function validateExperimentStatusBookingUpdated(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'booking-updated'> {
  if (experimentModel.status !== 'booking-updated') return false;

  if (!hasDevices(experimentModel)) return false;
  if (!hasBooking(experimentModel)) return false;

  return true;
}

function validateExperimentStatusPeerconnectionsCreated(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'peerconnections-created'> {
  if (experimentModel.status !== 'peerconnections-created') return false;

  if (!hasDevices(experimentModel)) return false;
  if (!hasBooking(experimentModel)) return false;

  return true;
}

function validateExperimentStatusRunning(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'running'> {
  if (experimentModel.status !== 'running') return false;

  if (!hasDevices(experimentModel)) return false;
  if (!hasBooking(experimentModel)) return false;

  return true;
}

function validateExperimentStatusFinished(
  experimentModel: ExperimentModel,
): experimentModel is ExperimentModelStatusMapping<'finished'> {
  if (experimentModel.status !== 'finished') return false;

  return true;
}

function hasBooking(_experimentModel: ExperimentModel) {
  // if (!experimentModel.bookingID) return false
  // if (!experimentModel.bookingStart) return false
  // if (!experimentModel.bookingEnd) return false

  return true;
}

function hasDevices(experimentModel: ExperimentModel) {
  return experimentModel.devices && experimentModel.devices.length > 0;
}

export function isBookingChangedCallback(
  callback: unknown,
): callback is BookingChangedCallback {
  return (
    typeof callback === 'object' &&
    callback !== null &&
    'callbackType' in callback &&
    typeof callback.callbackType === 'string' &&
    callback.callbackType === 'event' &&
    'eventType' in callback &&
    typeof callback.eventType === 'string' &&
    callback.eventType === 'booking-changed' &&
    'url' in callback &&
    typeof callback.url === 'string' &&
    'status' in callback &&
    typeof callback.status === 'string'
  );
}
