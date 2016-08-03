var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var surveyModel = require('../Model/SurveyModel.js');
var errorCode = require('../Common/ErrorCode.js');

var router = express.Router();

router.use(function log(req, res, next) {
    console.log('## SURVEY CONTROLLER ##');
    next();
});

router.get('/list', function (req, res) {

    var page = req.query.page;
    var selectField = ['id', 'subject', 'created_at'];
    var limitRange = [];

    surveyModel.getSurveyCount(function(result){

        var pageCount = result[0].count;
        var pageListCount = 3;
        var pageBegin = (page - 1) * pageListCount;
        var pageTotal = Math.ceil(pageCount / pageListCount);
        var pageLinkCount = 3;
        var pageStart = Math.floor((page - 1) / pageLinkCount) * pageLinkCount + 1;
        var pageEnd = pageStart + (pageLinkCount - 1);
        var pageMax = pageCount - ((page - 1) * pageLinkCount);

        if(pageEnd > pageTotal){
            pageEnd = pageTotal;
        }

        limitRange.push(pageBegin);
        limitRange.push(pageListCount);

        surveyModel.findSurveyList(selectField, limitRange, function(result){

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
});

router.get('/detail', function (req, res) {

    var surveyId = req.query.survey;
    if (surveyId === undefined) {
        throw { code: errorCode.ParamError };
    }

    surveyModel.findSurveyDetail(surveyId, function(result) {

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

        surveyModel.createSurvey(insertResult, insertItem, insertArray, function (createResult) {

            res.json({
                code: errorCode.Ok,
                index : createResult
            });
            res.end();

        });
    });
});

router.post('/update', function (req, res) {

    var surveyId = req.body.survey;
    var updateItemIndex = req.body.index;

    if (surveyId === undefined || updateItemIndex === undefined) {
        throw { code: errorCode.ParamError };
    }

    surveyModel.updateSurveyItem(surveyId, updateItemIndex, function (result) {

        console.log(result);
        res.json({
            code: errorCode.Ok,
        });
        res.end();
    });
});

module.exports = router;
