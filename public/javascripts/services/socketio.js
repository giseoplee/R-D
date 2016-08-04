

app.factory("socketio", function ($rootScope) {

    var socket = io.connect(), isConnecting = false;
    return {
        on: function (eventName, callback) {
            console.log("eventName", eventName);
            if (eventName == 'connect' && isConnecting) socket.connect();
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        },
        disconnect: function () {
            isConnecting = true;
            $timeout(socket.disconnect(), 0, false);
        },
        socket: socket
    };
});