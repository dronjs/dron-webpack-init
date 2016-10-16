
function addLessCss(props) {

  this.draft.loaders.css.loader.push('less');
  this.draft.devDependencies = this.draft.devDependencies.concat(['less','less-loader']);

  return true;
}

module.exports = addLessCss;
