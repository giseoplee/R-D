app.controller("voteWriteController", ["$scope","$window","voteWriteService",function ($scope,$window,voteWriteService) {


    var vm = this;
    vm.votes = [];
    vm.subject="";
    vm.content="";
    vm.addVote = function () {   
        if(vm.content.trim().length==0){
            $window.alert("목록을 입력해주세요");
            return;
        }else if(vm.votes.length>6){
            $window.alert("7개 이상 등록은 불가능합니다.");
            return;
        }else if(vm.subject.trim().length==0){
            $window.alert("주제를 입력해 주세요.");
            return;    
        }
        vm.votes.push({item:vm.content});
        vm.content = ""; 
    } 
    vm.removeVote = function (index) { 
       removeByIndex(vm.votes,index);
    } 
    vm.submitVote=function(){ 
        var votes=vm.votes;
        if(votes.length<2){
            $window.alert("2개 이상 등록해주세요.");
            return;
        }else if(vm.subject.trim().length==0){
            $window.alert("주제를 입력해 주세요.");
            return;    
        } 
        var content={
            subject:vm.subject,
            contents:votes
        }
        voteWriteService.voteResigter(content);
    }
    function removeByIndex(arrayName, arrayIndex) {
        arrayName.splice(arrayIndex, 1);
    }
}]);