define(['jquery', 
    'underscore', 
    'backbone',
    'collections/area',
    'text!templates/route.html'], 
    function($, _, Backbone, Area, Route) {

    	var RouteView = Backbone.View.extend({
    
		    tagName: "li",

		    routeTemplate: _.template(Route),

		    events: {
		    	"click input.checkbox": "toggleTicked"
		    },

		    initialize: function() {            
		        this.model.bind('change', this.render);
		        this.model.bind('destroy', this.destroy);
		    },

		    render: function() {   
		    	this.$el.html(this.routeTemplate(this.model.toJSON()));
		        return this;
		    },

		    toggleTicked: function() {
		    	this.model.toggle();
		    },

		    clear: function() {
		    	this.model.clear();
		    }
		});

    	return RouteView;
    }
);