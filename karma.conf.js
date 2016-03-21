module.exports = function(config) {
	config.set({
		browsers: ['Chrome'],
		frameworks: ['jasmine'],
		files: [
			'bower_components/angular/angular.min.js',
			'js/*.js',
			'js/**/*.js',
			'test/**/*.spec.js'
		]
	});
};