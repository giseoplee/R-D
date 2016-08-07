app.controller("mainController", function ($scope, list, $window, $http) {

    var vm = this;
 
    vm.pageClick = function (page) {
        var $promise = $http.get("/survey/list?page=" + page)
        $promise.then(function (list) {
            //성공할 경우
            var code = list.data.code;
            if (code == 0) {
                setting(list.data);
            } else {
                $window.alert("존재하지 않는 페이지 입니다.");
            }
        });

    } 
    function setting(list) {
        vm.voteMsgs = list.data;
        var pageManagement = list.data[0];
        console.log("setting : ", list);
        vm.page = list.data.page;
        vm.pageStart = pageManagement.pageStart;
        vm.pageEnd = pageManagement.pageEnd;
        vm.pageTotal = pageManagement.pageTotal;
        vm.range();

        if (vm.page > vm.pageStart) {
            vm.beforePage = true;
        }
        else {
            vm.beforePage = false;
        }
        if (vm.endPage < vm.totalPage) {
            vm.afterPage = true;
        } else {
            vm.afterPage = false;
        }

        console.log("list ", list);
    }


    //pageing
    vm.range = function () {
        var step = step || 1;
        var input = [];
        for (var i = vm.pageStart; i <= vm.pageEnd; i += step) {
            input.push(i);
        }
        return input;
    };


    setting(list);
});
