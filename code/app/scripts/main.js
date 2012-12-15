require.config({
  shim: {
  },

  paths: {
    signals: 'vendor/signals.min',
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app', 'signals'], 
        function(app, signals) {

    app.init();
});
