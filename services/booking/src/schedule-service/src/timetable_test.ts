import * as mocha from "mocha"
import dayjs from 'dayjs';

import { Timeslot } from "./generated/types"
import { timetableAnd, timetableNot, timetableSortInPlace } from "./timetable";

mocha.describe("timetable.ts", function () {
    mocha.it("timetableSortInPlace", function (done) {
        let correct: Timeslot[][] = [
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }],
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }],
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }],
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }],
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }],
            [],
        ]

        let t: Timeslot[][] = [
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }],
            [{ Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }],
            [{ Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }],
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-02T10:15:00Z", End: "2022-02-02T11:15:00Z" }, { Start: "2022-02-01T10:45:00Z", End: "2022-02-01T11:45:00Z" }],
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }],
            [],
        ]

        for (let tcase = 0; tcase < t.length; tcase++) {
            timetableSortInPlace(t[tcase]);

            if (t[tcase].length !== correct[tcase].length) {
                done(new Error("t[" + tcase + "] has length " + t[tcase].length + ", should be " + correct[tcase].length));
                return;
            };
            for (let i = 0; i < correct[tcase].length; i++) {
                if (!dayjs(t[tcase][i].Start).isSame(dayjs(correct[tcase][i].Start))) {
                    done(new Error("t[" + tcase + "][" + i + "].Start is " + t[tcase][i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(t[tcase]);
                    return;
                };
                if (!dayjs(t[tcase][i].End).isSame(correct[tcase][i].End)) {
                    done(new Error("t[" + tcase + "][" + i + "].End is " + t[tcase][i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(t[tcase]);
                    return;
                };
            };
        };
        done();
    });

    mocha.it("timetableNot", function (done) {
        let correct: Timeslot[][] = [
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T10:15:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:45:00Z", End: "2022-02-01T12:00:00Z" }], // Basic
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T10:15:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:45:00Z", End: "2022-02-01T12:00:00Z" }], // Switched
            [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:45:00Z", End: "2022-02-01T12:00:00Z" }], // start after first value
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T10:15:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }], // end after second value
            [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }], // Both combined
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T10:15:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:45:00Z", End: "2022-02-01T12:00:00Z" }], // Ignore multiple time slots
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T12:00:00Z" }], // Empty
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T12:00:00Z" }], // Remove all
            [], // Exact
            [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T10:15:00Z" }, { Start: "2022-02-01T11:45:00Z", End: "2022-02-01T12:00:00Z" }], // Overlapping
        ];

        let t: any[] = [
            { Name: "Basic", t: [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "Switched", t: [{ Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "start after first value", t: [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }], start: dayjs("2022-02-01T10:30:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "end after second value", t: [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T11:30:00Z") },
            { Name: "Both combined", t: [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }], start: dayjs("2022-02-01T10:30:00Z"), end: dayjs("2022-02-01T11:30:00Z") },
            { Name: "Ignore multiple time slots", t: [{ Start: "2022-01-25T10:15:00Z", End: "2022-01-25T11:15:00Z" }, { Start: "2022-01-28T10:15:00Z", End: "2022-01-28T11:15:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }, { Start: "2022-02-05T10:15:00Z", End: "2022-02-05T11:15:00Z" }, { Start: "2022-20-01T10:15:00Z", End: "2022-02-25T11:15:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "Empty", t: [], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "Remove all", t: [{ Start: "2022-01-01T10:15:00Z", End: "2022-01-01T11:15:00Z" }, { Start: "2022-03-01T11:30:00Z", End: "2022-03-01T11:45:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "Exact", t: [{ Start: "2022-02-01T10:00:00Z", End: "2022-02-01T12:00:00Z" }, { Start: "2022-03-01T11:30:00Z", End: "2022-03-01T11:45:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
            { Name: "Overlapping", t: [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }], start: dayjs("2022-02-01T10:00:00Z"), end: dayjs("2022-02-01T12:00:00Z") },
        ];

        for (let tcase = 0; tcase < t.length; tcase++) {
            let r = timetableNot(t[tcase].t, t[tcase].start, t[tcase].end);

            if (r.length !== correct[tcase].length) {
                done(new Error("Case " + t[tcase].Name + ": r has length " + r.length + ", should be " + correct[tcase].length));
                console.log(r);
                return;
            };
            for (let i = 0; i < correct[tcase].length; i++) {
                if (!dayjs(r[i].Start).isSame(dayjs(correct[tcase][i].Start))) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].Start is " + r[i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
                if (!dayjs(r[i].End).isSame(dayjs(correct[tcase][i].End))) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].End is " + r[i].End + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
            };
        };
        done();
    });

    mocha.it("timetableAnd", function (done) {
        let correct: Timeslot[][] = [
            [], // Empty
            [], // Empty array
            [], // Empty multiple arrays
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }], // Basic non-overlapping
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Basic overlapping
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Basic exact
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Two arrays
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Two arrays swapped
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Multiple overlapping
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Multiple overlapping time overwrite
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Multiple overlapping swapped
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Three arrays
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Three arrays swapped
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:45:00Z" }], // Three arrays overlapping
            [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:10:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:25:00Z" }, {Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }], // Three arrays non overlapping
            [{ Start: "2022-02-01T08:15:00Z", End: "2022-02-01T09:45:00Z" }], // Different string formats
        ];

        let t: any[] = [
            { Name: "Empty", t: []},
            { Name: "Empty array", t: [[]]},
            { Name: "Empty multiple arrays", t: [[],[],[],[],[]]},
            { Name: "Basic non-overlapping", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:15:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Basic overlapping", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Basic exact", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Two arrays", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }], [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Two arrays swapped", t: [[{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }], [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }],]},
            { Name: "Multiple overlapping", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Multiple overlapping time overwrite", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:10:00Z" }, { Start: "2022-02-01T11:05:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Multiple overlapping swapped", t: [[{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }, { Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Three arrays", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }], [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }], [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Three arrays swapped", t: [[{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:45:00Z" }], [{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:30:00Z" }], [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:30:00Z" }]]},
            { Name: "Three arrays overlapping", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:20:00Z" }], [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:25:00Z" }], [{ Start: "2022-02-01T11:20:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Three arrays non overlapping", t: [[{ Start: "2022-02-01T10:15:00Z", End: "2022-02-01T11:10:00Z" }], [{ Start: "2022-02-01T11:15:00Z", End: "2022-02-01T11:25:00Z" }], [{ Start: "2022-02-01T11:30:00Z", End: "2022-02-01T11:45:00Z" }]]},
            { Name: "Different string formats", t: [[{ Start: "2022-02-01T10:15:00.0000+0200", End: "2022-02-01T09:30:00.0000Z" }, { Start: "2022-02-01T11:15:00+0200", End: "2022-02-01T11:45:00+0200" }]]},
        ];

        for (let tcase = 0; tcase < t.length; tcase++) {
            let r = timetableAnd(...t[tcase].t);

            if (r.length !== correct[tcase].length) {
                done(new Error("Case " + t[tcase].Name + ": r has length " + r.length + ", should be " + correct[tcase].length));
                console.log(r);
                return;
            };
            for (let i = 0; i < correct[tcase].length; i++) {
                if (!dayjs(r[i].Start).isSame(dayjs(correct[tcase][i].Start))) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].Start is " + r[i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
                if (!dayjs(r[i].End).isSame(dayjs(correct[tcase][i].End))) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].End is " + r[i].End + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
            };
        };
        done();
    });
});