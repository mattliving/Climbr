define(['jquery', 
    'underscore', 
    'backbone',
    'google',
    'views/nav',
    'views/sidebar'], 
    function($, _, Backbone, google, NavView, SidebarView) {

        var AppView = Backbone.View.extend({
            el: $('body'),

            initialize: function() {
                this.render();
                this.initMap();
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
                return this;
            },

            initMap: function() {
                var map = $('#map').get(0);
                google.addMapToCanvas(map);
            }
        });

        return AppView;
    }
);