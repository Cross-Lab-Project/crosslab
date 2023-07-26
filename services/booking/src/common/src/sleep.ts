export function sleep(ms: number) {
    return new Promise((p) => {setTimeout(p, ms);});
}