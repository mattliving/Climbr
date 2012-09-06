define(['jquery', 
    'underscore', 
    'backbone',
    'google',
    'views/nav',
    'views/sidebar',
    'views/map'], 
    function($, _, Backbone, google, NavView, SidebarView, MapView) {

        var AppView = Backbone.View.extend({
            el: $('body'),

            initialize: function() {
                this.render();
                $(window).resize(function () {
                    var h = $('.container-fluid').height(),
                    offsetTop = 80; 

                    $('#map').css('height', (h - offsetTop));
                    //$('#friends').css('height', (.1*h - offsetTop));
                }).resize();
            },

            render: function() {
                var navView     = new NavView();
                var mapView     = new MapView();
                var sidebarView = new SidebarView();
                return this;
            }
        });

        return AppView;
    }
);