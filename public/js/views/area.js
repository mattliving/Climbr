define(['jquery', 
    'underscore', 
    'backbone',
    'text!templates/area.html',
    'views/baseview'], 
    function($, _, Backbone, Area, BaseView) {

    	var AreaView = BaseView.extend({
    
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
		    }
		});

    	return AreaView;
    }
);