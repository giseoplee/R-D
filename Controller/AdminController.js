var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var util = require('util');
var uuid = require('node-uuid');
var jwt = require('jwt-simple');

var config = require('../Config.js');
var errorCode = require('../Model/AdminModel.js');
var errorCode = require('../Common/ErrorCode.js');

var router = express.Router();

router.use(function log(req, res, next) {

    console.log('## USER CONTROLLER ##');
    next();
});

router.post('/login', function(req, res){

    var key = req.body.key;
    var authKey = config.adminConfig.authKey;
    var algorithm = ['RSA-SHA512', 'RSA-SHA1', 'whirlpool', 'DSA-SHA', 'dsaWithSHA', 'ecdsa-with-SHA1', 'ripemd160WithRSA', 'sha512WithRSAEncryption', 'RSA-SHA1-2' ,'RSA-SHA384'];

    for(var i = 0; i < algorithm.length; i++){
      key = encryption(authKey, key, algorithm[i]);
    }

    //console.log(key);

    res.json({
        code: errorCode.Ok,
    });
    res.end();
});

router.post('/check', function(req, res){

});

router.post('/user/login', function(req, res) {

    res.type('application/json');
    res.header("Access-Control-Allow-Origin" , "*");
    var password = encryption(auth_key, req.body.userpw ,'RSA-SHA512');

    connection.query("select account, id, password from user where account=?;",
        [req.body.userid], function(error, cursor){

            if(cursor.length > 0){

                if(error==null){

                    if(cursor[0].password==password){

                        var expires = moment().add('minutes', 30).valueOf();
                        var token = jwt.encode({
                            iss : cursor[0].account+cursor[0].password,
                            exp : expires
                        }, auth_key, "HS512");

                        res.status(200).json({"message" : "success", "token" : token, "id" : cursor[0].id, "account" : cursor[0].account});

                    }else{
                        res.status(200).json({"message" : "passwordError"});
                    }
                }else{
                    res.status(200).json({"message" : "queryError"});
                }
            }else{
                res.status(200).json({"message" : "notFoundUser"});
            }
    });
});

function encryption (auth, key, algorithm){
    var hash = crypto.createHash(algorithm);
    var hashedContent = hash.update(auth+key);
    hashedContent = hash.digest('hex');
    return hashedContent;
}

module.exports = router;
