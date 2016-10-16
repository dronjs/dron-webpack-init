
function addSassCss(props) {

  this.draft.loaders.css.loader.push('sass');
  this.draft.devDependencies = this.draft.devDependencies.concat(['sass-loader']);

  return true;
}

module.exports = addSassCss;
