var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var errorCode = require('../Common/ErrorCode.js');

var router = express.Router();

router.use(function log(req, res, next) {
    console.log('## VIEW ROUTER READY ##');
    next();
});

router.get('/', function(req, res) {
  res.render('index', { title: '정보기술연구소' });
});

module.exports = router;


 