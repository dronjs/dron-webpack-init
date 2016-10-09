function coffee() {
  this.draft.devDependencies = this.draft.devDependencies.concat(['coffee-loader']);
  this.draft.loaders.coffee = { test: /\.coffee$/, loader: "coffee-loader" };
  this.draft.loaders.coffemd = { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" };
  return true;
}

module.exports = coffee;
