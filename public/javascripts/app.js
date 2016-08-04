var app = angular.module('myApp', ["ui.router"])
	.config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("index");
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$stateProvider
			.state("index", {
				url: "/index",
				templateUrl: "Templates/main.html",
				controller: 'mainController',
				controllerAs: "mainCtrl",
				resolve: {
					list: function ($http) {
						var $promise = $http.get("/survey/list")
						return $promise.then(function (msg) {
							//성공할 경우 
							var code = msg.data.code;
							if (code == 0) {
								return msg.data;
							} else {
								msg.data = [];
								return msg.data;
							}
						})
					} 
				}
			})
			.state("write", {
				url: "/write",
				templateUrl: "Templates/vote.write.html",
				controller: 'voteWriteController',
				controllerAs: 'voteWriteCtrl'
			})
			.state("vote", {
				url: "/vote/:id/:subject/",
				templateUrl: "Templates/vote.html",
				controller: 'voteController',
				controllerAs: 'voteCtrl',
				resolve: {
                    voteContent: function ($http, $stateParams,$state,$window) {
						console.log("$state",$stateParams);
						var $promise =$http.get("/survey/detail/"+$stateParams.id);
						return $promise.then(function(msg){
							var code= msg.data.code;
							
							if(code==0){ 
								return msg.data.data;
							}else{
								return msg.data=[];
								// $window.alert("잘못된 경로입니다.");
								// $state.go("index");
							}
						});
					 
                    } 
                }
			})
		$locationProvider.html5Mode(true);
	})