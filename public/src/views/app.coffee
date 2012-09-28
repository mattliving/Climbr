define ["jquery", 
        "underscore", 
        "backbone", 
        "models/user",
        "views/baseview", 
        "views/nav", "views/sidebar", "views/map", "views/friends"]
        , ($, _, Backbone, User, BaseView, NavView, SidebarView, MapView, FriendsView) ->
  class AppView extends BaseView
    el: $("body")

    initialize: ->
      @render()
      
      $(window).resize( ->
        h = $(".container-fluid").height()
        offsetTop = 80
        $("#map").css "height", (h - 90 - offsetTop)
        $("#sidebar").css "height", (h - offsetTop)
        $("#friends").css "height", 90
      ).resize()

    render: ->
      navView     = new NavView()
      sidebarView = new SidebarView()
      mapView     = new MapView()
      friendsView = new FriendsView()
      this
  AppView
