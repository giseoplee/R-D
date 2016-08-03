

app.controller("voteController", function ($scope, voteContent, voteService, socketio) {

    var vm = this;
    vm.user_vote = "";
    vm.vote_flag = false;


    setting(voteContent);


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
        var items = voteContent.votes;
        var max = 100;
        var sum = 0;
        items.forEach(function (element, index) {
            sum += element.cnt;
        }, this);
        items.forEach(function (element, index) {
            vm.voteContent.votes[index].percentage = 0;
            if (items.length - 1 == index) {
                vm.voteContent.votes[index].percentage = max;
            } else {
                var percentage = 0;
                percentage = parseInt((element.cnt / sum) * 100);
                vm.voteContent.votes[index].percentage = percentage;
                max -= percentage;
            }
        }, this);
    }
});