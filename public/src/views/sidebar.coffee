define ["jquery", 
        "underscore", 
        "backbone", 
        "collections/areas", 
        "collections/routes", 
        "views/baseview", 
        "views/area", 
        "views/route", "bootstrap"]
        , ($, _, Backbone, Areas, Routes, BaseView, AreaView, RouteView) ->
  
  SidebarView = BaseView.extend(

    el: $("#sidebar")

    events: {}

    initialize: ->
      @areaViews = []
      @routeViews = []
      Areas.bind "all", @renderAreas, this
      Routes.bind "all", @renderRoutes, this

      @dispatcher.bind "change:areas", (MapAreas) ->
        Areas.reset MapAreas.models

      @dispatcher.bind "toggle:area", ((view) ->
        @toggle view
      ), this

    renderAreas: ->
      @$el.empty()
      self = this
      _.each Areas.models, ((area) ->
        self.renderArea area
      ), this
      this

    renderArea: (area) ->
      view = new AreaView(model: area)
      @$el.append view.render().el
      @areaViews.push view
      this

    renderRoutes: ->
      self = this
      _.each Routes.models, ((route) ->
        self.renderRoute route
      ), this
      this

    renderRoute: (route) ->
      view = new RouteView(model: route)
      @$el.append view.render().el
      @routeViews.push view
      this

    toggle: (view) ->
      if view.$el.hasClass("toggled")
        view.$el.removeClass "toggled"
        Routes.reset()
        @clear()
      else
        view.$el.addClass "toggled"
        Routes.fetch data:
          area: view.model.get("name")

    cleanup: ->
      super
      _(@routeViews).each (view) ->
        view.close()

      @routeViews = []
  )
  SidebarView
