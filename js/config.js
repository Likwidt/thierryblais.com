(function() {
	"use strict";

	function config($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl', controllerAs: 'home'})
			.when('/signature', {templateUrl: 'partials/signature.html', controller: 'SignatureCtrl', controllerAs: 'sign'})
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