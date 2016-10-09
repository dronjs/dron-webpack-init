function complexInstaller(props) {
	return props.modules.map(function(name) {
		return require('./modules/'+name+'.js');
	});
}

complexInstaller.prompt = [
	{
		name: 'modules',
		message: 'Select technologue stack of your project',
		type: 'checkbox',
		choices: [
			{
				name: 'Css',
				value: 'css'
			},
			{
				name: 'Javascript extensions',
				value: 'extjs'
			}
		],
		default: []
	}
];

module.exports = complexInstaller;
