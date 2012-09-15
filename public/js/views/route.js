define(['jquery', 
    'underscore', 
    'backbone',
    'text!templates/route.html',
    'views/baseview'], 
    function($, _, Backbone, Route, BaseView) {

    	var RouteView = BaseView.extend({
    
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
		    }
		});

    	return RouteView;
    }
);