define(['jquery', 
    'underscore', 
    'backbone',
    'text!templates/area.html'], 
    function($, _, Backbone, Area) {

    	var AreaView = Backbone.View.extend({
    
		    tagName: "li",

		    className: "area",

		    areaTemplate: _.template(Area),

		    events: {
		    	"click" : "toggle"
		    },

		    initialize: function() {            
		        this.model.bind('change', this.render);
		        this.model.bind('destroy', this.destroy);
		    },

		    render: function() {   
		    	this.$el.html(this.areaTemplate(this.model.toJSON()));
		        return this;
		    },

		    toggle: function() {
		    	this.dispatcher.trigger("toggle:area", this);
		    },

		    destroy: function() {
		    	this.remove();
		    	this.model.destroy();
		    }
		});

    	return AreaView;
    }
);