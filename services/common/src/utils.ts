import { logger } from "./logging/index.js";

export function die(reason: string): string {
  if(logger){
    logger.error('error', reason);
  }else{
    console.error(reason);
  }
  process.exit(1);
}

export function removeNullOrUndefined<T>(obj: T): T {
  if (Array.isArray(obj)){
    return obj.map(removeNullOrUndefined) as T;
  }
  if (typeof obj === 'object'){
    const newObj = {} as T;
    for (const key in obj){
      if (obj[key] !== null && obj[key] !== undefined){
        newObj[key] = removeNullOrUndefined(obj[key]);
      }
    }
    return newObj;
  }
  return obj
}