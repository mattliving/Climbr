define(['jquery',
  'underscore',
  'backbone',
  'models/route'], function($, _, Backbone, Route) {

    var Area = Backbone.Collection.extend({

        url: "http://niflhel.local/climbr/data/routes.json",

        // Reference to this collection's model.
        model: Route,

        ticked: function() {
            return this.filter(function(route){ return route.get('ticked'); });
        },

        remaining: function() {
            return this.without.apply(this, this.ticked());
        },

        comparator: function(route) {
            return route.get('order');
        }

    });

    return new Area;
});