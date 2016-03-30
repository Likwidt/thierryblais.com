(function () {
	"use strict";

	function HomeCtrl() {
		var ctrl = this;

		ctrl.clientList = [
			{name: 'Videotron', img: 'img/videotron.png', url: 'http://www.videotron.com/'},
			{name: 'BMC Software', img: 'img/bmc.png', url: 'http://www.bmc.com/it-solutions/truesight-operations-management.html'},
			{name: 'Air Transat', img: 'img/transat.png', url: 'http://www.airtransat.com/en-CA/Affinity/Engine#'},
			{name: 'Exo U', img: 'img/exou.png', url: 'http://www.exou.com/'},
			{name: 'STA Healthcare Communications', img: 'img/sta_logo.png', url: 'http://www.stacommunications.com/'},
			{name: 'Ark Media Group', img: 'img/arkmedia.png', url: 'http://www.arkmediagrp.com/work/st-josephs-community-foundation/generations-of-giving/'},
			{name: 'Palm Havas', img: 'img/palm.png', url: 'http://www.fondation-sainte-justine.org/en/'}
		];

	}

	angular
		.module('tb')
		.controller('HomeCtrl', [HomeCtrl]);
}());