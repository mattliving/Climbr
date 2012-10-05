# The model representing a user 
define ["jquery", 
        "underscore", 
        "backbone"]
        , ($, _, Backbone) ->
  
  class User extends Backbone.Model
    defaults:
      _id: null
      email: ""
      facebookId: ""
      googleId: ""
      names:
        first: ""
        last: ""
        full: ""
      picture: ""
      areas: []
      routes: []
      friends: []
      loc: [null, null]
      authenticated: false

    initialize: ->

    gAuth: ->

    clear: ->
      @destroy()

  User
