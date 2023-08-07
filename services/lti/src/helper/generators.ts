import { randomBytes } from 'crypto';


export const random = (bytes = 32) => randomBytes(bytes).toString('base64url');