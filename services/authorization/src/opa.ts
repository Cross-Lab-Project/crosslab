import { logger } from '@crosslab/service-common';
import { spawn} from 'child_process';
import readline from 'readline';
import { fix_object_without_colon, openfgaOpaData } from './openfga';
import { CheckTuple } from './types';

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

export async function opa_check(checks: CheckTuple[]){
    const outputPromise=checks.map((input: CheckTuple)=>(
        fetch('http://localhost:8181/v1/data/crosslab', {
            method: 'POST',
            body: JSON.stringify({input: {...input, object: fix_object_without_colon(input.object), ...openfgaOpaData}}),
        })
        .then(response => response.json())
        .then(response => {console.log(response); return response})
        .then(json => ({result: json.result.allow ?? false, reason: json.result.reason ?? 'unknown'}))
    ));
    return await Promise.all(outputPromise)
}

export async function opa_set_jwt_secret(secret: string){
    await fetch('http://localhost:8181/v1/data/jwt_secret', {
        method: 'PUT',
        body: JSON.stringify(secret),
    })
}