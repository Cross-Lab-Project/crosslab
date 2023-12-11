import { InvalidValueError, RemoveIndex } from '@crosslab/service-common';

import { AvailabilityRule, TimeSlot } from '../generated/types.js';

type TimeSlotModel = {
  start: number;
  end: number;
};

type AvailabilityRuleModel = Omit<RemoveIndex<AvailabilityRule>, 'start' | 'end'> & {
  start?: number;
  end?: number;
};

/**
 * This function calculates a list of timeslots from a list of availability rules.
 * @param availabilityRules The list of availability rules to be applied.
 * @param start The start time for the availability rules.
 * @param end The end time for the availability rules.
 * @returns The list of available timeslots.
 */
export function calculateAvailability(
  availabilityRules: AvailabilityRule[],
  start: number,
  end: number,
): Required<TimeSlot>[] {
  if (start > end)
    throw new InvalidValueError("calculateAvailability called with 'start' > 'end'", 400);

  let availability: TimeSlotModel[] = [];
  for (const availabilityRule of availabilityRules) {
    availability = applyAvailabilityRule(
      availability,
      {
        ...availabilityRule,
        start: Date.parse(availabilityRule.start ?? ''),
        end: Date.parse(availabilityRule.end ?? ''),
      },
      start,
      end,
    );
  }
  return availability.map(timeSlotModel => {
    return {
      start: new Date(timeSlotModel.start).toISOString(),
      end: new Date(timeSlotModel.end).toISOString(),
    };
  });
}

/**
 * This function applies an availability rule to a list of timeslots.
 * @param availability The list of timeslots to which to apply the availability rule.
 * @param availabilityRule The availability rule to be applied.
 * @param start The start time for the availability rule.
 * @param end The end time for the availability rule.
 * @returns The list of timeslots containing the changes of the applied availability rule.
 */
function applyAvailabilityRule(
  availability: TimeSlotModel[],
  availabilityRule: AvailabilityRuleModel,
  start: number,
  end: number,
) {
  if (availabilityRule.available === true || availabilityRule.available === undefined) {
    // logger.log("info",'applying availability rule for available = true')

    // add all new timeslots
    availability = addTimeSlotsFromRule(availability, availabilityRule, start, end);

    // sort by starttime
    availability = sortTimeSlots(availability);

    // merge timeslots
    availability = mergeOverlappingTimeSlots(availability);
  } else {
    // logger.log("info",'applying availability rule for available = false')

    // invert availability
    availability = invertTimeSlots(availability, start, end);

    // add all new timeslots
    availability = addTimeSlotsFromRule(availability, availabilityRule, start, end);

    // sort by starttime
    availability = sortTimeSlots(availability);

    // merge timeslots
    availability = mergeOverlappingTimeSlots(availability);

    // invert availability
    availability = invertTimeSlots(availability, start, end);
  }
  return availability;
}

/**
 * This function adds timeslots derived from an availability rule to a list of timeslots.
 * @param availability The list of timeslots to add the derived timeslots to.
 * @param availabilityRule The availability rule from which to derive the timeslots.
 * @param start The start time for deriving the timeslots.
 * @param end The end time for deriving the timeslots.
 * @returns The list of timeslots containing the newly added timeslots.
 */
function addTimeSlotsFromRule(
  availability: TimeSlotModel[],
  availabilityRule: AvailabilityRuleModel,
  start: number,
  end: number,
) {
  // logger.log("info",
  //     'availability before adding timeslots from rule:',
  //     JSON.stringify(availability, null, 4)
  // )
  const timeSlot: TimeSlotModel = {
    start: availabilityRule.start || start,
    end: availabilityRule.end || end,
  };

  if (availabilityRule.repeat) {
    let frequency = 0;
    switch (availabilityRule.repeat.frequency) {
      case 'HOURLY':
        frequency = 60 * 60 * 1000;
        break;
      case 'DAILY':
        frequency = 24 * 60 * 60 * 1000;
        break;
      case 'WEEKLY':
        frequency = 7 * 24 * 60 * 60 * 1000;
        break;
    }
    const until = availabilityRule.repeat.until
      ? Date.parse(availabilityRule.repeat.until)
      : end;
    let count = availabilityRule.repeat.count;

    if (frequency <= timeSlot.end - timeSlot.start && count === undefined) {
      timeSlot.end = until;
    }

    if (timeSlot.end > until) timeSlot.end = until;

    let currentTimeSlot: TimeSlotModel = {
      start: timeSlot.start + frequency,
      end: timeSlot.end + frequency,
    };

    while (until >= currentTimeSlot.start && until >= currentTimeSlot.end) {
      if (count !== undefined && !count--) break;

      availability.push(currentTimeSlot);

      currentTimeSlot = {
        start: currentTimeSlot.start + frequency,
        end: currentTimeSlot.end + frequency,
      };
    }
  }

  availability.push(timeSlot);

  // logger.log("info",
  //     'availability after adding timeslots from rule:',
  //     JSON.stringify(availability, null, 4)
  // )
  return availability
    .map(ts => {
      return {
        start: Math.max(ts.start, start),
        end: Math.min(ts.end, end),
      };
    })
    .filter(ts => {
      if (ts.start >= ts.end) return false;
      return true;
    });
}

/**
 * This function sorts a list of timeslots in ascending order of their start times.
 * @param availability The list of timeslots to be sorted.
 * @returns The sorted list of timeslots.
 */
function sortTimeSlots(availability: TimeSlotModel[]): TimeSlotModel[] {
  // logger.log("info",'availability before sort:', JSON.stringify(availability, null, 4))
  availability.sort((a, b) => {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
  });
  // logger.log("info",'availability after sort:', JSON.stringify(availability, null, 4))
  return availability;
}

/**
 * This function merges overlapping timeslots of a list of timeslots.
 * @param availability The list of timeslots in which to merge overlapping timeslots.
 * @returns The list of timeslots with no overlap.
 */
function mergeOverlappingTimeSlots(availability: TimeSlotModel[]): TimeSlotModel[] {
  // logger.log("info",'availability before merge:', JSON.stringify(availability, null, 4))

  const mergedAvailability: TimeSlotModel[] = [];
  let currentIndex = 0;
  for (let i = 0; i < availability.length; i++) {
    if (mergedAvailability.length === 0) mergedAvailability.push(availability[i]);
    if (i < availability.length - 1) {
      if (availability[i + 1].start <= mergedAvailability[currentIndex].end) {
        mergedAvailability[currentIndex] = {
          start: mergedAvailability[currentIndex].start,
          end:
            availability[i + 1].end > mergedAvailability[currentIndex].end
              ? availability[i + 1].end
              : mergedAvailability[currentIndex].end,
        };
      } else {
        mergedAvailability.push(availability[i + 1]);
        currentIndex++;
      }
    }
  }
  // logger.log("info",'availability after merge:', JSON.stringify(mergedAvailability, null, 4))
  return mergedAvailability;
}

/**
 * This function inverts a list of timeslots.
 * @param availability The list of timeslots to invert.
 * @param start The start time of the inverted list of timeslots.
 * @param end The end time of the inverted list of timeslots.
 * @returns The inverted list of timeslots.
 */
function invertTimeSlots(
  availability: TimeSlotModel[],
  start: number,
  end: number,
): TimeSlotModel[] {
  if (availability.length === 0) return [{ start, end }];
  // logger.log("info",'availability before invert:', JSON.stringify(availability, null, 4))

  // sort by starttime
  availability = sortTimeSlots(availability);

  // merge timeslots
  availability = mergeOverlappingTimeSlots(availability);

  const newAvailability: TimeSlotModel[] = [];

  // create first timeslot
  const firstTimeSlot: TimeSlotModel = {
    start,
    end: availability[0].start,
  };

  if (firstTimeSlot.start !== firstTimeSlot.end) newAvailability.push(firstTimeSlot);

  // create intermediate timeslots
  for (let i = 0; i < availability.length; i++) {
    if (i < availability.length - 1) {
      const timeSlot: TimeSlotModel = {
        start: availability[i].end,
        end: availability[i + 1].start,
      };
      newAvailability.push(timeSlot);
    }
  }

  // create last timeslot
  const lastTimeSlot: TimeSlotModel = {
    start: availability.reverse()[0].end,
    end,
  };

  if (lastTimeSlot.start !== lastTimeSlot.end) newAvailability.push(lastTimeSlot);

  availability = newAvailability;
  // logger.log("info",'availability after invert:', JSON.stringify(availability, null, 4))
  return availability;
}
