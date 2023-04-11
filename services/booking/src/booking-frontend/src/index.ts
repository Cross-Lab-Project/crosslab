import { app } from "./generated";
import {config} from "../../common/config";

app.initService({
    security: {
        JWT: async (_jwt, _scopes) => {
            return { username: "testuser", url: "localhost/user/testuser", scopes: [] }
        }
    }
})

console.log("Starting bookinf-frontend");
app.listen(config.Port);