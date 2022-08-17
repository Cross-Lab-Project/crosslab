import * as mocha from "mocha"

import { Timeslot } from "../generated/types"
import { timetableAnd, timetableNot, timetableSortInPlace } from "./timetable";

mocha.describe("timetable.ts", function () {
    mocha.it("timetableSortInPlace", function (done) {
        let correct: Timeslot[][] = [
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }],
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }],
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }],
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }],
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }],
            [],
        ]

        let t: Timeslot[][] = [
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }],
            [{ Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }],
            [{ Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }],
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-02T10:15", End: "2022-02-02T11:15" }, { Start: "2022-02-01T10:45", End: "2022-02-01T11:45" }],
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }],

            [],
        ]

        for (let tcase = 0; tcase < t.length; tcase++) {
            timetableSortInPlace(t[tcase]);

            if (t[tcase].length !== correct[tcase].length) {
                done(new Error("t[" + tcase + "] has length " + t[tcase].length + ", should be " + correct[tcase].length));
                return;
            };
            for (let i = 0; i < correct[tcase].length; i++) {
                if (t[tcase][i].Start != correct[tcase][i].Start) {
                    done(new Error("t[" + tcase + "][" + i + "].Start is " + t[tcase][i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(t[tcase]);
                    return;
                };
                if (t[tcase][i].End != correct[tcase][i].End) {
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
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T10:15" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:45", End: "2022-02-01T12:00" }], // Basic
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T10:15" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:45", End: "2022-02-01T12:00" }], // Switched
            [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:45", End: "2022-02-01T12:00" }], // start after first value
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T10:15" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }], // end after second value
            [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }], // Both combined
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T10:15" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:45", End: "2022-02-01T12:00" }], // Ignore multiple time slots
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T12:00" }], // Empty
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T12:00" }], // Remove all
            [], // Exact
            [{ Start: "2022-02-01T10:00", End: "2022-02-01T10:15" }, { Start: "2022-02-01T11:45", End: "2022-02-01T12:00" }], // Overlapping
        ];

        let t: any[] = [
            { Name: "Basic", t: [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
            { Name: "Switched", t: [{ Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
            { Name: "start after first value", t: [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }], start: new Date("2022-02-01T10:30"), end: new Date("2022-02-01T12:00") },
            { Name: "end after second value", t: [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T11:30") },
            { Name: "Both combined", t: [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }], start: new Date("2022-02-01T10:30"), end: new Date("2022-02-01T11:30") },
            { Name: "Ignore multiple time slots", t: [{ Start: "2022-01-25T10:15", End: "2022-01-25T11:15" }, { Start: "2022-01-28T10:15", End: "2022-01-28T11:15" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }, { Start: "2022-02-05T10:15", End: "2022-02-05T11:15" }, { Start: "2022-20-01T10:15", End: "2022-02-25T11:15" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
            { Name: "Empty", t: [], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
            { Name: "Remove all", t: [{ Start: "2022-01-01T10:15", End: "2022-01-01T11:15" }, { Start: "2022-03-01T11:30", End: "2022-03-01T11:45" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
            { Name: "Exact", t: [{ Start: "2022-02-01T10:00", End: "2022-02-01T12:00" }, { Start: "2022-03-01T11:30", End: "2022-03-01T11:45" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
            { Name: "Overlapping", t: [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }], start: new Date("2022-02-01T10:00"), end: new Date("2022-02-01T12:00") },
        ];

        for (let tcase = 0; tcase < t.length; tcase++) {
            let r = timetableNot(t[tcase].t, t[tcase].start, t[tcase].end);

            if (r.length !== correct[tcase].length) {
                done(new Error("Case " + t[tcase].Name + ": r has length " + r.length + ", should be " + correct[tcase].length));
                console.log(r);
                return;
            };
            for (let i = 0; i < correct[tcase].length; i++) {
                if (new Date(r[i].Start).getTime() != new Date(correct[tcase][i].Start).getTime()) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].Start is " + r[i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
                if (new Date(r[i].End).getTime() != new Date(correct[tcase][i].End).getTime()) {
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
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }], // Basic non-overlapping
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Basic overlapping
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Basic exact
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Two arrays
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Two arrays swapped
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Multiple overlapping
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Multiple overlapping time overwrite
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Multiple overlapping swapped
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Three arrays
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Three arrays swapped
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:45" }], // Three arrays overlapping
            [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:10" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:25" }, {Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }], // Three arrays non overlapping

        ];

        let t: any[] = [
            { Name: "Empty", t: []},
            { Name: "Empty array", t: [[]]},
            { Name: "Empty multiple arrays", t: [[],[],[],[],[]]},
            { Name: "Basic non-overlapping", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:15" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }]]},
            { Name: "Basic overlapping", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }]]},
            { Name: "Basic exact", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }]]},
            { Name: "Two arrays", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }], [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }]]},
            { Name: "Two arrays swapped", t: [[{ Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }], [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }],]},
            { Name: "Multiple overlapping", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }]]},
            { Name: "Multiple overlapping time overwrite", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:10" }, { Start: "2022-02-01T11:05", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }]]},
            { Name: "Multiple overlapping swapped", t: [[{ Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }, { Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }]]},
            { Name: "Three arrays", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }], [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }], [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }]]},
            { Name: "Three arrays swapped", t: [[{ Start: "2022-02-01T11:15", End: "2022-02-01T11:45" }], [{ Start: "2022-02-01T10:15", End: "2022-02-01T11:30" }], [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:30" }]]},
            { Name: "Three arrays overlapping", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:20" }], [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:25" }], [{ Start: "2022-02-01T11:20", End: "2022-02-01T11:45" }]]},
            { Name: "Three arrays non overlapping", t: [[{ Start: "2022-02-01T10:15", End: "2022-02-01T11:10" }], [{ Start: "2022-02-01T11:15", End: "2022-02-01T11:25" }], [{ Start: "2022-02-01T11:30", End: "2022-02-01T11:45" }]]},
        ];

        for (let tcase = 0; tcase < t.length; tcase++) {
            let r = timetableAnd(...t[tcase].t);

            if (r.length !== correct[tcase].length) {
                done(new Error("Case " + t[tcase].Name + ": r has length " + r.length + ", should be " + correct[tcase].length));
                console.log(r);
                return;
            };
            for (let i = 0; i < correct[tcase].length; i++) {
                if (new Date(r[i].Start).getTime() != new Date(correct[tcase][i].Start).getTime()) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].Start is " + r[i].Start + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
                if (new Date(r[i].End).getTime() != new Date(correct[tcase][i].End).getTime()) {
                    done(new Error("Case " + t[tcase].Name + ": r[" + i + "].End is " + r[i].End + ", should be " + correct[tcase][i].Start));
                    console.log(r);
                    return;
                };
            };
        };
        done();
    });
});