# A model representing a single climbing route. Each subsection of a
# climbing area may have one or more routes 
define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  
  class Route extends Backbone.Model
    
    defaults:
      _id: null
      name: ""
      area: ""
      section: ""
      style: ""
      beta: ""
      grade:
        sport:
          french: ""
          british: ""

        trad: ""
        boulder:
          font: ""
          hueco: ""

        dws: ""

      stars: null
      ticked: false
      loc: [null, null]

    toggleTicked: ->
      @save ticked: not @get("ticked")

    clear: ->
      @destroy()

  Route
