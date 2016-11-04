var path = require('path');
var dasherize = require('dasherize');
var webpackNormalize = require('./../../common/webpackNormalize.js');
function filepaths(props) {
  if (!props.entry) {
    return require('./filepaths.js');
  }
  var entry = path.parse(props.entry);
  var name = entry.name, i = 0;
  while (this.draft.entry.hasOwnProperty(name)) {
    i++;
    name = entry.name+'_'+i;
  }
  this.draft.entry[name] = webpackNormalize(props.entry);
  /**
   * Post task to create entry points
   */
  if (this.draft.setupEnv) {
    this.draft.postTasks.push(function() {
        if (!this.touch(props.entry).exists()) {
          this.touch(props.entry).write('');
        }
        return true;
    });
  }
  if (!props.hasOwnProperty('moreEntry')||props.moreEntry) {
    return filepaths;
  } else {
    return require('./filepaths.js');
  }
}

filepaths.prompt = function() {
  return Object.keys(this.draft.entry).length===0 ? [
    {
      type: "input",
      name: "entry",
      message: "Entry point",
      default: this.draft.package.main || './index.js',
      validate: function(value) {
        return value=='' ? 'Entry can`t be empty' : true;
      }.bind(this)
    }
  ] : [
    {
      type: 'confirm',
      name: 'moreEntry',
      message: 'More entry?',
      default: Object.keys(this.draft.entry).length>1 ? true : false,
      when: function() {
        return Object.keys(this.draft.entry).length<=1;
      }.bind(this)
    },
    {
      type: "input",
      name: "entry",
      message: "Next entry point",
      default: '',//path.dirname(this.draft.entry[Object.keys(this.draft.entry)[0]])
      when: function(answers) {
          return answers.moreEntry;
      },
      validate: function(value) {
        if (this._.find(this.draft.entry, function(path) {
            return value == path;
        })) {
          return 'Write another entry point';
        } else {
          return true;
        }
      }.bind(this)
    }
  ]
};

module.exports = filepaths;
