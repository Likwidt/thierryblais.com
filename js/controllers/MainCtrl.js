(function () {
	"use strict";

	function MainCtrl() {
		var ctrl = this;

		ctrl.footerLinks = [
			{name: 'LinkedIn', icon: 'ion-social-linkedin', url: 'https://ca.linkedin.com/in/thierry-blais-93142323'},
			{name: 'Twitter', icon: 'ion-social-twitter', url: 'https://twitter.com/thierryblais'},
			{name: 'GitHub', icon: 'ion-social-github', url: 'https://github.com/Likwidt?tab=repositories'}
		];

		console.info(
			"%cHi!\n\nThanks for visiting, all sources to this site are available at " +
			"%chttps://github.com/Likwidt" + 
			"%c.\n\nEnjoy!", 
			"font-size: 16px;",
			"font-size: 16px; color: blue; text-decoration: underline;",
			"font-size: 16px;"
		);
	}

	angular
		.module('tb')
		.controller('MainCtrl', [MainCtrl]);
}());