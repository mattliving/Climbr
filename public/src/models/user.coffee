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
      @initFB()
      @loadFB(document)

    initFB: ->
      window.fbAsyncInit = ->
        FB.init
          appId      : "507951649218545" # App ID
          status     : true # check login status
          cookie     : true # enable cookies to allow the server to access the session
          xfbml      : true # parse XFBML

        FB.getLoginStatus (res) ->
          console.log res.status
          if res.status is "connected"  
            uid = res.authResponse.userID
            accessToken = res.authResponse.accessToken
            FB.api "/me", (res) ->
              console.log res.name
          else if res.status is "not_authorized"
            FB.login (res) ->
              if res.authResponse
                FB.api "/me", (res) ->
                  console.log "Good to see you, " + res.name + "."
              else
                console.log "User cancelled login or did not fully authorize."
          else 
            FB.login (res) ->
            if res.authResponse
              FB.api "/me", (res) ->
                console.log "Good to see you, " + res.name + "."
            else
              console.log "User cancelled login or did not fully authorize."
    loadFB: (d) ->
      id = "facebook-jssdk"
      ref = d.getElementsByTagName("script")[0]
      return if d.getElementById(id)
      js = d.createElement("script")
      js.id = id
      js.async = true
      js.src = "//connect.facebook.net/en_US/all.js"
      ref.parentNode.insertBefore js, ref

    gAuth: ->

    clear: ->
      @destroy()

  User
