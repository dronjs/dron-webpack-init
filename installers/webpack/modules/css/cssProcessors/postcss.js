
function addPostCss(props) {

  this.draft.loaders.css.loader.push('postcss');

  this.draft.devDependencies = this.draft.devDependencies.concat(['postcss-loader']);
  var variableArray = [];
  props.plugins.forEach(function(plugin) {
    var preset = require('./plugins/'+plugin+'.js');
    if (preset.devDependencies) {
      this.draft.devDependencies = this.draft.devDependencies.concat(preset.devDependencies);
    }
    if (preset.dependencies) {
      this.draft.dependencies = this.draft.dependecies.concat(preset.dependencies);
    }
    if (preset.initial) {
      this.draft.initial.push(preset.initial);
    }
    if (preset.variable) {
      variableArray.push(preset.variable);
    }
  }.bind(this));

  this.draft.extends.postcss = new Function("function postcssPlugins() { return ["+variableArray.join(', ')+"]; }");
  return true;
}

addPostCss.prompt = [
  {
    name: "plugins",
    message: "Select PostCss plugins",
    type: "checkbox",
    choices: [
      {
        name: "Import",
        value: "postcss-import",
        checked: true
      },
      {
        name: "Autoprefixer",
        value: "autoprefixer",
        checked: true
      },
      {
        name: "Nested",
        value: "postcss-nested",
        checked: true
      }
    ]
  }
]

module.exports = addPostCss;
