import {Availability, AvailabilityRule} from "../../src/generated/types";
import {calculateAvailability} from "../../src/methods/availability";
import {InvalidValueError} from "@crosslab/service-common";
import assert from "assert";

export default () =>
  describe("availability methods", function () {
    describe("calculateAvailabilty", function () {
      it("should calculate the availability correctly", function () {
        const start = 0;
        const end = 1000000000;
        const second = 1000;
        const minute = 60 * second;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;

        const datasets: {
          rules: AvailabilityRule[];
          availability: Availability;
        }[] = [
          // empty rules
          {
            rules: [],
            availability: [],
          },
          // always available
          {
            rules: [{available: true}],
            availability: [
              {
                start: new Date(start).toISOString(),
                end: new Date(end).toISOString(),
              },
            ],
          },
          // never available
          {
            rules: [{available: false}],
            availability: [],
          },
          // one rule without repeat
          {
            rules: [
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
              },
            ],
            availability: [
              {
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
              },
            ],
          },
          // one rule with HOURLY repeat (count limiting)
          {
            rules: [
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
                repeat: {
                  frequency: "HOURLY",
                  until: new Date(end / 2).toISOString(),
                  count: 10,
                },
              },
            ],
            availability: Array.from(Array(11).keys()).map(n => {
              return {
                start: new Date(n * hour + 100).toISOString(),
                end: new Date(n * hour + 200).toISOString(),
              };
            }),
          },
          // one rule with DAILY repeat (until limiting)
          {
            rules: [
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
                repeat: {
                  frequency: "DAILY",
                  until: new Date(end / 2).toISOString(),
                  count: 10,
                },
              },
            ],
            availability: Array.from(Array(6).keys()).map(n => {
              return {
                start: new Date(n * day + 100).toISOString(),
                end: new Date(n * day + 200).toISOString(),
              };
            }),
          },
          // one rule with WEEKLY repeat (until stopping second repeat)
          {
            rules: [
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
                repeat: {
                  frequency: "WEEKLY",
                  until: new Date(week + 199).toISOString(),
                  count: 10,
                },
              },
            ],
            availability: [
              {
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
              },
            ],
          },
          // one rule with WEEKLY repeat (until allowing second repeat)
          {
            rules: [
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
                repeat: {
                  frequency: "WEEKLY",
                  until: new Date(week + 200).toISOString(),
                  count: 10,
                },
              },
            ],
            availability: [
              {
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
              },
              {
                start: new Date(week + 100).toISOString(),
                end: new Date(week + 200).toISOString(),
              },
            ],
          },
          // multiple overlapping and some invalid rules
          {
            rules: [
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(200).toISOString(),
                repeat: {
                  frequency: "WEEKLY",
                  until: new Date(week + 200).toISOString(),
                },
              },
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(300).toISOString(),
              },
              {
                available: true,
                start: new Date(100).toISOString(),
                end: new Date(150).toISOString(),
              },
              {
                start: new Date(3000).toISOString(),
                end: new Date(3000).toISOString(),
              },
              {
                start: new Date(3000).toISOString(),
                end: new Date(2500).toISOString(),
              },
            ],
            availability: [
              {
                start: new Date(100).toISOString(),
                end: new Date(300).toISOString(),
              },
              {
                start: new Date(week + 100).toISOString(),
                end: new Date(week + 200).toISOString(),
              },
            ],
          },
          // one rule with HOURLY repeat (end - start > frequency)
          {
            rules: [
              {
                available: true,
                start: new Date(1000).toISOString(),
                end: new Date(1000 + hour).toISOString(),
                repeat: {frequency: "HOURLY"},
              },
            ],
            availability: [
              {
                start: new Date(1000).toISOString(),
                end: new Date(end).toISOString(),
              },
            ],
          },
          // multiple overlapping rules
          {
            rules: [
              {
                available: true,
                start: new Date(1000).toISOString(),
                end: new Date(6000).toISOString(),
              },
              {
                available: false,
                start: new Date(2000).toISOString(),
                end: new Date(5000).toISOString(),
              },
              {
                start: new Date(3000).toISOString(),
                end: new Date(4000).toISOString(),
              },
            ],
            availability: [
              {
                start: new Date(1000).toISOString(),
                end: new Date(2000).toISOString(),
              },
              {
                start: new Date(3000).toISOString(),
                end: new Date(4000).toISOString(),
              },
              {
                start: new Date(5000).toISOString(),
                end: new Date(6000).toISOString(),
              },
            ],
          },
        ];

        for (const [index, dataset] of datasets.entries()) {
          const result = calculateAvailability(dataset.rules, start, end);
          assert(
            JSON.stringify(result) === JSON.stringify(dataset.availability),
            `An error occurred in dataset ${index}: \n      ${JSON.stringify(
              dataset,
              null,
              4,
            ).replace(/\n/g, "\n      ")}`,
          );
        }
      });

      it("should throw an InvalidValueError if start > end", function () {
        try {
          calculateAvailability([], 100, 50);
        } catch (error) {
          assert(error instanceof InvalidValueError);
        }
      });
    });
  });
