var app = angular.module('myApp', ["ui.router"])
	.config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise("index");
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$stateProvider
			.state("index", {
				url: "/index",
				templateUrl: "Templates/main.html",
				controller: 'mainController',
				controllerAs: "mainCtrl"
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
						console.log("stateParam",$stateParams);
						$http.get("/survey/list")
                            .then(function(response){
                                console.log("response : ",response); 
                            })


						var arr = {
							index:$stateParams.id,
							title: "설문조사",
							name:"조현우",
							votes: [
								{ content: "밥", num: 55 },
								{ content: "국수", num: 25 },
								{ content: "버거", num: 15 },
								{ content: "집", num: 18 },
								{ content: "샷", num: 20 }
							]
						};
						return arr;
                    }
                }
			}) 
		$locationProvider.html5Mode(true);
	})