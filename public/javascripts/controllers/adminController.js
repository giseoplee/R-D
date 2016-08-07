
app.controller("adminController", function ($http) {

    var vm = this;


    vm.onSubmit = function () {


        var password = dataEncode(vm.password);
        console.log(password);
        $promise = {
            password: password
        }


        //amin/login

    }

    var key_hash = CryptoJS.MD5("Message");// 경기도평생 교육 진흥원에서 주는 키 (현재는 테스트 키 입니다.)
    var key = CryptoJS.enc.Utf8.parse(key_hash);
    var iv = CryptoJS.enc.Utf8.parse('1234567812345678');// 해당 사이트 에서 임의의 키



    //암호화
    function dataEncode(message) {
        var encrypted = CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
        return encrypted.toString();
    }
})