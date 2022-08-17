export class DeviceBookingRequest {
    BookingID: bigint
    Device: URL
    Position: number

    static fromString(json: string): DeviceBookingRequest {
        let data = JSON.parse(json)

        if (typeof (data) !== "object") {
            throw new Error("Parsed string must be object");
        }

        if(data.BookingID === undefined) {
            throw new Error("DeviceBookingRequest must have BookingID");
        }

        if(data.Device === undefined) {
            throw new Error("DeviceBookingRequest must have Device");
        }

        if(data.Position === undefined) {
            throw new Error("DeviceBookingRequest must have Position");
        }
        
        if(typeof(data.Position) !== "number") {
            throw new Error("DeviceBookingRequest: Position must be of type number");
        }
        
        return new DeviceBookingRequest(BigInt(data.BookingID), new URL(data.Device), data.Position);
    }

    public constructor(BookingID: bigint, Device: URL, Position: number) {
        this.BookingID = BookingID;
        this.Device = Device;
        this.Position = Position;
    }
}