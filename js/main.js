define(['jquery', 
    'underscore', 
    'backbone',
    'bootstrap', 
    'jqueryui',
    'google',
    'gmap3'], function($, _, Backbone, Bootstrap, jqueryui, Google, Gmap3) {

        var grades = ['3','4','5a','5b','5c','6a','6a+','6b','6b+','6c','6c+',
            '7a','7a+','7b','7b+','7c','7c+','8a','8a+','8b','8b+','8c','8c+',
            '9a','9a+','9b','9b+'];

        $(function() {
            /* Twitter Bootstrap init */
            $('.dropdown-toggle').dropdown();

            /* jQuery UI slider init */
            $("#slider-range").slider({
                range: true,
                min: 0,
                step: 30,
                max: 780,
                values: [ 0, 780 ],
                slide: function( event, ui ) {
                    $("#gradeLabel .label.label-important").text(calcGrade(ui.values[ 0 ]) + " - " 
                        + calcGrade(ui.values[ 1 ]));
                }
            });
            $("#gradeLabel .label.label-important").text("3 - 9b+");

            /* Google maps init */
            var $map = $('#map');
            $map.gmap3({
                action: 'init',
                options: {
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
            });
            $map.gmap3({
                action: 'geoLatLng',
                callback: function(latLng) {
                    if (latLng){
                        $(this).gmap3({action: 'setCenter', args:[ latLng ]});
                    }
                    else handleNoGeolocation("Error");
                }
            });

            $('.dropdown-menu li a').click(function() {
                $(this).addClass('active');
            });

            //geoLocate($map); 

            $(window).resize(function () {
                var h = $('.container-fluid').height(),
                    offsetTop = 80; // Calculate the top offset

                $('#map').css('height', (h - offsetTop));
                //$('#friends').css('height', (.1*h - offsetTop));
            }).resize();   
        });

        function calcGrade(value) {
            return grades[ 26 - (780 - value)/30 ];
        }

        function geoLocate($map) {
            // Try HTML5 geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,
                                                     position.coords.longitude);

                    $map.gmap3('get').setCenter(pos);
                }, function() {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag) {
                var content = 'Error: The Geolocation service failed.';
            } 
            else {
                var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
                map: $map.gmap3('get'),
                position: new google.maps.LatLng(60, 105),
                content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
            $map.gmap3('get').setCenter(options.position);
        }
    }
);