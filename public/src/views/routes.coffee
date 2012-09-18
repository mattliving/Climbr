define ["jquery", 
        "underscore", 
        "backbone",  
        "views/baseview",  
        "views/route"]
        , ($, _, Backbone, BaseView, RouteView) ->
  
  class RoutesView extends BaseView

    events: {}

    initialize: ->
      @hidden = false
      @routeViews = []
      @collection.bind "all", @render, this

    render: ->
      if not @collection.models?
        for route in @collection.models
          @renderRoute route
      this

    renderRoute: (route) ->
      view = new RouteView(model: route)
      @$el.after view.render().el
      @routeViews.push view
      this

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
