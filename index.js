var sower = require('./installers/webpack.js');
var reaper = require('./installers/reaper.js');
/**
 Dron module `dron-webpack-init`*
*/
function install() {
	return this.run(sower)
	.then(function(test) {
		return reaper;
	}.bind(this));
}

module.exports = function factory(argv) {
	return install;
}
