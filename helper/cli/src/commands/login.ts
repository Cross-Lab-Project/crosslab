import { APIClient } from "@cross-lab-project/api-client";
import { Command } from "commander";
import { prompt } from "./prompt";

export function login(program: Command, getClient: () => APIClient){
    program.command('login')
    .description('Authenticate to CrossLab using your credentials')
    .option('--raw', 'Output the raw JSON response')
    .option('--local', 'Use the local authentification schema')
    .action(async (options, command)=> {
        const client = getClient();
        let username: string = options.username;
        let password: string = options.password;
    
        if (username == undefined) {
            username = await prompt("Username: ");
        }
    
        if (password == undefined) {
            password = await prompt("Password: ", true);
        }
    
        await client.login(username, password, { method: options.local?"local":"tui" })
    
        if (!options.raw) {
            process.stdout.write("Logged in successfully\n\n");
            process.stdout.write("Please save these variables to your environment:\n\n");
        }
    
        process.stdout.write("export CROSSLAB_CLI_URL=" + client.url + "\n");
        process.stdout.write("export CROSSLAB_CLI_TOKEN=" + client.accessToken + "\n");
    
        if (!options.raw) {
            const get_full_name: (c: Command) => string = (c: Command) => { return c.parent ? get_full_name(c.parent) + " " + c.name() : c.name() }
            process.stdout.write("\n");
            process.stdout.write("To automate the login process, you can use the following in the script:\n\n");
            process.stdout.write("eval $(" + get_full_name(command) + " --username <username> --password <password> --raw)\n\n");
        }
    
    });
}