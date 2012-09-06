// Set the require.js configuration for your application.
require.config({

  baseURL: '../',

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  },

  paths: {

    async: 'libs/require/async',
    underscore: "libs/underscore/underscore-min",
    backbone: "libs/backbone/backbone-min",
    text: "libs/require/text",
    bootstrap: "libs/bootstrap/bootstrap-min",
    jqueryui: "libs/jqueryui",
    google: "libs/maps/google"
  }

});

require(['backbone', 'views/app'], function(Backbone, AppView) {
  Backbone.View.prototype.dispatcher = _.extend({}, Backbone.Events);
  var App = new AppView();
});