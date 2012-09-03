define(['jquery', 
    'underscore', 
    'backbone',
    "async!http://maps.google.com/maps/api/js?key=AIzaSyAjNafop09-jd2jkly8d05QaPcOa0WddX8&sensor=true!callback"], 
    function($, _, Backbone) {

        var MapView = Backbone.View.extend({
            el: $('#map'),

            events: {
            },

            initialize: function() {
                var self = this;
                this.dispatcher.bind("submit:search", function(address) {
                    self.codeAddress(map, geocoder, address);
                });
                var options = {
                    center: new google.maps.LatLng( -34.397, 150.644 ),
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map      = new google.maps.Map( this.el, options );
                var geocoder = new google.maps.Geocoder();
                this.geoLocate(map);
            },
            codeAddress: function(map, geocoder, address) {
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
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

            // render: function() {
            //     this.$el.append(this.MapTemplate);
            //     return this;
            // }
        });

        return MapView;
    }
);