// Set the require.js configuration for your application.
require.config({

  baseURL: '../',

  paths: {

    // Libraries.
    //jquery: "libs/jquery/jquery-min",
    async: 'libs/require/async',
    underscore: "libs/underscore/underscore-min",
    backbone: "libs/backbone/backbone-min",
    text: "libs/require/text",
    bootstrap: "libs/bootstrap/bootstrap",
    jqueryui: "libs/jqueryui/jquery-ui-custom.min",
    google: "libs/maps/google"
    // googlemaps: "async!https://maps.googleapis.com/maps/api/js?sensor=true&key=AIzaSyAjNafop09-jd2jkly8d05QaPcOa0WddX8",
    // gmap3: "libs/maps/gmap3"
  },

  // shim: {
  //   gmaps: {
  //     //These script dependencies should be loaded before loading
  //     //backbone.js
  //     deps: ['jquery', 
  //     'googlemaps'],
  //     //Once loaded, use the global 'Backbone' as the
  //     //module value.
  //     exports: 'gmap3'
  //   }
  // }

});

require(['main'], function() {
  // var app = new App;
});