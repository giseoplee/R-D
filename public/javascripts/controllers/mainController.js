app.controller("mainController",function($scope){
    
    var vm=this;
    var voteArr=[
         {
            vote_no:1,
            title:"점심",
            name:"조현우",
            regdate:"2016-08-01"
        },
         {
            vote_no:2,
            title:"저녁",
            name:"김필영",
            regdate:"2016-08-01"
        }, {
            vote_no:3,
            title:"아침",
            name:"정원빈",
            regdate:"2016-08-01"
        }
        , {
            vote_no:4,
            title:"간식",
            name:"정종석",
            regdate:"2016-08-01"
        }, {
            vote_no:5,
            title:"점심",
            name:"조현우",
            regdate:"2016-08-01"
        }, {
            vote_no:6,
            title:"점심",
            name:"조현우",
            regdate:"2016-08-01"
        }
    ]
    vm.voteMsgs=voteArr;


   
});