

app.factory("voteService", function ($q, socketio, $rootScope) {

    return { 
        joinMsg: function (data) {
            socketio.emit("new user", data);
        },
        voteMsg: function (data) {
            socketio.emit("new msg", data);
        }
    }
})