define ["jquery", 
        "underscore", 
        "backbone", 
        "views/baseview",
        "text!templates/mainNav.html", 
        "text!templates/subNav.html",
        "text!templates/signup.html",
        "text!templates/login.html", 
        "bootstrap", 
        "jqueryui/slider"]
        , ($, _, Backbone, BaseView, mainNav, subNav, signup, login) ->
  class NavView extends BaseView

    el: $("body")

    grades: ["3", "4", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+"]

    mainNavTemplate: _.template(mainNav)
    subNavTemplate: _.template(subNav)
    signupTemplate: _.template(signup)
    loginTemplate: _.template(login)

    events:
      "click .dropdown-menu li a" : "toggleActive"
      "submit #searchField"       : "triggerSearch"
      "click #searchBtn"          : "triggerSearch"

    initialize: ->
      @render()
      @searchField = $("#searchField")
      
      # Twitter Bootstrap init 
      $(".dropdown-toggle").dropdown()
      @initTypeahead()
      
      # jQuery UI slider init 
      $("#slider-range").slider
        range: true
        min: 0
        step: 30
        max: 780
        values: [0, 780]
        slide: (event, ui) =>
          $("#gradeLabel .label.label-important").text @calcGrade(ui.values[0]) + " - " + @calcGrade(ui.values[1])

      $("#gradeLabel .label.label-important").text "3 - 9b+"

    initTypeahead: ->
      $.ajax
        url: "/api/typeahead"
        type: "get"
        success: (data) ->
          $("#searchField").typeahead source: data

    render: ->
      @$el.append @mainNavTemplate
      @$el.append @subNavTemplate
      @$el.append @signupTemplate
      @$el.append @loginTemplate
      this

    toggleActive: (e) ->
      $this = $(e.currentTarget)
      unless $this.hasClass("active")
        $this.addClass "active"
        $this.html "<i class='icon-ok'></i>" + $this.text()
      else
        $this.removeClass "active"
        $this.html $this.text()

    triggerSearch: (e) ->
      e.preventDefault()
      @dispatcher.trigger "submit:search", @searchField.val()

    calcGrade: (value) ->
      @grades[26 - (780 - value) / 30]

  NavView
