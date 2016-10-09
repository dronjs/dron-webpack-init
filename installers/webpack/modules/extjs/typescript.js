function typescript() {
  this.draft.devDependencies = this.draft.devDependencies.concat(['ts-loader','typescript']);
  this.draft.loaders.typescript = { test: /\.tsx?$/, loader: 'ts-loader' };
  this.draft.extensions = this.draft.extensions.concat(['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']);
  this.draft.postTasks.push(function() {
    return this.touch('tsconfig.json').safeWrite(JSON.stringify({
      "compilerOptions": {
        "target": "es5",
        "sourceMap": true
      },
      "exclude": [
        "node_modules"
      ]
    }, null, 2));
  });
  return true;
}

module.exports = typescript;
