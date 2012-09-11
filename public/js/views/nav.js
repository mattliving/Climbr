define(['jquery', 
    'underscore', 
    'backbone',
    'text!templates/mainNav.html',
    'text!templates/subNav.html',
    'bootstrap',
    'jqueryui/slider'], 
    function($, _, Backbone, mainNav, subNav) {

        var NavView = Backbone.View.extend({
            el: $('body'),

            grades: ['3','4','5a','5b','5c','6a','6a+','6b','6b+','6c','6c+',
            '7a','7a+','7b','7b+','7c','7c+','8a','8a+','8b','8b+','8c','8c+',
            '9a','9a+','9b','9b+'],

            mainNavTemplate: _.template(mainNav),
            subNavTemplate: _.template(subNav),

            events: {
                "click .dropdown-menu li a": "toggleActive",
                "submit #searchField": "triggerSearch",
                "click #searchBtn": "triggerSearch"
            },

            initialize: function() {
                this.render();
                this.searchField = $('#searchField');

                /* Twitter Bootstrap init */
                $('.dropdown-toggle').dropdown();

                this.initTypeahead();

                var self = this;
                /* jQuery UI slider init */
                $("#slider-range").slider({
                    range: true,
                    min: 0,
                    step: 30,
                    max: 780,
                    values: [ 0, 780 ],
                    slide: function( event, ui ) {
                        $("#gradeLabel .label.label-important").text(self.calcGrade(ui.values[ 0 ]) + " - " 
                            + self.calcGrade(ui.values[ 1 ]));
                    }
                });
                $("#gradeLabel .label.label-important").text("3 - 9b+");
            },

            initTypeahead: function() {
                $.ajax({
                    url: '/api/typeahead', type: 'get',
                    success: function(data) {
                        $('#searchField').typeahead({
                            source: data
                        });
                    }
                });
            },

            render: function() {
                this.$el.append(this.mainNavTemplate);
                this.$el.append(this.subNavTemplate);
                return this;
            },

            toggleActive: function(e) {
                var $this = $(e.currentTarget);
                if (!$this.hasClass('active')) {
                    $this.addClass('active');
                    $this.html("<i class='icon-ok'></i>" + $this.text());
                }
                else {
                    $this.removeClass('active');
                    $this.html($this.text());
                }
            },

            triggerSearch: function(e) {
                e.preventDefault();
                this.dispatcher.trigger("submit:search", this.searchField.val());
            },

            calcGrade: function(value) {
                return this.grades[ 26 - (780 - value)/30 ];
            }
        });

        return NavView;
    }
);