module.exports = function(isInjectCss) {
  function addStyleLoader(props) {
    this.draft.devDependencies = this.draft.devDependencies.concat(['style-loader', 'extract-text-webpack-plugin']);


    if (!isInjectCss) {
      this.draft.initial.push('var ExtractTextPlugin = require("extract-text-webpack-plugin");');
      this.draft.plugins.push(function() {
        new ExtractTextPlugin("[name].css")
      });
      this.draft.preTasks.push(function() {
        this.draft.loaders.css.loader = new Function("ExtractTextPlugin.extract(\"style\",\""+this.draft.loaders.css.loader.join('!')+"\")");
        return true;
      });
    } else {
      this.draft.loaders.css.loader.push('style');
    }

    return true;
  }

  return addStyleLoader;
}
