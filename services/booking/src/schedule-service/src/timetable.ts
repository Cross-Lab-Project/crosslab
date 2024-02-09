import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { Timeslot } from './generated/types';

dayjs.extend(isSameOrBefore);

export function timetableAnd(...t: Timeslot[][]): Timeslot[] {
  let input: Timeslot[] = [];

  // Flatten
  for (let i = 0; i < t.length; i++) {
    input.push(...t[i]);
  }

  if (input.length === 0) {
    return [];
  }

  // Sort
  timetableSortInPlace(input);

  // Combine
  let r: Timeslot[] = [];
  let current = input[0];

  for (let i = 1; i < input.length; i++) {
    if (dayjs(input[i].Start).isSameOrBefore(dayjs(current.End))) {
      // combine
      if (dayjs(input[i].End).isAfter(dayjs(current.End))) {
        current.End = input[i].End;
      }
    } else {
      // new segment
      r.push(current);
      current = input[i];
    }
  }

  r.push(current);

  // Return
  return r;
}

export function timetableNot(
  t: Timeslot[],
  start: dayjs.Dayjs,
  end: dayjs.Dayjs,
): Timeslot[] {
  if (t.length === 0) {
    return [{ Start: start.toISOString(), End: end.toISOString() }];
  }

  // Prepare
  let input: Timeslot[] = [];
  for (let i = 0; i < t.length; i++) {
    input.push({ Start: t[i].Start, End: t[i].End });
  }

  input = timetableAnd(input);

  // Remove unneeded time slots
  while (input.length != 0) {
    if (dayjs(input[0].End).isAfter(start)) {
      break;
    }
    input.shift();
  }

  while (input.length != 0) {
    if (dayjs(input[input.length - 1].Start).isBefore(dayjs(end))) {
      break;
    }
    input.pop();
  }

  if (input.length === 0) {
    // Ok, nothing more to do here
    return [{ Start: start.toISOString(), End: end.toISOString() }];
  }

  let r: Timeslot[] = [];

  // i = 0
  if (dayjs(input[0].Start).isAfter(start)) {
    r.push({ Start: start.toISOString(), End: input[0].Start });
  }

  // i = 1 .... i = len-1
  for (let i = 1; i < input.length; i++) {
    r.push({ Start: input[i - 1].End, End: input[i].Start });
  }

  // i = len
  if (dayjs(input[input.length - 1].End).isBefore(dayjs(end))) {
    r.push({ Start: input[input.length - 1].End, End: end.toISOString() });
  }
  return r;
}

export function timetableSortInPlace(t: Timeslot[]): void {
  t.sort((a, b): number => {
    if (dayjs(a.Start).isAfter(dayjs(b.Start))) {
      return 1;
    }
    if (dayjs(a.Start).isBefore(dayjs(b.Start))) {
      return -1;
    }
    return 0;
  });
}
