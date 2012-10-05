// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "models/user", "views/baseview", "text!templates/mainNav.html", "text!templates/subNav.html", "text!templates/signup.html", "text!templates/login.html", "bootstrap", "jqueryui/slider"], function($, _, Backbone, User, BaseView, mainNav, subNav, signup, login) {
    var NavView;
    NavView = (function(_super) {

      __extends(NavView, _super);

      function NavView() {
        return NavView.__super__.constructor.apply(this, arguments);
      }

      NavView.prototype.el = $("body");

      NavView.prototype.grades = ["3", "4", "5a", "5b", "5c", "6a", "6a+", "6b", "6b+", "6c", "6c+", "7a", "7a+", "7b", "7b+", "7c", "7c+", "8a", "8a+", "8b", "8b+", "8c", "8c+", "9a", "9a+", "9b", "9b+"];

      NavView.prototype.mainNavTemplate = _.template(mainNav);

      NavView.prototype.subNavTemplate = _.template(subNav);

      NavView.prototype.signupTemplate = _.template(signup);

      NavView.prototype.loginTemplate = _.template(login);

      NavView.prototype.events = {
        "click #styleDropdown a": "toggleActive",
        "submit #searchField": "triggerSearch",
        "click #searchBtn": "triggerSearch",
        "click #loginFacebook": "loginFacebook"
      };

      NavView.prototype.initialize = function() {
        var _this = this;
        this.user = new User();
        this.dispatcher.on("update:user", this.update, this);
        this.render();
        this.mainNav = $("#mainNav");
        this.searchField = $("#searchField");
        $(".dropdown-toggle").dropdown();
        this.initTypeahead();
        $("#slider-range").slider({
          range: true,
          min: 0,
          step: 30,
          max: 780,
          values: [0, 780],
          slide: function(event, ui) {
            return $("#gradeLabel .label.label-important").text(_this.calcGrade(ui.values[0]) + " - " + _this.calcGrade(ui.values[1]));
          }
        });
        return $("#gradeLabel .label.label-important").text("3 - 9b+");
      };

      NavView.prototype.initTypeahead = function() {
        return $.ajax({
          url: "/api/typeahead",
          type: "get",
          success: function(data) {
            return $("#searchField").typeahead({
              source: data
            });
          }
        });
      };

      NavView.prototype.render = function() {
        this.$el.append(this.mainNavTemplate(this.user.toJSON()));
        this.$el.append(this.subNavTemplate);
        this.$el.append(this.signupTemplate);
        this.$el.append(this.loginTemplate);
        return this;
      };

      NavView.prototype.update = function() {
        this.mainNav.replaceWith(this.mainNavTemplate(this.user.toJSON()));
        return $(".dropdown-toggle").dropdown();
      };

      NavView.prototype.toggleActive = function(e) {
        var $this;
        $this = $(e.currentTarget);
        if (!$this.hasClass("active")) {
          $this.addClass("active");
          return $this.html("<i class='icon-ok'></i>" + $this.text());
        } else {
          $this.removeClass("active");
          return $this.html($this.text());
        }
      };

      NavView.prototype.triggerSearch = function(e) {
        e.preventDefault();
        return this.dispatcher.trigger("submit:search", this.searchField.val());
      };

      NavView.prototype.calcGrade = function(value) {
        return this.grades[26 - (780 - value) / 30];
      };

      NavView.prototype.loginFacebook = function() {
        this.initFB();
        return this.loadFB(document);
      };

      NavView.prototype.initFB = function() {
        var _this = this;
        this.user.set('authenticated', true);
        return window.fbAsyncInit = function() {
          FB.init({
            appId: "507951649218545",
            status: true,
            cookie: true,
            xfbml: true
          });
          return FB.getLoginStatus(function(res) {
            var accessToken, uid;
            if (res.status === "connected") {
              uid = res.authResponse.userID;
              accessToken = res.authResponse.accessToken;
              return FB.api("/me", function(res) {
                var names;
                names = {
                  first: res.first_name,
                  last: res.last_name,
                  full: res.name
                };
                _this.user.set('names', names);
                return FB.api("/me&fields=picture", function(res) {
                  _this.user.set('picture', res.picture.data.url);
                  return FB.api("/me/friends", function(res) {
                    _this.user.set('friends', res.data);
                    _this.dispatcher.trigger("update:user");
                    return console.log(_this.user.friends);
                  });
                });
              });
            } else if (res.status === "not_authorized") {
              return FB.login(function(res) {
                if (res.authResponse) {
                  return FB.api("/me", function(res) {
                    return console.log("Good to see you, " + res.name + ".");
                  });
                } else {
                  return console.log("User cancelled login or did not fully authorize.");
                }
              });
            } else {
              FB.login(function(res) {});
              if (res.authResponse) {
                return FB.api("/me", function(res) {
                  return console.log("Good to see you, " + res.name + ".");
                });
              } else {
                return console.log("User cancelled login or did not fully authorize.");
              }
            }
          });
        };
      };

      NavView.prototype.loadFB = function(d) {
        var id, js, ref;
        id = "facebook-jssdk";
        ref = d.getElementsByTagName("script")[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement("script");
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        return ref.parentNode.insertBefore(js, ref);
      };

      return NavView;

    })(BaseView);
    return NavView;
  });

}).call(this);
