define ["jquery", 
        "underscore", 
        "backbone", 
        "text!templates/route.html", 
        "views/baseview"]
        , ($, _, Backbone, Route, BaseView) ->

  class RouteView extends BaseView

    tagName: "li"

    className: "route"

    routeTemplate: _.template(Route)
    
    events:
      "click input[type='checkbox']": "toggleTicked"

    initialize: ->
      @model.on "change", @render, this
      @model.on "destroy", @destroy, this

    render: ->
      @$el.html @routeTemplate(@model.toJSON())
      this

    toggleTicked: ->
      @model.toggleTicked()

  RouteView
