import { app } from "../generated";
import {config} from "../common/config";

app.initService({
    JWTVerify: async (_jwt, _scopes) => {
        return { username: "testuser", role: "superadmin", scopes: [] }
    }
})

console.log("Starting bookinf-frontend");
app.listen(config.Port);