var sower = require('./installers/webpack.js');
var reaper = require('./installers/reaper.js');
/**
 Dron module `dron-webpack-init`*
*/
function install(props) {
	return this.run(sower, props)
	.then(function(test) {
		return reaper;
	}.bind(this));
}

function argsToProps(args) {

	var props = {};
	/* Only webpack.config.js */
	if (args.configOnly) {
		props.setupNpm = false;
		props.setupEnv = false;
	}
	return props;
}

argsToProps.defaultProps = {
	configOnly: false
}

module.exports = function factory(argv) {
	return this.run(install, argsToProps(argv));
}
