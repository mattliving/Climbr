define ["jquery", 
        "underscore", 
        "backbone",  
        "views/baseview",  
        "views/route"]
        , ($, _, Backbone, BaseView, RouteView, MapView) ->
  
  class RoutesView extends BaseView

    events: {}

    initialize: ->
      @hidden  = false
      @locs = []
      @routeViews = []
      @collection.bind "all", @render, this

    render: ->
      for route in @collection.models
        @renderRoute route
        @renderMarkers route
      @dispatcher.trigger "render:routeMarkers", @locs
      this

    renderRoute: (route) ->
      view = new RouteView(model: route)
      @$el.after view.render().el
      @routeViews.push view
      this

    renderMarkers: (route) ->
      @locs.push
        x: route.get("loc")[0]
        y: route.get("loc")[1]

    hide: ->
      if not @hidden
        @hidden = true
        for view in @routeViews
          view.undelegateEvents()
          view.$el.hide()
      else 
        @hidden = false
        for view in @routeViews
          view.delegateEvents()
          view.$el.show()

    cleanup: ->
      super
      for view in @routeViews
        view.cleanup()

  RoutesView
