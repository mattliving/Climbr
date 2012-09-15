define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  
  BaseView = Backbone.View.extend(
    
    initialize: ->
      @model.on "change", @render, this
      @model.on "destroy", @cleanup, this

    postInitialize: ->

    postRender: ->
    
    #this.$el.html(this.routeTemplate(this.model.toJSON()));
    #return this;
    cleanup: ->
      @undelegateEvents()
      @model.off null, null, this
      @remove()
  )
  BaseView
