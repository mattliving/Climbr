define ["jquery", "underscore", "backbone", "models/area"]
, ($, _, Backbone, Area) ->
  
  Areas = Backbone.Collection.extend(
    
    #url: "http://niflhel.local/climbr/data/routes.json",
    url: "http://localhost:3000/api/areas"

    model: Area
    
    comparator: (area) ->
      area.get "name"
  )
  new Areas
