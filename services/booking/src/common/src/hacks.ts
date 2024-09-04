export function hackURLWithPort(u: string | URL): string {
    if (typeof (u) == "string") {
        u = new URL(u);
    }

    if (u.hostname == "localhost") {
        let portstring = u.port
        if (portstring === "") {
            switch (u.protocol) {
                case "http:":
                    portstring = "80"
                    break;
                case "https:":
                    portstring = "443"
                    break;
                default:
                    throw new Error("Unknow protocol " + u.protocol + " - can not derive port");
            }
        }

        return u.protocol + "//" + u.hostname + ":" + portstring + u.pathname + u.search;
    }
    return u.toString()
}  