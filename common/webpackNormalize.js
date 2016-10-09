var path = require('path');
module.exports = function(fp) {
  if (fp.charAt(0)!==path.sep&&fp.charAt(0)!=='.') {
    fp = '.'+path.sep+fp;
  }
  return fp;
}
