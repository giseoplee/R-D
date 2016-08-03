var dbService = require('../Service/DBService.js');
var errorCode = require('../Common/ErrorCode.js');
var config = require('../Config.js');

var Survey = function (data) {
    this.data = data;
}

var table = 'surveys';
var tableDetail = 'survey_detail_';
var dateStamp = ",created_at=now(),updated_at=now()";
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
    console.log(arr);

    dbService.Query("INSERT ?? SET subject = ?, item = ?"+dateStamp, arr, function (data, err) {

        callback(data.insertId);
    });
}

Survey.createSurvey = function(surveyId, itemCount, itemArray, callback){

    var createString = config.createConfig.createQuery.replace("{survey_index}", surveyId);
    var arr = [];

    for(var i = 1; i <= itemCount; i++){

      createString += ", item"+i+" varchar(255) not null";
      createString += ", item"+i+"_count tinyint(11) default 0";
    }

    dbService.Query(createString+")", "", function(data, err){

        var arr = [];
        var items = "";
        arr.push(tableDetail+surveyId);
        arr.push(surveyId);

        for(var j = 1; j <= itemCount; j++){

          var itemIndex = j-1;
          items += ",item"+j+"='"+itemArray[itemIndex].item+"'";
        }

        console.log(arr);
        console.log(items);

        dbService.Query("INSERT ?? SET survey_id = ?"+items+dateStamp, arr, function(data, err){

            callback(surveyId);
        });
    });
}


module.exports = Survey;
