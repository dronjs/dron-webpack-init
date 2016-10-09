function addExtendedCss(props) {
  return props.processor ? require('./cssProcessors/'+props.processor+'.js'): true;
}

addExtendedCss.prompt = [
  {
    name: "processor",
    message: "Which CSS processor?",
    type: "list",
    required: true,
    choices: [
      {
        name: 'PostCSS',
        value: 'postcss'
      },
			{
				name: 'Less',
				value: 'less'
			},
			{
				name: 'Sass',
				value: 'sass'
			},
      {
        name: 'None',
        value: false
      }
		]
  }
]

module.exports = function(isAviable) {
  return isAviable ? addExtendedCss : false;
}
