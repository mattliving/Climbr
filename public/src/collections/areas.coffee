define ["jquery", "underscore", "backbone", "models/area"]
, ($, _, Backbone, Area) ->
  
  class Areas extends Backbone.Collection
    
    #url: "http://niflhel.local/climbr/data/routes.json",
    url: "http://localhost:3000/api/areas"

    model: Area
    
    comparator: (area) ->
      area.get "name"

  new Areas
