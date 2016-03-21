module.exports = function(config) {
	config.set({
		browsers: ['Chrome'],
		frameworks: ['jasmine'],
		files: [
			'bower_components/angular/angular.min.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'js/*.js',
			'js/**/*.js',
			'test/**/*.spec.js'
		],
		reporters: ['spec']
	});
};