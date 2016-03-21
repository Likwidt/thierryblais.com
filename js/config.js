(function() {
	"use strict";

	function config($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/home.html'})
			.otherwise({
				redirectTo: '/'	
			});
	}

	angular
		.module('tb')
		.config(['$routeProvider', config]);
}());