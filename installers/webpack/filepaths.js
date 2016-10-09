var path = require('path');
var dasherize = require('dasherize');
var indexHtmlTemplatePath = require.resolve('./templates/index.html');
function filepaths(props) {
  /**
   * Output
   */
  var outputFile = this.touch(props.output).resolve();
  this.draft.output.path = new Function("path.resolve(\"./"+path.relative(this.touch('.').resolve(), path.dirname(outputFile))+"\")");
  this.draft.output.filename = path.basename(outputFile);
  if (this.draft.package.name) {
    this.draft.output.library = dasherize(this.draft.package.name);
  }
  this.draft.output.libraryTarget = props.libraryTarget;
  /**
   * Public path
   */
  if (this.draft.isDevServer) {
    this.draft.output.publicPath = props.publicPath;

    this.draft.postTasks.push(function() {
      var indexHtml = this.touch(path.join(props.publicPath, 'index.html'));
      if (!indexHtml.exists()) {
        indexHtml.write(this.touch(indexHtmlTemplatePath).ejs(this.draft));
      }
      return true;
    });
  }
  return require('./complex.js');
}

filepaths.prompt = function() {
  return [
    {
      type: "input",
      name: "output",
      message: "Output file",
      default: './dist/[name].js'
    },
    {
      type: 'list',
      name: 'libraryTarget',
      message: 'Library target',
      default: 'var',
      choices: [
        {
          name: 'Var',
          value: 'var'
        },
        {
          name: 'AMD',
          value: 'amd'
        },
        {
          name: 'CommonJs',
          value: 'commonjs'
        },
        {
          name: 'CommonJs2',
          value: 'commonjs2'
        },
        {
          name: 'This',
          value: 'this'
        }
      ]
    },
    {
      name: "publicPath",
      type: "input",
      message: "Enter public path",
      default: "./",
      when: function() {
        return this.draft.isDevServer;
      }.bind(this)
    }
  ]
};

module.exports = filepaths;
