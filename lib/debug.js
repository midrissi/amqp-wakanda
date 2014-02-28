'use strict';

var DEBUG = false;

// only define debug function in debugging mode
if (DEBUG) {
  module.exports = function debug () {
    console.error.apply(null, arguments);
  };
} else {
  module.exports = null;
}

