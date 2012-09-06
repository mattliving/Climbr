/* A model representing a single climbing route. Each subsection of a
climbing area may have one or more routes */

define(['jquery',
	'underscore',
  	'backbone'], 
  function($, _, Backbone) {

	var Route = Backbone.Model.extend({
		defaults: {
			name: "",
			area: "",
			section: "",
			style: "",
			beta: "",
			grade: {
				sport: {
					french: "",
					british: ""
				},
				trad: "",
				boulder: {
					font: "",
					hueco: ""
				},
				dws: ""
			},
			stars: null,
			ticked: false,
			loc: [null, null]
		},

		toggleTicked: function() {
			this.save({ticked: !this.get("ticked")});
		},

		clear: function() {
			this.destroy();
		}
	});

	return Route;
});