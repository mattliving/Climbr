define(['jquery', 
    'underscore', 
    'backbone'], 
    function($, _, Backbone) {

    	var BaseView = Backbone.View.extend({

		    initialize: function() {           
		        this.model.on('change', this.render, this);
		        this.model.on('destroy', this.cleanup, this);
		    },

		    render: function() {   
		    	//this.$el.html(this.routeTemplate(this.model.toJSON()));
		        //return this;
		    },

		    cleanup: function() {
		    	this.undelegateEvents();
		    	this.model.off(null, null, this);
		    	this.remove();
		    }
		});

    	return BaseView;
    }
);