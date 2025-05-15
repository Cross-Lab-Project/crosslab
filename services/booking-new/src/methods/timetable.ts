import { Timeslot } from '../generated/types.js';

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export type Timetable = Timeslot[];

/**
 * This function creates an intersection of all given timetables.
 * @param timetables The timetables to be intersected.
 * @param timeframe The timeframe in which to intersect the timeslots.
 * @returns Timetable with intersected timeslots.
 */
export function intersectTimetables(
  timetables: Timetable[],
  timeframe: Timeslot,
): Timetable {
  if (timetables.length === 0) return [];
  if (timetables.length === 1) return timetables[0];

  const intersectedTimetable = invertTimetable(
    mergeTimeslots([
      ...invertTimetable(timetables[0], timeframe),
      ...invertTimetable(timetables[1], timeframe),
    ]),
    timeframe,
  );

  return intersectTimetables([intersectedTimetable, ...timetables.slice(2)], timeframe);
}

/**
 * This function removes timeslots from a given timetable.
 * @param timetable The timetable to remove timeslots from.
 * @param timeslots The timeslots to be removed from the timetable.
 * @param timeframe The timeframe in which to remove the timeslots.
 * @returns Timetable with removed timeslots.
 */
export function removeFromTimetable(
  timetable: Timetable,
  timeslots: Timetable,
  timeframe: Timeslot,
): Timetable {
  if (timeslots.length === 0) return timetable;

  return intersectTimetables(
    [timetable, invertTimetable(timeslots, timeframe)],
    timeframe,
  );
}

/**
 * This function inverts the timetable.
 * @param timetable The timetable to be inverted.
 * @param timeframe The timeframe in which to invert the timetable.
 * @returns Inverted timetable.
 */
export function invertTimetable(timetable: Timetable, timeframe: Timeslot) {
  if (timetable.length === 0) return [{ ...timeframe }];

  const preparedTimetable = mergeTimeslots(structuredClone(timetable));

  const invertedTimetable: Timetable = [];

  invertedTimetable.push({
    start: timeframe.start,
    end: preparedTimetable[0].start,
  });

  for (let i = 0; i < preparedTimetable.length - 1; i++) {
    invertedTimetable.push({
      start: preparedTimetable[i].end,
      end: preparedTimetable[i + 1].start,
    });
  }

  invertedTimetable.push({
    start: preparedTimetable[preparedTimetable.length - 1].end,
    end: timeframe.end,
  });

  return invertedTimetable.filter(timeslot => timeslot.start < timeslot.end);
}

/**
 * This function merges the given timeslots into a timetable.
 * @param timeslots The timeslots to be merged.
 * @returns Timetable of the merged timeslots.
 */
export function mergeTimeslots(timeslots: Timeslot[]): Timetable {
  if (timeslots.length === 0) return [];

  const sortedTimeslots = sortTimeslots(timeslots);
  const timetable = [sortedTimeslots[0]];
  let currentTimeslot = timetable[0];

  for (const timeslot of sortedTimeslots.slice(1)) {
    if (currentTimeslot.end >= timeslot.start) {
      currentTimeslot.end =
        timeslot.end >= currentTimeslot.end ? timeslot.end : currentTimeslot.end;
    } else {
      timetable.push(timeslot);
      currentTimeslot = timeslot;
    }
  }

  return timetable;
}

export function sortTimeslots(timeslots: Timeslot[]): Timetable {
  const clonedTimeslots = structuredClone(timeslots);
  return clonedTimeslots.sort((timeslotA, timeslotB) => {
    if (timeslotA.start < timeslotB.start) return -1;
    if (timeslotA.start > timeslotB.start) return 1;
    return 0;
  });
}
