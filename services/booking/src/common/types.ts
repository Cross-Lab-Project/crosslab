export interface Timeslot {
    Start: Date;
    End: Date;
};

export interface Device {
    ID: URL;
};

export type BookingType = "" | "normal";

export type BookingStatus = "pending" | "booked" | "rejected" | "cancelled" | "active" | "active-pending" | "active-rejected";

export interface Booking {
    ID:	URL;
    Time: Timeslot;
    Devices: Device[];
    Type: BookingType;
    Status: BookingStatus;
    You?: boolean;
    User?: URL;
    External?: boolean;
    Message: string;
};

export interface Experiment {
    Devices: Device[];
    Description?: string;
};