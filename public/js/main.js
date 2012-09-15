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
    propertyParser: 'libs/require/propertyParser',
    goog: 'libs/require/goog',
    underscore: "libs/underscore/underscore-min",
    backbone: "libs/backbone/backbone-min",
    text: "libs/require/text",
    bootstrap: "libs/bootstrap/bootstrap-min",
    jqueryui: "libs/jquery/jqueryui-1.8.23/jqueryui",
    google: "libs/maps/google"
  }

});

require(['backbone', 'views/app'], function(Backbone, AppView) {
  Backbone.View.prototype.dispatcher = _.extend({}, Backbone.Events);
  Backbone.View.prototype.close = function() {
    if (this.clear) {
        this.clear();
    }
    this.remove();
    this.unbind();
  };

  var App = new AppView();
});