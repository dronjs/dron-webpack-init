var stringifyObject = require('stringify-object-extract-functions');
var install = require('./install.js');

function validateOutput(output) {
  var customOutput = Object.assign({}, output);
  if (customOutput.publicPath.substr(0,1)=='.'&&customOutput.publicPath.substr(1,1)!=='.') customOutput.publicPath = customOutput.publicPath.substr(1);
  return customOutput;
}

function reaper() {
  return (this.draft.preTasks.length>0 ? this.run(this.draft.preTasks) : Promise.resolve(true))
  .then(function() {
    var file = [];
    /**
     * Insert initial strings
     */
    file = file.concat(this.draft.initial);
    /**
     * Webpack configuration Object
     */
     var webpack = {
      entry: this.draft.entry,
      output: validateOutput(this.draft.output),
      module: {
        loaders: this._.values(this.draft.loaders).map(function(loader) {
          return Object.assign(loader, {
            loader: loader.loader instanceof Array ? loader.loader.join('!') : loader.loader
          });
        })
      },
      plugins: Array.from(this.draft.plugins),
      extensions: []
     };
     // Extensions
     if (this.draft.extensions.length>0) {
       webpack.extensions = webpack.extensions.concat(Array.from(this.draft.extensions));
     }

     // Extenders
     Object.assign(webpack, this.draft.extends);
     // Render
     file.push('module.exports = '+stringifyObject(webpack, {
       extractFunctions: true
     })+';');

     return this.touch(this.draft.webpackConfFileName)
     .safeWrite(file.join("\n"))
     .then(function() {
       if (this.touch(this.draft.webpackConfFileName).exists()) {
         this.log(this.draft.webpackConfFileName+' successfully created');
       } else {
         this.warn('Something went wrong. File '+this.draft.webpackConfFileName+' is not createdю');
         return null;
       }
       /**
        * Executes postTasks
        */
       if (this.draft.postTasks.length>0) {
         return this.run(this.draft.postTasks);
       } else {
         return true;
       }
     }.bind(this))
     .then(function() {
       return install;
     }.bind(this));
  }.bind(this));
}

module.exports = reaper;
