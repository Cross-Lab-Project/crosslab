import { app } from "./generated";
import {config} from "../../common/config";


app.initService({
    JWTVerify: async (_jwt, _scopes) => {
        return { username: "testuser", url: "localhost/user/testuser", scopes: [] }
    }
})

console.log("Starting schedule-service");
app.listen(config.Port);