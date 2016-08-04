app.factory("voteWriteService", function ($http, $window, $state) {

    return {
        voteResigter: function (voteContents) {
            var $promise = $http({
                url: "/survey/insert",
                method: "POST",
                data: voteContents
            });

            $promise.then(function (msg) {

                var code=msg.data.code;
                var index=msg.data.index;  
                //성공할 경우
                if (code===0) {
                    $window.alert("등록되었습니다.");
                    $state.go("vote", { id: index,subject:voteContents.subject });
                } else {
                    $window.alert("다시 한번 해주십시오.");
                }
            });
        }
    }
})

