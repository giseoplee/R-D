var express = require('express');
var http = require('http');
var util = require('util');
var path = require('path');
var logger = require('morgan');
var cluster = require('cluster');
var traceback = require('traceback');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compression = require('compression');
var os = require('os');
var dbService = require("./Service/DBService.js");
var routesService = require("./Service/RoutesService.js");
var index = require('./Controller/ViewController.js');
//var index = require('./Controller/SocketController.js');
var config = require('./Config.js');
global.app = new express();

const httpPort = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer);

var cpuNo = os.cpus().length;
//var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
io.on("connection", function (socket) {
  console.log("socket connection");
  socket.on("new user",function(data){
    socket.join(data.room_id);
  });
  socket.on("new msg",function(data){
    //db저장 후
    io.in(data.room_id).emit("new msg",data);

    socket.emit("new msg",data);
  });

  //연결 해제
  socket.on('disconnect', (data) => {
    console.log("disconnect");
    socket.leave();
  });
});

app.use('/', index);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

dbService.Init();
routesService.Init();

app.get('/*', function(req,res,next){
  res.render("index",{title:"Express"});
});

httpServer.listen(httpPort, ()=> {
  console.log('HTTP server listening on port %d !!!', httpPort);
});

module.exports = app;
