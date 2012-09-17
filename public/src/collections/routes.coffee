define ["jquery", "underscore", "backbone", "models/route"]
, ($, _, Backbone, Route) ->
  
  class Routes extends Backbone.Collection

    url: "http://localhost:3000/api/routes"
    
    model: Route
    
    comparator: (route) ->
      route.get "name"

  new Routes
