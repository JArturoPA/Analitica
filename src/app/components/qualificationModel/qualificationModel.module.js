'use strict'

// Create our angular app and inject ngAnimate and ui-router
angular.module('metlifeApp.qualificationModel', 
	[
		'metlifeApp.qualificationModel.controllers', 
		'metlifeApp.qualificationModel.directives', 
		'metlifeApp.qualificationModel.services', 
		'metlifeApp.qualificationModel.filters'
	]);


angular.module('metlifeApp.qualificationModel')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
			function($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider

		.state('qualificationModel', {
			url: '/qualificationModel',
			templateUrl: 'app/components/qualificationModel/qualificationModel.html'
		})

		/*.state('add', {
			url: '/newQualificationModel',
			templateUrl: 'modules/qualificationModel/hermano.html'
		})*/

		// route to show our basic form (/form)
		.state('addQualificationModel', {
			url: '/add',
			templateUrl: 'app/components/qualificationModel/qualificationModel-new/form.html',
			controller : 'ModelCreationController'
		})

			// nested states 
	        // each of these sections will have their own view
	        // url will be nested (/form/generalInfo)
			.state('addQualificationModel.part1', {
				url: '/general-info',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part1.html'
			})

			// url will be /form/industrial-secto
			/*.state('qualificationModel.new.part2', {
				url: '/qualificationModel/new/industrial-sector',
				templateUrl: 'modules/qualificationModel/views/formParts/part2.html'
			})*/

			// url will be /form/groups-of-variables
			.state('addQualificationModel.part2', {
				url: '/groups-of-variables1',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part2.html'/*,
				controller : 'formGVController'*/
			})

			// url will be /form/variables
			.state('addQualificationModel.part3', {
				url: '/variables1',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part3.html'/*,
				controller : 'formVarController'*/
			})

			// url will be /form/values
			.state('addQualificationModel.part4', {
				url: '/values1',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part4.html'/*,
				controller : 'formValController'*/
			})

			// url will be /form/model-preview
			.state('addQualificationModel.part5', {
				url: '/model-preview1',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part5.html'
			})

			// url will be /form/quantitative
			.state('addQualificationModel.part6', {
				url: '/groups-of-variables2',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part2.html'
			})

			// url will be /form/quantitative
			.state('addQualificationModel.part7', {
				url: '/variables2',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part3.html'/*,
				controller : 'formVarController'*/
			})

			// url will be /form/values
			.state('addQualificationModel.part8', {
				url: '/values2',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part4.html'/*,
				controller : 'formValController'*/
			})

			.state('addQualificationModel.part9', {
				url: '/model-preview2',
				templateUrl: 'app/components/qualificationModel/qualificationModel-new/parts/part5.html'
			})

		.state('updateQualificationModel', {
			url: '/update-qualification-model',
			templateUrl: 'modules/qualificationModel/updateModels.html',
			controller : 'UpdateModelController'
		})
			.state('updateQualificationModel.list', {
				url: '/list-of-models',
				templateUrl: 'modules/qualificationModel/views/list-of-models.html'
			})

			/*.state('updateQualificationModel.general-info', {
				url: '/update-general-info',
				templateUrl: 'modules/qualificationModel/views/general-info.html'
			})*/

			.state('updateQualificationModel.cuantitative', {
				url: '/cuantitative-analisis',
				templateUrl: 'modules/qualificationModel/views/analisis.html'
			})

			.state('updateQualificationModel.cualitative', {
				url: '/cualitative-analisis',
				templateUrl: 'modules/qualificationModel/views/analisis.html'
			});
		// catch all route
    	// send users to the form page

		// quit the # character in urls
		//$locationProvider.html5Mode(true);
}]);
