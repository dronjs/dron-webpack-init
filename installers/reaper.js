var stringifyObject = require('./../../stringify-object/index.js');
var install = require('./install.js');

function reaper() {
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
    output: this.draft.output,
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
     funcInnerCode: true
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
}

module.exports = reaper;
