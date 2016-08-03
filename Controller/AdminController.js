var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var errorCode = require('../Model/AdminModel.js');
var errorCode = require('../Common/ErrorCode.js');

var router = express.Router();

router.use(function log(req, res, next) {
    console.log('## USER CONTROLLER ##');
    next();
});

router.post('/join', function(req, res){

});

router.post('/login', function(req, res){

});

router.post('/check', function(req, res){

});

module.exports = router;