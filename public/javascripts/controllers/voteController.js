

app.controller("voteController", function ($scope, voteContent, voteService, socketio, $state, $window) {

    var vm = this;
    vm.user_vote = "";
    vm.vote_flag = false;
    vm.subject = voteContent.subject;

    setting(voteContent.data);


    vm.onResponse = function () { 
        
        if (vm.user_vote.index === undefined ||  voteContent.survey===undefined) { 
            $window.alert("선택해주세요");
            return;
        }
        var form = {
            index: vm.user_vote.index,
            survey: voteContent.survey
        }
        voteService.voteMsg(form);
        vm.user_vote="";
        vm.vote_flag = true;
        $state.reload();
    }
    vm.onRadioClick = function (vote) {
        vm.user_vote = vote;
    }
    socketio.on("new msg", function (data) { 
        $state.reload();
    })
    vm.ckBar = function (ck) {
        console.log("check : ", ck);
    }
    function setting(voteContent) {
        vm.voteContent = voteContent;
        var items = voteContent;
        var max = 100;
        var sum = 0;
        items.forEach(function (element, index) {
            if (index != 0) sum += element.cnt;
        }, this);
        items.forEach(function (element, index) {
            if (index != 0) {
                vm.voteContent[index].percentage = 0;
                if (items.length - 2 == index) {
                    if (max == 100)
                        vm.voteContent[index].percentage = 0;
                    else
                        vm.voteContent[index].percentage = max;
                } else if (sum == 0) {
                    vm.voteContent[index].percentage = 0;
                } else {
                    var percentage = 0;
                    percentage = parseInt((element.cnt / sum) * 100);
                    vm.voteContent[index].percentage = percentage;
                    max -= percentage;
                }
            }
        }, this);
    }
});