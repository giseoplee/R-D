

app.controller("voteController", function ($scope, voteContent, voteService, socketio) {

    var vm = this;
    vm.user_vote = "";
    vm.vote_flag = false;
    vm.subject = voteContent.subject;
    console.log("data", voteContent);

    setting(voteContent.data);


    vm.onResponse = function () {
        voteService.voteMsg(vm.user_vote);
        vm.vote_flag = true;
    }
    vm.onRadioClick = function (vote) {
        console.log(vote);
        vm.user_vote = vote;
    }
    socketio.on("new msg", function (data) {
        console.log("data", data);
    })

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
                if (items.length - 1 == index) {
                    if (max == 100)
                        vm.voteContent[index].percentage = 0;
                    else
                        vm.voteContent[index].percentage = max;
                } else if (sum == 0) {
                    vm.voteContent[index].percentage = 0;
                } else {
                    var percentage = 0;
                    percentage =parseInt ((element.cnt / sum) * 100);
                    console.log("percentage", percentage)
                    vm.voteContent[index].percentage = percentage;
                    max -= percentage;
                }
            }
        }, this);
    }
});