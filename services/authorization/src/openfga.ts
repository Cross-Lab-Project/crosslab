import { logger } from '@crosslab/service-common';
import { OpenFgaClient } from '@openfga/sdk';
import { friendlySyntaxToApiSyntax } from "@openfga/syntax-transformer";
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import readline from 'readline';
import { Tuple } from './types';
import { ApplicationDataSource } from './database/datasource';
import { RelationModel } from './database/model';

let fgaClient: OpenFgaClient

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let openfgaProcess: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let openfgaOpaData: any

const relationRepository = ApplicationDataSource.getRepository(RelationModel)

export async function openfga_init(){
    fgaClient= new OpenFgaClient({
        apiScheme: 'http',
        apiHost: 'localhost:8080'
    });

    let readyPromiseResolve: CallableFunction
    const readyPromise=new Promise((resolve, _reject)=>{
        readyPromiseResolve=resolve
    })

    openfgaProcess=spawn('openfga',
        [
            'run',
            '--log-format', 'json',
            '--playground-enabled=false',
            '--grpc-addr', 'localhost:8081',
            '--http-addr', 'localhost:8080'
    ], {stdio: ['ignore', 'pipe', 'pipe']});

    readline.createInterface({
        input:openfgaProcess.stderr,
        terminal:false
    }).on('line', (line) => {
        try{
            const json=JSON.parse(line.toString())
            if(json.msg.startsWith('HTTP server listening')) readyPromiseResolve()
            logger.log(json.level, json.msg, {...json, msg: undefined, 'subsystem': 'openfga'})
        }catch(e){
            logger.error('Failed to parse openfga log line', {line: line.toString(), error: e})
        }
    })
    
    process.on('SIGINT', () => {openfgaProcess.kill('SIGINT');process.exit(0)})
    process.on('SIGTERM', () => {openfgaProcess.kill('SIGTERM'); process.exit(0)})
    process.on('SIGQUIT', () => {openfgaProcess.kill('SIGQUIT'); process.exit(0)})

    await readyPromise

    const storeId = (await fgaClient.createStore({name: 'crosslab'})).id;
    if(storeId === undefined) throw new Error('Store ID is undefined');
    fgaClient.storeId = storeId

    const relation_model = readFileSync('relation_model.fga', 'utf8');
    const authorization_model_id=(await fgaClient.writeAuthorizationModel(friendlySyntaxToApiSyntax(relation_model))).authorization_model_id;
    if(authorization_model_id === undefined) throw new Error('Authorization model ID is undefined');
    fgaClient.authorizationModelId = authorization_model_id

    openfgaOpaData = {
        "openfga": {
            "store": storeId,
            "authorization_model_id": authorization_model_id
        }
    }

    await rehydrate()
}

export function openfga_deinit(){
    openfgaProcess.kill(9)
}

async function rehydrate(){
    const relations=await relationRepository.find()
    if (relations.length === 0) return
    await fgaClient.write({
        writes: relations.map((tuple: Tuple)=>({
            user: tuple.subject,
            relation: tuple.relation,
            object: tuple.object,
        }))
    }, {transaction: {disable: true}})
}

export async function update_relations(add: Tuple[], remove: Tuple[]){
    await relationRepository.createQueryBuilder().insert().values(add).orIgnore().execute()
    await relationRepository.remove(remove)
    await fgaClient.write({
        writes: add.map((tuple: Tuple)=>({
            user: tuple.subject,
            relation: tuple.relation,
            object: tuple.object,
        })),
        deletes: remove.map((tuple: Tuple)=>({
            user: tuple.subject,
            relation: tuple.relation,
            object: tuple.object,
        })),
    }, {transaction: {disable: true}})
}

export async function query_relations(subject: string | undefined, relation: string | undefined, object: string){
    if (!object.includes(':')) object=object+':';
    let tuples: Tuple[]=[]
    let continuationToken: string | undefined = undefined
    do{
        const result = await fgaClient.read({
            user: subject,
            relation: relation,
            object: object
        }, {continuationToken})
        const local_tuples = result.tuples?.map((tuple)=>({
            subject: tuple.key!.user,
            relation: tuple.key!.relation,
            object: tuple.key!.object,
        }))??[]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tuples=tuples.concat(local_tuples as any)
        continuationToken=result.continuation_token === '' ? undefined : result.continuation_token
    } while (continuationToken !== undefined)

    return tuples
}