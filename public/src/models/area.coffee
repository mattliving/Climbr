# A model representing a climbing area. Each area can have one or more
# subsections, which are comprised of a collection of one or more routes 
define ["jquery", "underscore", "backbone"], ($, _, Backbone) ->
  
  class Area extends Backbone.Model
    defaults:
      _id: null
      name: ""
      numberOfProblems: ""
      rock: ""
      approach: ""
      grade:
        sport:
          french: ""
          british: ""

        trad: ""
        boulder:
          font: ""
          hueco: ""

        dws: ""

      loc: [null, null]

    clear: ->
      @destroy()

  Area
