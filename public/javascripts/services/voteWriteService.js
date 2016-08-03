app.factory("voteWriteService", function ($http, $window, $state) {

    return {
        voteResigter: function (voteContents) {
            //  url: "http://54.64.113.111:3000/survey/insert",
            // url: "/vote-register",
            var $promise = $http({
                url: "http://54.64.113.111/survey/insert",
                method: "POST",
                data: voteContents
            });

            $promise.then(function (msg) { 
                var code=msg.code;
                var index=msg.index; 
                //성공할 경우
                if (code===0) {
                    $window.alert("등록되었습니다.");
                    $state.go("vote", { id: index });
                } else {
                    $window.alert("다시 한번 해주십시오.");
                }
            });
        }
    }
})

