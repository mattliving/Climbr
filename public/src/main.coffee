# Set the require.js configuration for your application.
require.config
  baseURL: "../"
  shim:
    underscore:
      exports: "_"

    backbone:
      deps: ["underscore", "jquery"]
      exports: "Backbone"

  paths:
    async: "../require/async"
    propertyParser: "../require/propertyParser"
    goog: "../require/goog"
    underscore: "../underscore/underscore-min"
    backbone: "../backbone/backbone-min"
    text: "../require/text"
    bootstrap: "../bootstrap/bootstrap-min"
    jqueryui: "../jquery/jqueryui-1.8.23/jqueryui"
    google: "../maps/google"

require ["backbone", "views/app"], (Backbone, AppView) ->

  Backbone.View::dispatcher = _.extend({}, Backbone.Events)
  Backbone.View::close = ->
    @clear() if @clear
    @remove()
    @unbind()

  App = new AppView()

