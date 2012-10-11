var requirejsConfig = {
  paths: {
    jquery:    'lib/jquery-1.6.1.min',
    gatesGame: 'lib/gatesGame'
  },

  shim: {
    'jquery': {
      exports: 'jQuery',
      init: function () {
        return this.window.jQuery.noConflict();
      }
    }
  }
};
if (typeof module === 'object' && typeof require === 'function') {
  module.exports = requirejsConfig;
} else {
  require.config(requirejsConfig);
}
