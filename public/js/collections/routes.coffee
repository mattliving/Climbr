define ["jquery", "underscore", "backbone", "models/route"]
, ($, _, Backbone, Route) ->
  
  Routes = Backbone.Collection.extend(

    url: "http://localhost:3000/api/routes"
    
    model: Route
    
    comparator: (route) ->
      route.get "name"
  )
  new Routes
