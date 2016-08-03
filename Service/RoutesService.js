var util = require('util');
var survey_routes = require('../Controller/SurveyController.js');

var RoutesService = function () {
};

/***
    라우터
*/
RoutesService.Init = function() {

    app.use(function log(req, res, next) {
        console.log('[INFO] URL : '+req.originalUrl+' IP : '+req.ip);
        next();
    })

    // 라우터
    app.use('/survey', survey_routes);
    // app.use('/exchangerate', exchangeRate_routes);
    // app.use('/push', push_routes);

    console.log('##Settup Routes');
}

module.exports = RoutesService;
