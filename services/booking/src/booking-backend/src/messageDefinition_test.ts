import * as mocha from "mocha";
import {DeviceBookingRequest} from './messageDefinition';

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

mocha.describe("messageDefinition.ts", function () {
    mocha.it("DeviceBookingRequest.fromString correct", async () => {
        let m = new DeviceBookingRequest(1n, new URL("http://localhost/device/superDevice"), 3);

        
        let a = JSON.stringify(m);

        let data = DeviceBookingRequest.fromString(a);

        if (data.BookingID !== m.BookingID) {
            throw new Error("Mismatch in BookingID, should be " + m.BookingID + " , is " + data.BookingID);
        }

        if (data.Device.toString() !== m.Device.toString()) {
            throw new Error("Mismatch in Device, should be " + m.Device.toString() + " , is " + data.Device.toString());
        }

        if (data.Position !== m.Position) {
            throw new Error("Mismatch in Position, should be " + m.Position + " , is " + data.Position);
        }
    });

    mocha.it("DeviceBookingRequest.fromString correct", async () => {
        let bad: string[] = [
            '{"BookingID":"","Device":"http://localhost/device/superDevice","Position":3}',
            '{"BookingID":true,"Device":"http://localhost/device/superDevice","Position":3}',
            '{"BookingID":[],"Device":"http://localhost/device/superDevice","Position":3}',
            '{"BookingID":{},"Device":"http://localhost/device/superDevice","Position":3}',
            '{"Device":"http://localhost/device/superDevice","Position":3}',
            '{"BookingID":"1","Device":"ht?:?tp##://localhost/device/superDevice","Position":3}',
            '{"BookingID":"1","Device":"","Position":3}',
            '{"BookingID":"1","Device":"superDevice","Position":3}',
            '{"BookingID":"1","Device":true,"Position":3}',
            '{"BookingID":"1","Device":5,"Position":3}',
            '{"BookingID":"1","Device":[],"Position":3}',
            '{"BookingID":"1","Device":{},"Position":3}',
            '{"BookingID":"1","Position":3}',
            '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":"3"}',
            '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":"http://localhost/device/superDevice"}',
            '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":true}',
            '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":[]}',
            '{"BookingID":"1","Device":"http://localhost/device/superDevice","Position":{}}',
            '{"BookingID":"1","Device":"http://localhost/device/superDevice"}',
            '["BookingID":"1","Device":"http://localhost/device/superDevice","Position":3]',
            '3',
            '{}',
            'wfiohwioäüfiäioob',
        ]
        for (let i = 0; i < bad.length; i++) {
            let fail = false;
            try {
                DeviceBookingRequest.fromString(bad[i]);
            } catch (err) {
                fail = true;
            }
            if (!fail) {
                throw new Error("Bad message " + bad[i] + " does not throw an error");
            }
        }

    });
});