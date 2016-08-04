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
							} else{
								msg.data=[];
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
				url: "/vote/:id",
				templateUrl: "Templates/vote.html",
				controller: 'voteController',
				controllerAs: 'voteCtrl',
				resolve: {
                    voteContent: function ($http, $stateParams) {
						console.log("stateParam", $stateParams); 
						var arr = {
							id: $stateParams.id,
							subject: "설문조사",
							votes: [
								{ item: "밥", cnt: 55 },
								{ item: "국수", cnt: 25 },
								{ item: "버거", cnt: 15 },
								{ item: "집", cnt: 18 },
								{ item: "샷", cnt: 20 }
							]
						};
						return arr;
                    }
                }
			})
		$locationProvider.html5Mode(true);
	})