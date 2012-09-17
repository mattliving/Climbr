define ["jquery", 
        "underscore", 
        "backbone", 
        "collections/areas", 
        "views/baseview", "goog!maps,3,other_params:[libraries=places&key=AIzaSyAjNafop09-jd2jkly8d05QaPcOa0WddX8&sensor=true]"]
        , ($, _, Backbone, Areas, BaseView) ->
  
  class MapView extends BaseView

    el: $("#map")
    
    events: {}

    initialize: ->
      @markers = []
      Areas.bind("all", @render, this)

      self = this
      @initMap (bounds) ->
        
        # Need to request all areas within map bounds 
        # from server and populate this collection 
        Areas.fetch data:
          ll: bounds.getSouthWest().toUrlValue().split(",")
          ur: bounds.getNorthEast().toUrlValue().split(",")

        self.dispatcher.trigger "change:areas", Areas
    
    #this.initPlaces();
    render: ->
      @markers.length = 0
      _.each Areas.models, ((area) ->
        latLng = new google.maps.LatLng(area.get("loc")[0], area.get("loc")[1])
        marker = new google.maps.Marker(
          position: latLng
          draggable: false
          map: @map
        )
        @markers.push marker
      ), this

    initMap: (callback) ->
      options =
        center: new google.maps.LatLng(-34.397, 150.644)
        minZoom: 4
        zoom: 7
        mapTypeId: google.maps.MapTypeId.ROADMAP

      @map = new google.maps.Map(@el, options)
      map = @map
      geocoder = new google.maps.Geocoder()
      @geoLocate map
      google.maps.event.addListener map, "bounds_changed", ->
        callback map.getBounds()

      self = this
      @dispatcher.bind "submit:search", (address) ->
        self.codeAddress map, geocoder, address

    initPlaces: ->
      sw = new google.maps.LatLng(-90, -180)
      ne = new google.maps.LatLng(90, 180)
      request =
        bounds: new google.maps.LatLngBounds(sw, ne)
        types: ["country"]

      service = new google.maps.places.PlacesService(@map)
      service.search request, (places, status) ->
        self.dispatcher.trigger "init:places", places if status is google.maps.places.PlacesServiceStatus.OK

    codeAddress: (map, geocoder, address) ->
      geocoder.geocode
        address: address
      , (results, status) ->
        if status is google.maps.GeocoderStatus.OK
          map.panTo results[0].geometry.location
        
        # console.log(results[0].geometry.viewport);
        # map.setZoom(9);
        else
          alert "Geocode was not successful for the following reason: " + status

    geoLocate: (map) ->
      # Try HTML5 geolocation
      if navigator.geolocation
        navigator.geolocation.getCurrentPosition ((position) ->
          pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          map.setCenter pos
        ), ->
          @handleNoGeolocation map, true

      else
        # Browser doesn't support Geolocation
        @handleNoGeolocation map, false

    handleNoGeolocation: (map, errorFlag) ->
      if errorFlag
        content = "Error: The Geolocation service failed."
      else
        content = "Error: Your browser doesn't support geolocation."
      options =
        center: new google.maps.LatLng(60, 105)
        zoom: 6
        mapTypeId: google.maps.MapTypeId.ROADMAP

      infowindow = new google.maps.InfoWindow(options)
      map.setCenter options.center

  MapView
