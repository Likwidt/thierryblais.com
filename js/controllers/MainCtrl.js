(function () {
	"use strict";

	function MainCtrl() {
		var ctrl = this;

		ctrl.footerLinks = [
			{name: 'LinkedIn', icon: 'ion-social-linkedin', url: 'https://ca.linkedin.com/in/thierry-blais-93142323'},
			{name: 'Twitter', icon: 'ion-social-twitter', url: 'https://twitter.com/thierryblais'},
			{name: 'GitHub', icon: 'ion-social-github', url: 'https://github.com/Likwidt'}
		];
	}

	angular
		.module('tb')
		.controller('MainCtrl', [MainCtrl]);
}());