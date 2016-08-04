var util = require('util');
var surveyModel = require('../Model/SurveyModel.js');
var async = require("async");
var SocketService = function() {
};

SocketService.Init = function() {

    io.on("connection", function(socket) {

        socket.on("new user", function(data) {
            console.log("join", data);
            var room ="r"+data.room_id;
            socket.join(room);
            socket.room=room;
        });

        socket.on("new msg", function(data) {
            // console.log("socket : ",socket);

            var surveyId = data.survey;
            var updateItemIndex = data.index;

            if (surveyId === undefined || updateItemIndex === undefined) {
                throw { code: errorCode.ParamError };
            }

            surveyModel.updateSurveyItem(surveyId, updateItemIndex, function(result) {

                surveyModel.findSurveyDetail(surveyId, function(result) {

                    var array = [];

                    // async.eachSeries(result, function(data, callback) {
                    //     array.push(data);

                    //     callback(array);
                    // }, function(array)  {
                    //     console.log("array",array);
                    //     socket.broadcast.to(data.room_id).emit("new msg", array);
                    //     socket.emit("new msg", array);
                    // });

                    for (var i = 0; i < result.length; i++) {
                        array.push(result[i]);
                    } 
                    console.log("room : ",socket.room)
                    socket.broadcast.to(socket.room).emit("new msg", array); 
                    socket.emit("new msg", array);
                });
            });
        });

        // 연결 해제
        socket.on('disconnect', function(data) {
            console.log("disconnect");
            socket.leave();
        });
    });
}

module.exports = SocketService;
