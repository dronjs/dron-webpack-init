function babel(props) {
  /**
   * Adds presets to dev dependencies
   */
  this.draft.devDependencies = this.draft.devDependencies.concat(['babel-loader'])
  .concat(props.presets.map(function(v) {
    return 'babel-preset-'+v
  }))
  .concat(props.plugins.map(function(v) {
    return 'babel-plugin-'+v
  }));

  /**
   * Initial babel loader
   */
  this.draft.loaders.babel = {
    test: /\.js[x]?$/,
    loader: "babel-loader",
    query: {
      compact: false,
      presets: [],
      plugins: []
    }
  };
  /**
   * Exclude node modules
   */
  if (props.excludeNodeModules) {
    this.draft.loaders.babel.exclude = /node_modules/;
  }
  /**
   * Add presets
   */
  this.draft.loaders.babel.query.presets = props.presets.map(function(v) {
    return new Function("require.resolve('babel-preset-"+v+"')");
  });
  /**
   * Add plugins
   */
   this.draft.loaders.babel.query.plugins = props.plugins.map(function(v) {
     return new Function("require.resolve('babel-plugin-"+v+"')");
   });

  return true;
}

babel.prompt = [

  {
    name: 'presets',
    message: 'Select presets',
    type: 'checkbox',
    default: ['es2015'],
    choices: [
      {
        name: 'es2015',
        value: 'es2015',
        checked: true
      },
      {
        name: 'stage-0',
        value: 'stage-0',
        checked: false
      },
      {
        name: 'stage-1',
        value: 'stage-1',
        checked: false
      },
      {
        name: 'stage-2',
        value: 'stage-2',
        checked: false
      },
      {
        name: 'stage-3',
        value: 'stage-3',
        checked: false
      }
    ]
  },
  {
    name: 'plugins',
    message: 'Select plugins',
    type: 'checkbox',
    default: [],
    choices: [
      {
        name: 'Jsx',
        value: 'transform-react-jsx',
        checked: false
      },
      {
        name: 'Add module exports',
        value: 'add-module-exports',
        checked: true
      }
    ]
  },
  {
    name: 'excludeNodeModules',
    message: 'Exclude node_modules?',
    default: true
  }
];

module.exports = babel;
