define(['jquery', 
    'underscore', 
    'backbone',
    'collections/areas',
    "async!http://maps.google.com/maps/api/js?key=AIzaSyAjNafop09-jd2jkly8d05QaPcOa0WddX8&sensor=true!callback"], 
    function($, _, Backbone, Areas) {

        var MapView = Backbone.View.extend({
            el: $('#map'),

            events: {
            },

            initialize: function() {
                this.markers = [],
                Areas.bind('all', this.render, this);  
                var self = this;
                this.initMap(function(bounds) {
                    /* Need to request all areas within map bounds 
                       from server and populate this collection */
                    Areas.fetch({
                        data: { ll: bounds.getSouthWest().toUrlValue().split(','),
                                ur: bounds.getNorthEast().toUrlValue().split(',') }
                    });
                    self.dispatcher.trigger("change:areas", Areas);
                });
            },

            render: function() {
                this.markers.length = 0;
                _.each(Areas.models, function(area) {
                    var latLng = new google.maps.LatLng(area.get('loc')[0], 
                        area.get('loc')[1]);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        draggable: false,
                        map: this.map
                    });
                    this.markers.push(marker);
                }, this);
            },

            initMap: function(callback) {
                var self = this;
                this.dispatcher.bind("submit:search", function(address) {
                    self.codeAddress(map, geocoder, address);
                });
                var options = {
                    center: new google.maps.LatLng( -34.397, 150.644 ),
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                this.map     = new google.maps.Map( this.el, options );
                var map      = this.map;
                var geocoder = new google.maps.Geocoder();
                this.geoLocate(map);

                google.maps.event.addListener(map, 'bounds_changed', function() {
                    callback(map.getBounds());
                });
            },

            codeAddress: function(map, geocoder, address) {
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                    } 
                    else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            },

            geoLocate: function(map) {
                // Try HTML5 geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var pos = new google.maps.LatLng(position.coords.latitude,
                                                         position.coords.longitude);

                        map.setCenter(pos);
                    }, function() {
                        this.handleNoGeolocation(map, true);
                    });
                } 
                else {
                    // Browser doesn't support Geolocation
                    this.handleNoGeolocation(map, false);
                }
            },

            handleNoGeolocation: function(map, errorFlag) {
                if (errorFlag) {
                    var content = 'Error: The Geolocation service failed.';
                } 
                else {
                    var content = 'Error: Your browser doesn\'t support geolocation.';
                }

                var options = {
                    center: new google.maps.LatLng(60, 105),
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var infowindow = new google.maps.InfoWindow(options);
                map.setCenter(options.center);
            }
        });

        return MapView;
    }
);