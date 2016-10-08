module.exports = function addStyleLoader() {
  console.log('styleLoader initial');
  this.draft.devDependencies.push('style-loader');
  this.draft.loaders.css.loader.push('style');
  return true;
}
