"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var wsServer = new ws_1.Server({ port: 8085 });
console.log("setup server...");
//当有任何一个客户端连接到服务器时，给这个客户端推送一条消息
wsServer.on("connection", function (websocket) {
    websocket.send("这个消息是服务器主动推送的????");
    websocket.on('message', function (m) {
        console.log("received:", m);
        websocket.send("received from client:" + m);
    });
    // let temp:any;
    // websocket.on("message",m => {
    //     temp = m
    // })
    // websocket.send("received from client:"+temp)
});
