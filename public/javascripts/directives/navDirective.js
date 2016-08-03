
'use strict';

app.directive('navDec',function(){
    return{
        replace: true,
        templateUrl:function(elem,attr){
            return 'partials/nav.html';
        }
    }
}) 