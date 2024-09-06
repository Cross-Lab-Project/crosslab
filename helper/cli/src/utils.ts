import child_process from "node:child_process"
import fs from "node:fs"
import os from 'node:os'
import path from "node:path"
import { inspect } from "node:util"
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

export async function editJson(json: any){
    if (!process.stdin.isTTY) {
        let input = '';
        for await (const chunk of process.stdin) input += chunk;
        return JSON.parse(input);
    }

    const tmpdir = os.tmpdir()
    const tmpfile = path.join(tmpdir, 'edit.json')

    fs.writeFileSync(tmpfile, JSON.stringify(json, undefined, 2))
    process.stderr.write('Waiting for editor to close\n')
    editFile(tmpfile)
    const newJson = JSON.parse(fs.readFileSync(tmpfile).toString())
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
