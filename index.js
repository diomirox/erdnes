const { scanIt } = require("./dist")

scanIt("download.png").then(console.log).catch(console.log)