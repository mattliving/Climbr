define(['jquery',
  'underscore',
  'backbone',
  'models/route'], 
  function($, _, Backbone, Route) {

    var Routes = Backbone.Collection.extend({

        url: "http://localhost:3000/api/routes",

        model: Route,

        comparator: function(route) {
            return route.get('name');
        }

    });

    return new Routes;
});