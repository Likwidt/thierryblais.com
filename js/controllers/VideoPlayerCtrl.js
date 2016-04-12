(function () {
	"use strict";

	function VideoPlayerCtrl($location) {
		var ctrl = this;

		var slides = [
			{ timeIndex: 5, slideUrl: 'http://image.shutterstock.com/z/stock-photo-iceberg-lake-glacier-national-park-mt-291963866.jpg' },
			{ timeIndex: 15, slideUrl: 'http://image.shutterstock.com/z/stock-photo-hidden-lake-trail-logan-pass-glacier-national-park-montana-united-states-291963893.jpg' },
			{ timeIndex: 30, slideUrl: 'http://image.shutterstock.com/z/stock-photo-norway-mountain-landscape-with-famous-troll-road-trollstigen-rauma-municipality-in-romdal-93626320.jpg' },
			{ timeIndex: 9999, slideUrl: '' }
		];



		ctrl.videoObject = { videoFileName: 'http://ak9.picdn.net/shutterstock/videos/13977539/preview/stock-footage-aerial-austria-reutte-ruin-tyrol-austria.mp4', slides: slides };

		ctrl.getOut = function() {
			$location.path('/');
		};

	}

	angular
		.module('tb')
		.controller('VideoPlayerCtrl', ['$location', VideoPlayerCtrl]);
}());