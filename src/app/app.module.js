'use strict'

angular.module('metlifeApp',
	[
		/*'ngCookies',
		'ngSanitize',
		'ngResource',
		'ngAnimate',*/
		'ui.router',
		/*'ngMessages',
		'pascalprecht.translate',*/
		'metlifeApp.qualificationModel',
		'metlifeApp.loadInformation',
		'metlifeApp.controllers',
		'metlifeApp.directives',
		'metlifeApp.filters',
		'metlifeApp.services'
	]);

angular.module('metlifeApp')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider

			// Route for the home page
			.state('home', {
				url 	: '/home',
				templateUrl: 'app/common/home.html'
			});

		$urlRouterProvider.when("", "/home");
      	$urlRouterProvider.when("/", "/home");
		$urlRouterProvider.otherwise('/home');
}]);

/*angular.module('metlifeApp').run(['$state', function($state){
	$state.transitionTo('qualificationModel.modelNew.part1');
}]);*/