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
var config = require('./Config.js');

global.app = new express();
var cpuNo = os.cpus().length;
//var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', index);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

dbService.Init();
routesService.Init();

module.exports = app;
