import { logger } from '@crosslab/service-common';
import { spawn} from 'child_process';
import readline from 'readline';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let opaProcess: any

export async function opa_init(){
    opaProcess = spawn('opa', ['run', '-s', '--bundle', 'policy', '--addr', 'localhost:8181'], {stdio: ['ignore', 'pipe', 'pipe']});
    
    readline.createInterface({
        input:opaProcess.stderr,
        terminal:false
    }).on('line', (line) => {
        const json=JSON.parse(line.toString())
        logger.log(json.level, json.message, {...json, 'subsystem': 'opa'})
    })
    
    readline.createInterface({
        input:opaProcess.stdout,
        terminal:false
    }).on('line', (line) => {
        logger.log("error", line, {'subsystem': 'opa'})
    })
    
    process.on('SIGINT', () => {opaProcess.kill('SIGINT');process.exit(0)})
    process.on('SIGTERM', () => {opaProcess.kill('SIGTERM'); process.exit(0)})
    process.on('SIGQUIT', () => {opaProcess.kill('SIGQUIT'); process.exit(0)})
}

export function opa_deinit(){
    opaProcess.kill(9)
}
