import { Timeslot } from "./generated/types"

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

    for(let i = 1; i < input.length; i++) {
        if(input[i].Start <= current.End) {
            // combine
            if(input[i].End > current.End) {
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
};

export function timetableNot(t: Timeslot[], start: Date, end: Date): Timeslot[] {
    if (t.length === 0) {
        return [{ Start: start.toISOString(), End: end.toISOString() }]
    }

    // Prepare
    let input: Timeslot[] = []
    for (let i = 0; i < t.length; i++) {
        input.push({ Start: t[i].Start, End: t[i].End });
    }

    input = timetableAnd(input);

    // Remove unneeded time slots
    while (input.length != 0) {
        if (new Date(input[0].End) > start) {
            break;
        }
        input.shift();
    }

    while (input.length != 0) {
        if (new Date(input[input.length - 1].Start) < end) {
            break;
        }
        input.pop();
    }

    if (input.length === 0) { // Ok, nothing more to do here
        return [{ Start: start.toISOString(), End: end.toISOString() }]
    }


    let r: Timeslot[] = [];

    // i = 0
    if (new Date(input[0].Start) > start) {
        r.push({ Start: start.toISOString(), End: input[0].Start })
    }

    // i = 1 .... i = len-1
    for (let i = 1; i < input.length; i++) {
        r.push({ Start: input[i - 1].End, End: input[i].Start })
    }

    // i = len
    if (new Date(input[input.length - 1].End) < end) {
        r.push({ Start: input[input.length - 1].End, End: end.toISOString() })
    }
    return r
};


export function timetableSortInPlace(t: Timeslot[]): void {
    t.sort((a, b): number => {
        if (new Date(a.Start) > new Date(b.Start)) {
            return 1
        };
        if (new Date(a.Start) < new Date(b.Start)) {
            return -1
        };
        return 0;
    });
};