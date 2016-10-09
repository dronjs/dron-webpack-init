function cssModules(props) {
	this.draft.loaders.css = {
		test: /\.css$/,
		loader: []
	};

	return this._.map(props, function(value, name) {
		return require('./css/'+name+'.js')(value);
	});
}

cssModules.prompt = [
	{
		type: 'confirm',
		name: 'styleLoader',
		message: 'Insert CSS into the page by javascript?',
		required: true
	},
	{
		type: 'confirm',
		name: 'cssLoader',
		message: 'Parse CSS with css-loader?',
		required: true
	},
	{
		type: 'confirm',
		name: 'extendedCss',
		message: 'Use CSS processors?',
		required: false
	}
];

module.exports = cssModules;
