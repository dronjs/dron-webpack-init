module.exports = function addCssLoader() {
  console.log('addCssLoader initial');
  this.draft.devDependencies.push('css-loader');
  this.draft.loaders.css.loader.push('css');
  return true;
}
