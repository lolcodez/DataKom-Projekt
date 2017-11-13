'use strict';

// INcludes

const config      = require("./config.js");

const express     = require("express");
const mime        = require("mime");
const dbInterface = require("./db.js");

// Program veriables

let debug = false;
let port  = 80;

// Parsing arguments

const argv = (() => {
    let scriptArgs = false;
    return process.argv.filter((val) => {
        if (val === "--") {
            scriptArgs = true;
            return false;
        }
        return scriptArgs
    });
})();

argv.forEach((val) => {
    if (val === "--debug") {
        debug = true;
        console.log("--- in debug mode ---");
    } else if (val.startsWith("--port=")) {
        port = val.substr("--port=".length);
    } else {
        console.log(`Unknown argument '${val}'.`);
        process.exit(-1);
    }
});

// Main section

const app = express();

let db;

app.set("port", (process.env.PORT || port));

app.use("/", express.static("public/index.html"));
app.use(express.static("public"));
app.use(express.static("build"), 
    (req, res, next) => {
        res.setHeader("Content-Type", mime.lookup(req.url));
        next()
    }
);

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

(async function() {
    try {
        db = await dbInterface();
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }

    console.log("DB connected");

    app.listen(app.get("port"), () => console.log(`Listening on port ${app.get("port")}`));
})();
