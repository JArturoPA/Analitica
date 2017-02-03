'use strict'

// Create our angular app and inject ngAnimate and ui-router
angular.module('metlifeApp.loadInformation', 
	[
		'metlifeApp.loadInformation.controllers', 
		'metlifeApp.loadInformation.directives', 
		'metlifeApp.loadInformation.services', 
		'metlifeApp.loadInformation.filters'
	]);


angular.module('metlifeApp.loadInformation')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider

		.state('loadInformation', {
			url: '/loadInformation',
			templateUrl: 'app/components/loadInformation/loadInformation.html'
		})
		
		// route to show our basic form (/form)
		.state('addLayout', {
			url: '/addLayout',
			templateUrl: 'app/components/loadInformation/loadInformation-new-layout/form.html',
			controller : 'AddLayoutController'
		})

			// nested states 
	        // each of these sections will have their own view
	        // url will be nested (/form/generalInfo)
			.state('addLayout.part1', {
				url: '/groups',
				templateUrl: 'app/components/loadInformation/loadInformation-new-layout/parts/part1.html'
			})

			.state('addLayout.part2', {
				url: '/info',
				templateUrl: 'app/components/loadInformation/loadInformation-new-layout/parts/part2.html'
			});

		// quit the # character in urls
		//$locationProvider.html5Mode(true);
}]);
