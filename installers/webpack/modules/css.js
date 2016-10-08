function cssModules(props) {
	this.draft.loaders.css = {
		test: /\.css$/,
		loader: []
	};
	return Object.keys(props).map(function(name) {
		return require('./modules/'+name+'.js');
	});
}

cssModules.prompt = [
	{
		type: 'confirm',
		name: 'styleLoader',
		message: 'Add CSS to the DOM by injecting?',
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
		message: 'Use CSS extensions?',
		required: true
	}
];

module.exports = cssModules;
