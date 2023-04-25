const fs = require("fs")

const indexJS = fs.readFileSync("./app/index.js")
fs.writeFileSync("./app/index.js", "#!/usr/bin/env node\n" + indexJS)