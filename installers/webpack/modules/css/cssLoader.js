module.exports = function addCssLoader(isAviable) {
  function cssLoader(props) {
    if (isAviable) {
      if (~props.assetsLoaders.indexOf('images')) {
        this.draft.devDependencies = this.draft.devDependencies.concat(['file-loader']);
        this.draft.loaders.images = { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'file?name=[path][name].[ext]' };
      }

      if (~props.assetsLoaders.indexOf('fonts')) {
        this.draft.devDependencies = this.draft.devDependencies.concat(['url-loader', 'file-loader']);
        this.draft.loaders.woff = { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=999999' };
        this.draft.loaders.ttf = { test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' };
      }

      this.draft.devDependencies.push('css-loader');
      this.draft.loaders.css.loader.push('css');
      return true;
    } else {
      this.draft.devDependencies.push('raw-loader');
      this.draft.loaders.css.loader.push('raw');
      return true;
    }
  }

  cssLoader.prompt = function() {
    return isAviable ? [
      {
        name: "assetsLoaders",
        type: "checkbox",
        message: "Select CSS assets loaders",
        choices: [
          {
            name: "Load images",
            value: "images",
            checked: true
          },
          {
            name: "Load fonts",
            value: "fonts",
            checked: true
          }
        ]
      }
    ] : [];
  }

  return cssLoader;
}
