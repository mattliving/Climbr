define(['jquery', 
    'underscore', 
    'backbone',
    'collections/areas',
    'collections/routes',
    'views/baseview',
    'views/area',
    'views/route',
    'bootstrap'], 
    function($, _, Backbone, Areas, Routes, BaseView, AreaView, RouteView) {

        var SidebarView = BaseView.extend({
            el: $('#sidebar'),

            initialize: function() {
                this.areaViews = [];
                this.routeViews = [];
                Areas.bind('all', this.renderAreas, this);
                Routes.bind('all', this.renderRoutes, this);

                this.dispatcher.bind("change:areas", function(MapAreas) {
                    Areas.reset(MapAreas.models);
                });
                this.dispatcher.bind("toggle:area", function(view) {
                    this.toggle(view);
                }, this);
            },

            events: {
            },

            renderAreas: function() {
                this.$el.empty();
                var self = this;
                _.each(Areas.models, function(area) {
                    self.renderArea(area);
                }, this);

                return this;
            },

            renderArea: function(area) {
                var view = new AreaView({model: area});
                this.$el.append(view.render().el);
                this.areaViews.push(view);

                return this;
            },

            renderRoutes: function() {
                var self = this;
                _.each(Routes.models, function(route) {
                    self.renderRoute(route);
                }, this);  

                return this;
            },

            renderRoute: function(route) {
                var view = new RouteView({model: route});
                this.$el.append(view.render().el);
                this.routeViews.push(view);

                return this;
            },

            toggle: function(view) {
                if (view.$el.hasClass('toggled')) {
                    view.$el.removeClass('toggled');
                    Routes.reset();
                    this.clear();
                }
                else {
                    view.$el.addClass('toggled');
                    Routes.fetch({
                        data: { area: view.model.get('name') }
                    });
                }
            },

            cleanup: function() {
                this.super.cleanup();
                _(this.routeViews).each(function(view) {
                    view.close();
                });
                this.routeViews = [];
            }
        });

        return SidebarView;
    }
);