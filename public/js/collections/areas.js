define(['jquery',
  'underscore',
  'backbone',
  'models/area'], 
  function($, _, Backbone, Area) {

    var Areas = Backbone.Collection.extend({

        //url: "http://niflhel.local/climbr/data/routes.json",
        url: "http://localhost:3000/api/areas",

        model: Area,

        comparator: function(area) {
            return area.get('name');
        }

    });

    return new Areas;
});