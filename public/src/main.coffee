# Set the require.js configuration for your application.
require.config
  baseURL: "src/js"
  shim:
    underscore:
      exports: "_"

    backbone:
      deps: ["underscore", "jquery"]
      exports: "Backbone"

  paths:
    async: "../../libs/require/async"
    propertyParser: "../../libs/require/propertyParser"
    goog: "../../libs/require/goog"
    underscore: "../../libs/underscore/underscore-min"
    backbone: "../../libs/backbone/backbone-min"
    text: "../../libs/require/text"
    bootstrap: "../../libs/bootstrap/bootstrap-min"
    jqueryui: "../../libs/jquery/jqueryui-1.8.23/jqueryui"
    google: "../../libs/maps/google" 

require ["backbone", "views/app"], (Backbone, AppView) ->

  Backbone.View::dispatcher = _.extend({}, Backbone.Events)

  App = new AppView()

