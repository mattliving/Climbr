define ["jquery", 
        "underscore", 
        "backbone", 
        "collections/areas", 
        "views/baseview", 
        "goog!maps,3,other_params:[libraries=places&key=AIzaSyAjNafop09-jd2jkly8d05QaPcOa0WddX8&sensor=true]"]
        , ($, _, Backbone, Areas, BaseView) ->
  
  class MapView extends BaseView

    el: $("#map")
    
    events: {}

    initialize: ->
      # Markers is a hash map from a view's name to its marker
      @markers = []
      Areas.bind("all", @render, this)

      @dispatcher.on "zoomIn:area", (name) =>
        @zoomIn name

      @dispatcher.on "zoomOut:area", @zoomOut, @

      @initMap (bounds) =>
        
        # Need to request all areas within map bounds 
        # from server and populate this collection 
        Areas.fetch data:
          ll: bounds.getSouthWest().toUrlValue().split(",")
          ur: bounds.getNorthEast().toUrlValue().split(",")

        @dispatcher.trigger "change:areas", Areas
    
    #this.initPlaces();
    render: ->
      @markers.length = 0
      for area in Areas.models
        latLng = new google.maps.LatLng(area.get("loc")[0], area.get("loc")[1])
        marker = new google.maps.Marker(
          position: latLng
          draggable: false
          map: @map
        )
        @markers[area.get("name")] = marker

    # locs is an array of location objects with x and y coords of routes
    drawRouteMarkers: (locs) ->
      avgX = avgY = 0
      for loc in locs
        avgX += loc.x
        avgY += loc.y
        latLng = new google.maps.LatLng(loc.x, loc.y)
        marker = new google.maps.Marker(
          position: latLng
          draggable: false
          map: @map
        )
      center = new google.maps.LatLng(avgX/locs.length, avgY/locs.length)
      @map.setCenter center

    toggleRouteMarkers: ->

    zoomIn: (name) ->
      @map.panTo @markers[name]?.getPosition()
      @map.setZoom(10)

    zoomOut: ->
      #@map.setZoom(7)

    initMap: (callback) ->
      options =
        center: new google.maps.LatLng(-34.397, 150.644)
        minZoom: 4
        zoom: 8
        mapTypeId: google.maps.MapTypeId.ROADMAP

      @map = new google.maps.Map(@el, options)
      map = @map
      geocoder = new google.maps.Geocoder()
      @geoLocate map
      google.maps.event.addListener map, "bounds_changed", ->
        callback map.getBounds()

      @dispatcher.bind "submit:search", (address) =>
        @codeAddress map, geocoder, address

    initPlaces: ->
      sw = new google.maps.LatLng(-90, -180)
      ne = new google.maps.LatLng(90, 180)
      request =
        bounds: new google.maps.LatLngBounds(sw, ne)
        types: ["country"]

      service = new google.maps.places.PlacesService(@map)
      service.search request, (places, status) =>
        @dispatcher.trigger "init:places", places if status is google.maps.places.PlacesServiceStatus.OK

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
