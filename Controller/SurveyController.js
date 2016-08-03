var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var surveyModel = require('../Model/SurveyModel.js');
var errorCode = require('../Common/ErrorCode.js');

var router = express.Router();

router.use(function log(req, res, next) {
    console.log('## ROUTER DATA ##');
    next();
});

router.get('/list', function (req, res) {

    var selectField = ['id', 'subject', 'item'];

    surveyModel.findSurveyList(selectField, function (result) {

        var array = [];

        for (var i = 0; i < result.length; i++) {
            array.push(result[i]);
        }

        res.json({
            code: errorCode.Ok,
            data: array
        });
        res.end();

    });
});

router.get('/search', function (req, res) {

    var surveySubject = req.query.subject;
    if (surveySubject === undefined) {
        throw { code: errorCode.ParamError };
    }

    var selectField = ['id', 'subject', 'item'];

    surveyModel.findBySubject(selectField, surveySubject, function (result) {

        var array = [];

        for (var i = 0; i < result.length; i++) {
            array.push(result[i]);
        }

        res.json({
            code: errorCode.Ok,
            data: array
        });
        res.end();

    });
});

router.post('/insert', function (req, res) {

    var insertSubject = req.body.subject;
    var insertItem = req.body.contents.length;
    var insertArray = req.body.contents;

    if (insertSubject === undefined || insertItem === undefined) {
        throw { code: errorCode.ParamError };
    }

    surveyModel.insertSurvey(insertSubject, insertItem, function (insertResult) {

        if(!insertResult){
          throw{ code: errorCode.DBError };
        }
        var array = [];

        surveyModel.createSurvey(insertResult, insertItem, insertArray, function (createResult) {

            res.json({
                code: errorCode.Ok,
                index : createResult
            });
            res.end();

        });
    });
});

module.exports = router;
