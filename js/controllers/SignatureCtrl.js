(function () {
	"use strict";

	function SignatureCtrl() {
		var ctrl = this;

		ctrl.signature;

	}

	function tbResize($window) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				var elem = element[0];

				$window.onresize = resizeCanvas;

				function resizeCanvas(e){
					var parent = elem.parentNode;

					elem.setAttribute('width', parent.scrollWidth);
					elem.setAttribute('height', parent.scrollHeight);
				}
			}
		};
	}

	angular
		.module('tb')
		.controller('SignatureCtrl', [SignatureCtrl])
		.directive('tbResize', ['$window', tbResize]);
}());