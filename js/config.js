(function() {
	"use strict";

	function config($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/home.html'})
			.otherwise({
				redirectTo: '/'	
			});
	}

	function attachFastclick() {
		FastClick.attach(document.body);
	}

	angular
		.module('tb')
		.config(['$routeProvider', config])
		.run(attachFastclick);
}());