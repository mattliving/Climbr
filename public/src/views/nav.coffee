define ["jquery", 
        "underscore", 
        "backbone", 
        "models/user",
        "views/baseview",
        "text!templates/mainNav.html", 
        "text!templates/subNav.html",
        "text!templates/signup.html",
        "text!templates/login.html", 
        "bootstrap", 
        "jqueryui/slider"]
        , ($, _, Backbone, User, BaseView, mainNav, subNav, signup, login) ->
  class NavView extends BaseView

    el: $("body")

    grades: ["3", "4", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+"]

    mainNavTemplate: _.template(mainNav)
    subNavTemplate: _.template(subNav)
    signupTemplate: _.template(signup)
    loginTemplate: _.template(login)

    events:
      "click #styleDropdown a" : "toggleActive"
      "submit #searchField"       : "triggerSearch"
      "click #searchBtn"          : "triggerSearch"
      "click #loginFacebook"      : "loginFacebook"

    initialize: ->
      @user = new User()
      @dispatcher.on "update:user", @update, @
      @render()
      @mainNav = $("#mainNav")
      @searchField = $("#searchField")
      
      # Twitter Bootstrap init 
      $(".dropdown-toggle").dropdown()
      @initTypeahead()
      
      # jQuery UI slider init 
      $("#slider-range").slider
        range: true
        min: 0
        step: 30
        max: 780
        values: [0, 780]
        slide: (event, ui) =>
          $("#gradeLabel .label.label-important").text @calcGrade(ui.values[0]) + " - " + @calcGrade(ui.values[1])

      $("#gradeLabel .label.label-important").text "3 - 9b+"

    initTypeahead: ->
      $.ajax
        url: "/api/typeahead"
        type: "get"
        success: (data) ->
          $("#searchField").typeahead source: data

    render: ->
      @$el.append @mainNavTemplate(@user.toJSON())
      @$el.append @subNavTemplate
      @$el.append @signupTemplate
      @$el.append @loginTemplate
      this

    update: ->
      @mainNav.replaceWith @mainNavTemplate(@user.toJSON())
      $(".dropdown-toggle").dropdown()

    toggleActive: (e) ->
      $this = $(e.currentTarget)
      unless $this.hasClass("active")
        $this.addClass "active"
        $this.html "<i class='icon-ok'></i>" + $this.text()
      else
        $this.removeClass "active"
        $this.html $this.text()

    triggerSearch: (e) ->
      e.preventDefault()
      @dispatcher.trigger "submit:search", @searchField.val()

    calcGrade: (value) ->
      @grades[26 - (780 - value) / 30]

    loginFacebook: ->
      @initFB()
      @loadFB(document)

    initFB: ->
      @user.set('authenticated', true)
      window.fbAsyncInit = =>
        FB.init
          appId      : "507951649218545" # App ID
          status     : true # check login status
          cookie     : true # enable cookies to allow the server to access the session
          xfbml      : true # parse XFBML

        FB.getLoginStatus (res) =>
          if res.status is "connected"  
            uid = res.authResponse.userID
            accessToken = res.authResponse.accessToken
            FB.api "/me", (res) => 
              names = 
                first: res.first_name
                last: res.last_name
                full: res.name
              @user.set('names', names)
              FB.api "/me&fields=picture", (res) => 
                @user.set('picture', res.picture.data.url)
                FB.api "/me/friends", (res) =>
                  @user.set('friends', res.data)
                  @dispatcher.trigger "update:user"
                  console.log @user.friends
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

  NavView
