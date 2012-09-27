define ["jquery", 
        "underscore", 
        "backbone", 
        "text!templates/friends.html", 
        "views/baseview",
        "jqueryui/slider"]
        , ($, _, Backbone, Friends, BaseView) ->
  
  class FriendsView extends BaseView
    
    el: $("#friends")
    
    friendsTemplate: _.template(Friends)

    initialize: ->
      @render()
      $scrollPane    = $(".scroll-pane")
      $scrollContent = $(".scroll-content")
    
      # build slider
      @$scrollBar = $(".scroll-bar").slider
        slide: (event, ui) ->
          if $scrollContent.width() > $scrollPane.width()
            $scrollContent.css "margin-left", Math.round
            ui.value / 100 * ($scrollPane.width() - $scrollContent.width()) + "px"
          else
            $scrollContent.css "margin-left", 0

    render: ->
      @$el.html @friendsTemplate
      this

    toggle: ->
      
  FriendsView
