import * as readline from "readline";
import { Writable } from "stream";

export async function prompt(message: string, password: boolean = false) {
    interface IReadline extends readline.Interface {
        query: string;
        muted: boolean;
        output: Writable;
        _writeToOutput: (stringToWrite: string) => void;
    }

    return new Promise<string>((resolve, _reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }) as IReadline;

        rl._writeToOutput = function _writeToOutput(stringToWrite) {
            if (rl.muted)
                rl.output.write(stringToWrite.replace(/[^\n\e]/gm, ""));
            else
                rl.output.write(stringToWrite);
        };

        rl.query = message;
        rl.muted = false;

        rl.question((rl as any).query, (answer) => {
            rl.close();
            resolve(answer);
        });

        if (password) {
            rl.muted = true;
        }
    });
}
