(function() {
	"use strict";

	angular
		.module('tb')
		.config(['$routeProvider', config]);

	function config($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/home.html'})
			.otherwise({
				redirectTo: '/'	
			});
	}
})();