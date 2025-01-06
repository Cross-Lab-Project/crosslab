import child_process from "node:child_process"
import fs from "node:fs"
import os from 'node:os'
import path from "node:path"
import { inspect } from "node:util"
import { Document, Node, parse, YAMLMap, YAMLSeq } from 'yaml'
import { config } from "./config.js"

export function outputJson(parsed: any){
    if (process.stdout.isTTY)
    {
        process.stdout.write(inspect(parsed, { colors: true, depth: null, maxArrayLength: Infinity }))
    }
    else
    {
        process.stdout.write(JSON.stringify(parsed, undefined, 2))
    }
    process.stdout.write('\n')
}

function addComments(node: Node | null, path: string = ''){
    if (node instanceof YAMLMap){
        const keysToDelete = []
        for(const item of node.items){
            console.log(item.key)
            if ((item.key as any).toString().startsWith('_c_')){
                const key = (item.key as any).toString().slice(3)
                keysToDelete.push(item.key)
                if (!node.has(key)){
                    node.commentBefore=(node.commentBefore?node.commentBefore+'\n':'')+key+': '+item.value
                }
            }else{
                addComments(item.value as Node, path+'.'+item.key)
            }
        }
        for(const key of keysToDelete){
            node.delete(key)
        }
    }else if (node instanceof YAMLSeq){
        for(const item of node.items){
            addComments(item as Node, path+'[]')
        }
    }
}

export async function editJson(json: any){
    if (!process.stdin.isTTY) {
        let input = '';
        for await (const chunk of process.stdin) input += chunk;
        return JSON.parse(input);
    }

    const tmpdir = os.tmpdir()
    const tmpfile = path.join(tmpdir, 'edit.yaml')

    const doc = new Document(json)
    addComments(doc.contents)
    fs.writeFileSync(tmpfile, doc.toString().replace(/\n{}\n$/g,'\n'))
    process.stderr.write('Waiting for editor to close\n')
    editFile(tmpfile)
    const newJson = parse(fs.readFileSync(tmpfile).toString())
    fs.unlinkSync(tmpfile)
    return newJson
}

export function editFile(tmpfile: string) {
    const args = (process.env.VISUAL || process.env.EDITOR || config.editor || 'vi').split(' ')
    const editor = args.shift()!
    const child = child_process.spawnSync(editor, [...args, tmpfile], { stdio: 'inherit' })
    if (child.status !== 0) {
        throw new Error('Editor returned non-zero exit code')
    }
}

