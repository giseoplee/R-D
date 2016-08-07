var fs = require('fs');

var _serverConfigDir = "./Config/server.conf"
var _storeConfigDir = "./Config/store.conf"
var _createConfigDir = "./Config/create.conf"
var _adminConfigDir = "./Config/admin.conf"

var _serverConfigRaw = fs.readFileSync(_serverConfigDir, 'ascii');
var _serverConfig = JSON.parse(_serverConfigRaw);

var _storeConfigRaw = fs.readFileSync(_storeConfigDir, 'ascii');
var _storeConfig = JSON.parse(_storeConfigRaw);

var _createConfigRaw = fs.readFileSync(_createConfigDir, 'ascii');
var _createConfig = JSON.parse(_createConfigRaw);

var _adminConfigRaw = fs.readFileSync(_adminConfigDir, 'ascii');
var _adminConfig = JSON.parse(_adminConfigRaw);

exports.serverConfig = _serverConfig;
exports.storeConfig = _storeConfig;
exports.createConfig = _createConfig;
exports.adminConfig = _adminConfig;
