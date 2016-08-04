

app.controller("voteController", function ($scope, voteContent, voteService, socketio, $state, $window) {

    var vm = this;
    vm.user_vote = "";
    vm.vote_flag = false;
    vm.subject = voteContent.subject;

    voteService.joinMsg({ room_id: voteContent.survey });

    setting(voteContent.data);

    vm.onResponse = function () {

        if (vm.user_vote.index === undefined || voteContent.survey === undefined) {
            $window.alert("선택해주세요");
            return;
        }
        var form = {
            index: vm.user_vote.index,
            survey: voteContent.survey
        }
        voteService.voteMsg(form);
        vm.user_vote = "";
        vm.vote_flag = true;
    }
    vm.onRadioClick = function (vote) {
        vm.user_vote = vote;
    }
    socketio.on("new msg", function (data) {
        console.log("new msg : ", data);
        setting(data);
    })
    vm.ckBar = function (ck) {
        console.log("check : ", ck);
    }
    function setting(voteContent) {
        vm.voteContent = voteContent;
        var items = voteContent;
        var max = 100;
        var sum = 0;
        console.log("items : ", voteContent)
        for (var i = 1; i < items.length; i++) {
            sum += items[i].cnt;
        }
        for (var i = 1; i < items.length; i++) {
            vm.voteContent[i].percentage = 0;

            if (items.length - 1 == i) {
                if (max == 100 && items[i].cnt == 0)
                    vm.voteContent[i].percentage = 0;
                else
                    vm.voteContent[i].percentage = max;
            } else if (sum == 0) {
                vm.voteContent[i].percentage = 0;
            } else {
                var percentage = 0;
                percentage = parseInt((items[i].cnt / sum) * 100);
                vm.voteContent[i].percentage = percentage;
                max -= percentage;
            }

            console.log("sum : ", vm.voteContent[i].percentage);
        }
    }
});