define(['jquery', 
    'underscore', 
    'backbone',
    'collections/area',
    'views/route',
    'bootstrap'], 
    function($, _, Backbone, Area, RouteView) {

        var SidebarView = Backbone.View.extend({
            el: $('#sidebar'),

            //areaTemplate = _.template(AreaTemplate);

            initialize: function() {
                this.collection = Area;
                //this.collection.fetch();
                this.collection.bind('all', this.render, this);
                this.render();
            },

            render: function() {
                var self = this;
                _.each(this.collection.models, function(route) {
                    self.renderRoute(route);
                }, this);
                return this;
            },

            renderRoute: function(route) {
                var view = new RouteView({model: route});
                this.$el.append(view.render().el);
            }
        });

        return SidebarView;
    }
);