import * as mocha from "mocha";
import { randomID } from "./operations/internal";

mocha.describe("messageDefinition.ts", function () {

    mocha.it("randomID()", async () => {
        let ids: string[] = [];
        for(let i = 0; i < 10000; i++) {
            let newID = randomID()
            for(let j = 0; j < ids.length; j++) {
                if(newID === ids[j]) {
                    throw new Error("Found identical ID!");
                }
            }
            ids.push(newID)
        }
    });

});