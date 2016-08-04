var util = require('util');
var io = require('socket.io');
//
// io.on("connection", function (socket) {
//
//   socket.on("new user",function(data){
//       console.log("join",data);
//       socket.join(data.room_id);
//   });
//
//   socket.on("new msg",function(data){
//       console.log("socket : ",socket);
//       //db저장 후
//       console.log("msg",data);
//       io.in(data.room_id).emit("new msg",data);
//   });
//
// // 연결 해제
//   socket.on('disconnect', (data) => {
//       console.log("disconnect");
//       socket.leave();
//   });
// });
