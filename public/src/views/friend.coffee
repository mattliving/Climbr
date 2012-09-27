define ["jquery", 
        "underscore", 
        "backbone", 
        "text!templates/friend.html", 
        "views/baseview"]
        , ($, _, Backbone, Friend, BaseView) ->
  
  class FriendView extends BaseView
    
    tagName: "div"

    className: "scroll-content-item"

    click: 
      "hover" : "popup"
      "click" : ""
    
    friendTemplate: _.template(Friend)

    initialize: ->
      @model.bind "change", @render
      @model.bind "destroy", @destroy

    render: ->
      @$el.html @friendTemplate(@model.toJSON())
      this

    toggle: ->

    popup: ->
      
  FriendView
