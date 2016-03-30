(function () {
	"use strict";

	function SignatureCtrl() {
		var ctrl = this;

		ctrl.signature = null;

	}

	function tbResize($window) {
		return {
			restrict: 'A',
			link: function resizeLink(scope, element) {
				var elem = element[0];

				$window.onresize = resizeCanvas;
				resizeCanvas();

				function resizeCanvas(){
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