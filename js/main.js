define(['jquery', 
    'underscore', 
    'backbone',
    'bootstrap',
    'jqueryui/slider',
    'google'], function($, _, Backbone, Bootstrap, slider, google) {

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

            $('.dropdown-menu li a').click(function() {
                $(this).addClass('active');
            });

            /* Google maps init */
            var map = $('#map').get(0);
            google.addMapToCanvas(map);
            /*$map.gmap3({
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
            });*/

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
    }
);