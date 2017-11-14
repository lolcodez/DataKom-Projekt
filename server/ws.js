const WebSocket = require('ws');

module.exports = (server, db) => {
    const wss = new WebSocket.Server({ server });

    function sendJSON(ws, data) {
        ws.send(JSON.stringify(data));
    }

    async function getAvailable(ws, msg) {
        if (msg["date"]) {
            return {
                "msg": "test"
            };
        } else {
            throw "bad request";
        }
    }

    async function addBooking(ws, msg) {
        if (msg["booking"]) {
            return {
                "msg": "test"
            };
        } else {
            throw "bad request";
        }
    }
    
    wss.on('connection', (ws, req) => {
        ws.on('message', (msg) => {
            try {
                try {
                    msg = JSON.parse(msg);
                } catch (_) {
                    throw "invalid JSON";
                }
                
                const func = {
                    getAvailable: getAvailable,
                    addBooking: addBooking
                }[msg["request"]];
                
                if (func) {
                    func(ws, msg)
                        .then((result) => {
                            result["result"] = "ok";
                            result["id"] = msg["id"];
                            sendJSON(ws, result);
                        })
                        .catch((err) => {
                            throw err;
                        })
                } else {
                    throw "bad request";
                }
            } catch (e) {
                sendJSON(ws, {
                    result: e,
                    id: msg["id"]
                });
            }
        });
    });
};