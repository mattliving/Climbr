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

  ((d) ->
    id = "facebook-jssdk"
    ref = d.getElementsByTagName("script")[0]
    return if d.getElementById(id)
    js = d.createElement("script")
    js.id = id
    js.async = true
    js.src = "//connect.facebook.net/en_US/all.js"
    ref.parentNode.insertBefore js, ref
  ) document

  window.fbAsyncInit = ->
    FB.init
      appId      : "507951649218545" # App ID
      status     : true # check login status
      cookie     : true # enable cookies to allow the server to access the session
      xfbml      : true # parse XFBML

  Backbone.View::dispatcher = _.extend({}, Backbone.Events)

  App = new AppView()

