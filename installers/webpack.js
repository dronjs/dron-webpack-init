function webPackInstaller(props) {
	this.draft = {
		webpackConfFileName: props.filename,
		devDependencies: new this.UniqArray(),
		dependencies: new this.UniqArray(),
		extensions: new this.UniqArray(),
		initial: [
			"var path = require(\"path\");"
		],
		entry: {},
		output: {
			path: '',
	    filename: "[name].js",
	    libraryTarget: 'umd',
	    library: 'app'
		},
		loaders: {},
		plugins: new this.UniqArray(),
		extends: {},
		postTasks: [],
		preTasks: [],
		package: {},
		isDevServer: props.isDevServer
	};

	this.draft.devDependencies = this.draft.devDependencies.concat(['webpack']);
	/**
	 * Setup dev server
	 */
	if (props.isDevServer) {
		this.draft.devDependencies = this.draft.devDependencies.concat(['webpack-dev-server']);
	}

	return this.run('ensurePackage')
	.then(function(packageJson) {
		if (!packageJson) {
			this.log('We continue without package.json');
		} else {
			this.draft.package = packageJson;
		}
		return require('./webpack/entry.js');
	}.bind(this));
}

webPackInstaller.prompt = [
	// {
	// 	name: 'mode',
	// 	type: 'list',
	// 	message: 'Select installation mode',
	// 	default: 'complex',
	// 	choices: ['complex']
	// },
	{
		name: "filename",
		message: "Webpack file name",
		type: "input",
		default: "webpack.config.js"
	},
	{
		name: "isDevServer",
		message: 'Do you plan to use the Webpack development server?',
		type: 'confirm',
		default: true
	}
];

module.exports = webPackInstaller;
