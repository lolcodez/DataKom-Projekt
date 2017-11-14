const db     = require("../server/db.js");

module.exports = () => {
    db().then(it => global.db = it);
};