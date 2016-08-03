

app.controller("voteController", function ($scope, voteContent,voteService) {

    var vm = this;
    var user_vote;
    vm.vote_flag=false;
     

    setting(voteContent);


    vm.onResponse=function(){  
        voteService.voteMsg(user_vote);
        vm.vote_flag=true;
    }  
    vm.onRadioClick=function(vote){
        console.log("click",vote);
        user_vote=vote;
    }
    function setting(voteContent) { 
        vm.voteContent = voteContent; 
        content = voteContent.votes;
        var max = 100;
        var sum = 0;
        content.forEach(function (element, index) {
            sum += element.num;
        }, this);
        content.forEach(function (element, index) {
            vm.voteContent.votes[index].percentage = 0;
            if (content.length - 1 == index) {
                vm.voteContent.votes[index].percentage = max;
            } else {
                var percentage = 0;
                percentage = parseInt((element.num / sum) * 100);
                vm.voteContent.votes[index].percentage = percentage;
                max -= percentage;
            }
            console.log(vm.voteContent.votes[index].percentage);

        }, this);
    }
});