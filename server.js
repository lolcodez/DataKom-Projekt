'use strict';

const express = require('express');

const app = express();

let debug = false;

const argv = (() => {
    let scriptArgs = false;
    return process.argv.filter((val) => {
        if (val === '--') {
            scriptArgs = true;
            return false;
        }
        return scriptArgs
    });
})();

argv.forEach((val) => {
    if (val === '--debug') {
        debug = true;
        console.log('--- in debug mode ---');
    } else {
        console.log(`Unknown argument '${val}'.`);
        process.exit(-1);
    }
});

app.use('/', express.static('public/index.html'));
app.use(express.static('public'));
app.use(express.static('build'));

app.listen(80, () => console.log('Listening on port 80'));
