var dbService = require('../Service/DBService.js');
var errorCode = require('../Common/ErrorCode.js');
var config = require('../Config.js');

var User = function (data) {
	this.data = data;
}

var table = "users";

User.prototype.data = {};

module.exports = User;