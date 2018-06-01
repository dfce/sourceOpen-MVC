class Ws_ws {
    constructor(ws) {
        this.WS = ws;
        this.initWebSocket();
    }

    initWebSocket () {
        this.WS.on('connection', ws => {
            ws.on('message', msg => {
                console.log('message:', msg);
            })
            
            ws.on('close', function(d) {
                console.log(d + 'close 客户端关闭页面');
            });
        })
    }
}

module.exports = Ws_ws;