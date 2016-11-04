var test = require('./test');

function install(props) {
  if (props.npminstall) {
    return this.run('installNpmPackages', {
      dependencies: Array.from(this.draft.dependencies),
      devDependencies: Array.from(this.draft.devDependencies),
      save: true
    })
    .then(function() {
      return true;
    });
  } else {
    return true;
  }
}

install.prompt = function() {
  if (this.draft.setupNpm) {
    this.log('Webpack requires next dependecies:');
    this.log(Array.from(this.draft.dependencies).concat(Array.from(this.draft.devDependencies)).join(', '));
  }
  return [
    {
      name: 'npminstall',
      type: 'confirm',
      message: 'Install npm dependecies?',
      default: true,
      when: function() {
        return Boolean(this.draft.setupNpm);
      }.bind(this)
    }
  ]
}

module.exports = install;
