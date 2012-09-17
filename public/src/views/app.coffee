define ["jquery", 
        "underscore", 
        "backbone", 
        "views/baseview", 
        "views/nav", "views/sidebar", "views/map"]
        , ($, _, Backbone, BaseView, NavView, SidebarView, MapView) ->
  class AppView extends BaseView
    el: $("body")
    initialize: ->
      @render()
      
      $(window).resize(->
        h = $(".container-fluid").height()
        offsetTop = 80
        $("#map").css "height", (h - offsetTop)
        #$('#friends').css('height', (.1*h - offsetTop));
      ).resize()

    render: ->
      navView     = new NavView()
      sidebarView = new SidebarView()
      mapView     = new MapView()
      this
  AppView
