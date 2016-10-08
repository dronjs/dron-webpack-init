function webPackInstaller(props) {
	this.draft = {
		webpackConfFileName: props.filename,
		devDependencies: new this.UniqArray(),
		dependencies: new this.UniqArray(),
		initial: [],
		entry: '',
		output: {
			path: '',
			filename: ''
		},
		loaders: {},
		plugins: [],
		extends: {}
	};

	//if (~props.mode.indexOf('simple')) return require('./webpack/simple.js');
	if (props.mode.includes('complex')) return require('./webpack/complex.js');
}

webPackInstaller.prompt = [
	{
		name: 'mode',
		type: 'list',
		message: 'Select installation mode',
		default: 'complex',
		choices: ['complex']
	},
	{
		name: "filename",
		message: "Webpack file name"
		type: "input",
		default: "webpack.config.js"
	}
];

module.exports = webPackInstaller;
