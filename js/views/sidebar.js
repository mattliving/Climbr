define(['jquery', 
    'underscore', 
    'backbone',
    'collections/area',
    'text!templates/sidebar.html',
    'bootstrap'], 
    function($, _, Backbone, Area, sidebar) {

        var SidebarView = Backbone.View.extend({
            el: $('#sidebar'),

            sidebarTemplate: _.template(sidebar),

            initialize: function() {
                //this.model.on('change', this.render, this);
                this.render();
            },

            render: function() {
                this.$el.html(this.sidebarTemplate);
                return this;
            }
        });

        return SidebarView;
    }
);