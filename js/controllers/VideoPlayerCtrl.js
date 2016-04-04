(function () {
	"use strict";

	function VideoPlayerCtrl() {
		var ctrl = this;

		ctrl.test = null;

	}

	angular
		.module('tb')
		.controller('VideoPlayerCtrl', [VideoPlayerCtrl]);
}());