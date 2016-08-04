var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');
var moment = require('moment');

var surveyModel = require('../Model/SurveyModel.js');
var errorCode = require('../Common/ErrorCode.js');

var router = express.Router();
moment.locale('ko');

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
        var pageListCount = 10;
        var pageBegin = (page - 1) * pageListCount;
        var pageTotal = Math.ceil(pageCount / pageListCount);
        var pageLinkCount = 10;
        var pageStart = Math.floor((page - 1) / pageLinkCount) * pageLinkCount + 1;
        var pageEnd = pageStart + (pageLinkCount - 1);
        var pageMax = pageCount - ((page - 1) * pageLinkCount);

        if(pageEnd > pageTotal){

            pageEnd = pageTotal;
        }

        if(page === undefined || page < 1){

            pageBegin = 0;
            pageTotal = 1;
            pageListCount = pageCount;
        }

        limitRange.push(pageBegin);
        limitRange.push(pageListCount);

        surveyModel.findSurveyList(selectField, limitRange, pageTotal, function(result){

            var array = [];
            array.push(result[0]);

            for (var i = 1; i < result.length; i++) {

                result[i].created_at = moment(result[i].created_at).fromNow();
                array.push(result[i]);
            }

            console.log(array);

            res.json({
                code: errorCode.Ok,
                data: array
            });
            res.end();
        });
    });
});

router.get('/detail/:survey', function (req, res) {

    var surveyId = req.params.survey;

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

        res.json({
            code: errorCode.Ok,
        });
        res.end();
    });
});

module.exports = router;
