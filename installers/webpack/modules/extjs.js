function jsModules(props) {
	return props.processor.map(function(proc) {
		return require('./extjs/'+proc+'.js');
	});
}

jsModules.prompt = [
  {
    name: "processor",
    message: "Which Javascript processor?",
    type: "checkbox",
    required: true,
    choices: [
      {
        name: 'Babel',
        value: 'babel'
      },
			{
				name: 'TypeScript',
				value: 'typescript'
			},
			{
				name: 'CoffeeScript',
				value: 'coffee'
			}
		]
  }
];

module.exports = jsModules;
