import urlencode from 'urlencode';

export function encode_object(object: undefined): undefined;
export function encode_object(object: string): string;
export function encode_object(object: string | undefined): string | undefined;
export function encode_object(object: string| undefined): string | undefined {
    if (object === undefined) return undefined
    if (object.startsWith('http://') || object.startsWith('https://')){
        return urlencode(object)
    }else{
        const seperator=object.indexOf(':')
        if (seperator === -1) return urlencode(object)
        const prefix=object.slice(0, seperator)
        const suffix=object.slice(seperator+1)
        return prefix+':'+urlencode(suffix)
    }
}

export function decode_object(object: undefined): undefined;
export function decode_object(object: string): string;
export function decode_object(object: string| undefined): string | undefined;
export function decode_object(object: string| undefined): string | undefined {
    if (object === undefined) return undefined
    return urlencode.decode(object)
}