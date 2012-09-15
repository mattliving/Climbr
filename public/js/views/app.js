define(['jquery', 
    'underscore', 
    'backbone',
    'views/baseview',
    'views/nav',
    'views/sidebar',
    'views/map2'], 
    function($, _, Backbone, BaseView, NavView, SidebarView, MapView) {

        var AppView = BaseView.extend({
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
                var sidebarView = new SidebarView();
                var mapView     = new MapView();
                return this;
            }
        });

        return AppView;
    }
);