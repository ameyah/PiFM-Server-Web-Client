/**
 * Created by Ameya on 7/29/2016.
 */

var webSocketInstance = function(serverAddr){
    return (function(){
        //Everything outside of the public Method is private
        var ws;

        var publicMethods = {
            init: function() {
                ws = new WebSocket("ws://10.0.0.16:8081");
                ws.onopen = function () {
                    ws.send("collection");
                };
                ws.onmessage = function (evt) {
                    handleMessage(evt.data);
                };

                ws.onclose = function () {
                    // websocket is closed.
                    //alert("Connection is closed...");
                };
            },
            sendMessage: function(msg) {
                ws.send(msg);
            }
        };

        if(serverAddr && serverAddr != undefined){
            publicMethods.init(serverAddr);
        }

        return publicMethods;
    })(serverAddr);
};
