module.exports = function(isInjectCss) {
  function addStyleLoader(props) {
    this.draft.devDependencies = this.draft.devDependencies.concat(['style-loader', 'extract-text-webpack-plugin']);
    this.draft.loaders.css.loader.push('style');

    if (!isInjectCss) {
      this.draft.initial.push('var ExtractTextPlugin = require("extract-text-webpack-plugin");');
      this.draft.plugins.push(function() {
        new ExtractTextPlugin("[name].css")
      });
    }

    return true;
  }

  return addStyleLoader;
}
