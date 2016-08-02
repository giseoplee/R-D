var ErrorCode = function() {
	 // 파라미터 에러
};

ErrorCode.Ok = 0;
ErrorCode.ParamError = 1000;
ErrorCode.DBError = 2000;
ErrorCode.DBNotFoundData = 2001;
ErrorCode.UnknownError = 9999;

module.exports = ErrorCode;