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

Survey.findSurveyList = function (selectField, callback) { // 설문 리스트 전체 SELECT
    var string = "";
    var arr = [];

    for (var i = 0; i < selectField.length-1; i++) {

        string += q;
    }

    for (var j = 0; j < selectField.length ; j++) {

        arr.push(selectField[j]);
    }

    arr.push(table);

    dbService.Query("SELECT ??" + string + " FROM ?? ORDER BY id DESC", arr, function (data) {
        callback(data);
    });
}

Survey.findBySubject = function (selectField, surveySubject, callback) { // 제목에 따른 설문 검색

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

    dbService.Query("INSERT ?? SET subject = ?, item = ?"+dateStamp, arr, function (data, err) {

        callback(data.insertId);
    });
}

Survey.createSurvey = function(surveyId, itemCount, itemArray, callback){ // 해당 설문조사 테이블 생성

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

        dbService.Query("INSERT ?? SET survey_id = ?"+items+dateStamp, arr, function(data, err){ // 클라이언트로부터 받은 데이터를 설문 상세 테이블에 삽입

            console.log(data);
            arr = [];
            arr.push(table);
            arr.push(surveyId);
            arr.push(surveyId);

            dbService.Query("UPDATE ?? SET survey_detail_id = ? where id = ?", arr, function(data, err){ // 설문 테이블에 상세 테이블 PK 등록 (SELECT 시 조인 구문 사용 위함)

                callback(surveyId);
            });
        });
    });
}

Survey.updateItemCount = function(surveyId, itemIndex, callback){

    var arr = [];
    var columnName = "item"+itemIndex;
    arr.push(table_detail+surveyId);
    arr.push(columnName);
}


module.exports = Survey;
