# "async!http://connect.facebook.net/en_US/all.js_unnormalized2" 
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
      name: ""
      picture: ""
      areas: []
      routes: []
      friends: []
      loc: [null, null]

    initialize: ->
      #@fbAuth()

    fbAuth: ->
      FB.getLoginStatus (res) ->
      if res.status is "connected"  
        # the user is logged in and has authenticated your
        # app, and res.authres supplies
        # the user's ID, a valid access token, a signed
        # request, and the time the access token 
        # and signed request each expire
        uid = res.authResponse.userID
        accessToken = res.authResponse.accessToken
      else if res.status is "not_authorized"
        FB.login (response) ->
          if response.authResponse
            console.log "Welcome!  Fetching your information.... "
            FB.api "/me", (response) ->
              console.log "Good to see you, " + response.name + "."

          else
            console.log "User cancelled login or did not fully authorize."

      else 
        FB.login (response) ->
        if response.authResponse
          console.log "Welcome!  Fetching your information.... "
          FB.api "/me", (response) ->
            console.log "Good to see you, " + response.name + "."

        else
          console.log "User cancelled login or did not fully authorize."

    gAuth: ->

    clear: ->
      @destroy()

  User
