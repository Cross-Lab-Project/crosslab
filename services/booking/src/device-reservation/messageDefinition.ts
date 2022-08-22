import * as dayjs from 'dayjs';

export const ErrorTimeoutText = "Operation timed out, please retry later";

export enum ReservationRequest {
    New,
    Get,
    Delete
};

export class ReservationMessage {
    Type: ReservationRequest
    AnswerQueue: string
    Device?: URL
    Start?: dayjs.Dayjs
    End?: dayjs.Dayjs
    BookingReference?: URL
    ReservationID?: bigint

    static fromString(json: string): ReservationMessage {
        let data = JSON.parse(json)

        if (typeof (data) !== "object") {
            throw new Error("Parsed string must be object");
        }

        if (data.Type === undefined) {
            throw new Error("ReservationMessage must have Type");
        }

        if (!Object.keys(ReservationRequest).includes(data.Type)) {
            throw new Error("ReservationMessage Type must fit the enum");
        }

        if (data.AnswerQueue === undefined) {
            throw new Error("ReservationMessage must be AnswerQueue");
        }

        if (typeof (data.AnswerQueue) !== "string") {
            throw new Error("AnswerQueue must be string");
        }

        if (data.AnswerQueue === "") {
            throw new Error("AnswerQueue must not be an empty string");
        }

        let r = new ReservationMessage(ReservationRequest[data.Type as keyof typeof ReservationRequest], data.AnswerQueue);

        if (data.Device !== undefined) {
            if (typeof (data.Device) !== "string") {
                throw new Error("Device must be string");
            }
            try {
                r.Device = new URL(data.Device);
            } catch (err) {
                throw new Error("Can not parse Device '" + data.device + "' as URL:" + err.toString());
            }
        }



        if (data.Start !== undefined && data.End !== undefined) {
            try {
                r.Start = dayjs(data.Start);
            } catch (err) {
                throw new Error("Can not parse Start as Date:" + err.toString());
            }
            try {
                r.End = dayjs(data.End);
            } catch (err) {
                throw new Error("Can not parse End as Date:" + err.toString());
            }
        }

        if (data.BookingReference !== undefined) {
            if (typeof (data.BookingReference) !== "string") {
                throw new Error("BookingReference must be string");
            }
            try {
                r.BookingReference = new URL(data.BookingReference);
            } catch (err) {
                throw new Error("Can not parse BookingReference '" + data.BookingReference + "' as URL:" + err.toString());
            }
        }

        if (data.ReservationID !== undefined) {
            try {
                r.ReservationID = BigInt(data.ReservationID);
            } catch (err) {
                throw new Error("Can not parse ReservationID as BigEnd:" + err.toString());
            }
        }

        return r;
    };

    public constructor(Type: ReservationRequest, AnswerQueue: string) {
        this.Type = Type
        this.AnswerQueue = AnswerQueue
    };
};

export class ReservationAnswer {
    Type: ReservationRequest
    Device?: URL
    Start?: dayjs.Dayjs
    End?: dayjs.Dayjs
    BookingReference?: URL
    ReservationID: bigint
    Deleted: boolean
    Successful: boolean
    ErrorMessage: string
}