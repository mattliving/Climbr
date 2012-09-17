define ["jquery", 
        "underscore", 
        "backbone", 
        "text!templates/area.html", 
        "views/baseview"]
        , ($, _, Backbone, Area, BaseView) ->
  
  class AreaView extends BaseView
    
    tagName: "li"

    className: "area"
    
    areaTemplate: _.template(Area)

    events:
      click: "toggle"

    subview: {}

    initialize: ->
      @model.bind "change", @render
      @model.bind "destroy", @destroy

    render: ->
      @$el.html @areaTemplate(@model.toJSON())
      this

    toggle: ->
      @dispatcher.trigger "toggle:area", this
      
  AreaView
