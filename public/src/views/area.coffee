define ["jquery", 
        "underscore", 
        "backbone", 
        "text!templates/area.html", 
        "views/baseview"]
        , ($, _, Backbone, Area, BaseView) ->
  
  AreaView = BaseView.extend(
    tagName: "li"

    className: "area"
    
    areaTemplate: _.template(Area)

    events:
      click: "toggle"

    initialize: ->
      @model.bind "change", @render
      @model.bind "destroy", @destroy

    render: ->
      @$el.html @areaTemplate(@model.toJSON())
      this

    toggle: ->
      @dispatcher.trigger "toggle:area", this
  )
  AreaView
