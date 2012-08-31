define(['jquery', 
    'underscore', 
    'backbone',
    'text!templates/sidebar.html',
    'bootstrap'], 
    function($, _, Backbone, sidebar) {

        var SidebarView = Backbone.View.extend({
            el: $('#sidebar'),

            sidebarTemplate: _.template(sidebar),

            initialize: function() {
                //this.model.on('change', this.render, this);
                this.render();
            },

            render: function() {
                this.$el.append(this.sidebarTemplate);
                return this;
            }
        });

        return SidebarView;
    }
);