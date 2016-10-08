var webpack = require('./installers/webpack.js');
/**
 Dron module `dron-webpack-init`*
*/
function dronWebpackInit() {
}

module.exports = function factory(argv) {
	return this.run(webpack)
	.then(function(test) {
		console.log('READY', this.draft);
		return null;
	}.bind(this));
}
