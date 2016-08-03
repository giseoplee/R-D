app.controller("mainController",function($scope,list){
    
    var vm=this; 
    vm.voteMsgs=list.data;  
});