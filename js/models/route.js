define(['jquery',
	'underscore',
  	'backbone'], 
  function(_, Backbone) {

	var Route = Backbone.Model.extend({
		defaults: {
			name: "",
			area: "",
			style: "",
			rock: "",
			grade: {
				sport: {
					french: "",
					british: ""

				}
				trad: "",
				boulder: {
					font: "",
					hueco:: ""
				}
				dws: ""
			},
			stars: null,
			ticked: false,
			gps: ""
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