function complexInstaller(props) {
	return props.modules.map(function(name) {
		return require('./modules/'+name+'.js');
	});
}

complexInstaller.prompt = [
	{
		name: 'modules',
		message: 'Selected technologue stack of your project',
		type: 'checkbox',
		choices: [
			{
				name: 'Css',
				value: 'css'
			},
			{
				name: 'Javascript syntax extensions',
				value: 'extendedjs'
			}
		],
		default: []
	}
];

module.exports = complexInstaller;
