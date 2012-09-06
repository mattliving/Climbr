/* A model representing a climbing area. Each area can have one or more
subsections, which are comprised of a collection of one or more routes */ 

define(['jquery',
	'underscore',
  	'backbone'], 
  function($, _, Backbone) {

	var Area = Backbone.Model.extend({
		defaults: {
			name: "",
			numberOfProblems: "",
			rock: "",
			approach: "",
			difficulty: {
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
			loc: [null,null]
		},

		clear: function() {
			this.destroy();
		}
	});

	return Area;
});