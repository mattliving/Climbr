define(
	[ "async!http://maps.google.com/maps/api/js?key=AIzaSyAjNafop09-jd2jkly8d05QaPcOa0WddX8&sensor=true!callback" ],
	function() {
		return {
			addMapToCanvas: function( mapCanvas ) {
				var options = {
					center: new google.maps.LatLng( -34.397, 150.644 ),
					zoom: 6,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				var map = new google.maps.Map( mapCanvas, options );
				this.geoLocate(map);
			},
			geoLocate: function(map) {
	            // Try HTML5 geolocation
	            if (navigator.geolocation) {
	                navigator.geolocation.getCurrentPosition(function(position) {
	                    var pos = new google.maps.LatLng(position.coords.latitude,
	                                                     position.coords.longitude);

	                    map.setCenter(pos);
	                }, function() {
	                    this.handleNoGeolocation(true);
	                });
	            } 
	            else {
	                // Browser doesn't support Geolocation
	                this.handleNoGeolocation(false);
	            }
        	},
        	handleNoGeolocation: function(errorFlag) {
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
		}
	}
);