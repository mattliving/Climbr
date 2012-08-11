$(document).ready(function() {
    /* Twitter Bootstrap init */
    $('.dropdown-toggle').dropdown();

    /* Google maps init */
    var $map = $('#map');
    $map.gmap3({
        action: 'init',
        options: {
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    });

    geoLocate($map);    
});

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