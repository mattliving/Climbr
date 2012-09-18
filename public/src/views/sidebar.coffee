define ["jquery", 
        "underscore", 
        "backbone", 
        "collections/areas", 
        "collections/routes", 
        "views/baseview", 
        "views/routes", 
        "views/area", 
        "bootstrap"]
        , ($, _, Backbone, Areas, Routes, BaseView, RoutesView, AreaView) ->
  
  class SidebarView extends BaseView

    el: $("#sidebar")

    events: {}

    initialize: ->
      @areaViews  = []
      @routeViews = []
      Areas.bind "all", @render, this

      @dispatcher.bind "change:areas", (MapAreas) ->
        Areas.reset MapAreas.models

      @dispatcher.bind "toggle:area", ((view) ->
        @toggle view
      ), this

    render: ->
      @$el.empty()
      for area in Areas.models
        @renderArea area
      this

    renderArea: (area) ->
      view = new AreaView(model: area)
      @$el.append view.render().el
      @areaViews.push view
      this

    toggle: (view) ->
      if view.$el.hasClass("toggled")
        view.$el.removeClass "toggled"
        @routeViews[view.model.cid]?.hide()
      else
        view.$el.addClass "toggled"
        if not @routeViews[view.model.cid]?
          subview = new RoutesView el: view.el, collection: new Routes
          subview.collection.fetch data:
            area: view.model.get("name")
          @routeViews[view.model.cid] = subview
        else 
          @routeViews[view.model.cid].hide()

    cleanup: ->
      super
      for view in @areaViews
        view.cleanup()

  SidebarView
