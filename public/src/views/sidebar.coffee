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
      @toggledViews  = []
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
      # if @toggledViews[view.model.cid] is true then view.$el.addClass("toggled")
      this

    toggle: (view) ->
      if view.$el.hasClass("toggled")
        view.$el.removeClass "toggled"
        @routeViews[view.model.cid]?.hide()
        @toggledViews[view.model.cid] = true
        @dispatcher.trigger "zoomOut:area"
      else
        view.$el.addClass "toggled"
        if not @routeViews[view.model.cid]?
          subview = new RoutesView el: view.el, collection: new Routes
          area = view.model.get("name")
          subview.collection.fetch data:
            area: area
          @routeViews[view.model.cid] = subview
        else 
          @routeViews[view.model.cid].hide()
        @dispatcher.trigger "zoomIn:area", area

    cleanup: ->
      super
      for view in @areaViews
        view.cleanup()

  SidebarView
