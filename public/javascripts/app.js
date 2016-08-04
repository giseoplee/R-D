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
					list: function ($http,$stateParams) {
						var page; 
						if($stateParams.page===""||$stateParams.page===undefined)
                            page=1;
                        else page=$stateParams.page; 
						 
						var $promise = $http.get("/survey/list?page="+page)
						return $promise.then(function (msg) {
							//성공할 경우 
							var code = msg.data.code; 
							if (code == 0) { 
								msg.data.page=page;
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
				url: "/vote/:id/:subject",
				templateUrl: "Templates/vote.html",
				controller: 'voteController',
				controllerAs: 'voteCtrl',
				resolve: {
                    voteContent: function ($http, $stateParams,$state,$window) { 
						var $promise =$http.get("/survey/detail/"+$stateParams.id);
						return $promise.then(function(msg){
							var code= msg.data.code;

							 console.log("$state : ",$state);
							//성공할 경우 
							if(code==0){  
								msg.data.survey=$stateParams.id;
								msg.data.subject=$stateParams.subject;  
								return msg.data;
							}else{ 
								$window.alert("잘못된 경로입니다.");
								$state.go("index");
								return msg.data=[];
							}
						});
					 
                    } 
                }
			})
		$locationProvider.html5Mode(true);
	})