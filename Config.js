var fs = require('fs');

var _serverConfigDir = "./Config/server.conf"
var _storeConfigDir = "./Config/store.conf"

var _serverConfigRaw = fs.readFileSync(_serverConfigDir, 'ascii');
var _serverConfig = JSON.parse(_serverConfigRaw);

var _storeConfigRaw = fs.readFileSync(_storeConfigDir, 'ascii');
var _storeConfig = JSON.parse(_storeConfigRaw);

exports.serverConfig = _serverConfig;
exports.storeConfig = _storeConfig;