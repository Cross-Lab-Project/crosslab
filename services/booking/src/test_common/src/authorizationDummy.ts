export function addAuthorizationDummys(request: any, authorized: boolean) {
    const auth = authorized;

    request.authorization = {}; 
    
    request.authorization.user = "dummy";

    request.authorization.check_authorization_or_fail = async function(action:string, id:string) : Promise<void> {
        if(!auth) {
            throw Error();
        } 
    } 

    request.authorization.relate = async function(user: string, action:string, id:string) : Promise<boolean> {
        return true;
    } 

    request.authorization.unrelate = async function(user: string, action:string, id:string) : Promise<boolean> {
        return true;
    } 
} 