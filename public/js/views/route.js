define(['jquery', 
    'underscore', 
    'backbone',
    'text!templates/route.html'], 
    function($, _, Backbone, Route) {

    	var RouteView = Backbone.View.extend({
    
		    tagName: "li",

		    className: "route",

		    routeTemplate: _.template(Route),

		    events: {
		    	"click input[type='checkbox']": "toggleTicked"
		    },

		    initialize: function() {           
		        this.model.on('change', this.render, this);
		        this.model.on('destroy', this.destroy, this);
		    },

		    render: function() {   
		    	this.$el.html(this.routeTemplate(this.model.toJSON()));
		        return this;
		    },

		    toggleTicked: function() {
		    	console.log("TICKED");
		    	this.model.toggleTicked();
		    },

		    destroy: function() {
		    	this.remove();
		    	this.unbind();
		    	this.model.destroy();
		    }
		});

    	return RouteView;
    }
);