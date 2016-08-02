var dbService = require('../Service/DBService.js');
var errorCode = require('../Common/ErrorCode.js');

var Survey = function (data) {
    this.data = data;
}

var table = 'survey';
var q = ",??";

Survey.prototype.data = {};

Survey.findSurveyList = function (selectField, callback) {
    var string = "";
    var arr = [];

    for (var i = 0; i < selectField.length-1; i++) {
        string += q;

    }

    for (var j = 0; j < selectField.length ; j++) {
       
        arr.push(selectField[j]);
    }

    arr.push(table);

    dbService.Query("SELECT ??" + string + " FROM ??", arr, function (data) {
        callback(data);
    });
}

Survey.findBySubject = function (selectField, surveySubject, callback) {

    var string = "";
    var arr = [];

    for (var i = 0; i < selectField.length-1; i++) {

        string += q;
    }

    for (var j = 0; j < selectField.length ; j++) {

        arr.push(selectField[j]);
    }

    arr.push(table);
    arr.push('subject');

    dbService.Query("SELECT ??" + string + " FROM ?? WHERE ?? like '%"+surveySubject+"%'", arr, function (data) {
        callback(data);
    });
}

Survey.insertSurvey = function (subject, item, callback) {

    var arr = [];
    arr.push(table);
    arr.push(subject);
    arr.push(item);

    dbService.Query("INSERT ?? SET subject = ?, item = ?, created_at=now(), updated_at=now()", arr, function (data, err) {
        
        callback(data.insertId);
    });
}

module.exports = Survey;