import { CheckAuth } from "./auth";

export function AuthMiddleware(req: any, res: any, next: any) {
    if(req.headers.authorization === undefined) {
        res.status(401).send();
        return;
    }
    let [url, ok]: [URL, boolean] = CheckAuth(req.headers.authorization)
    if(!ok) {
        res.status(403).send();
        return;
    }
    req.user = new URL("localhost/user/testuser"); // TODO
    next();
}