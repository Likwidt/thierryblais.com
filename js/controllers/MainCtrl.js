(function () {
	"use strict";

	function MainCtrl() {
		var ctrl = this;

		ctrl.hello = 'Hi';


	}

	angular
		.module('tb')
		.controller('MainCtrl', [MainCtrl]);
}());