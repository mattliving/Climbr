// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    var User;
    User = (function(_super) {

      __extends(User, _super);

      function User() {
        return User.__super__.constructor.apply(this, arguments);
      }

      User.prototype.defaults = {
        _id: null,
        email: "",
        facebookId: "",
        googleId: "",
        name: "",
        picture: "",
        areas: [],
        routes: [],
        friends: [],
        loc: [null, null]
      };

      User.prototype.initialize = function() {};

      User.prototype.fbAuth = function() {
        var accessToken, uid;
        FB.getLoginStatus(function(res) {});
        if (res.status === "connected") {
          uid = res.authResponse.userID;
          return accessToken = res.authResponse.accessToken;
        } else if (res.status === "not_authorized") {
          return FB.login(function(response) {
            if (response.authResponse) {
              console.log("Welcome!  Fetching your information.... ");
              return FB.api("/me", function(response) {
                return console.log("Good to see you, " + response.name + ".");
              });
            } else {
              return console.log("User cancelled login or did not fully authorize.");
            }
          });
        } else {
          FB.login(function(response) {});
          if (response.authResponse) {
            console.log("Welcome!  Fetching your information.... ");
            return FB.api("/me", function(response) {
              return console.log("Good to see you, " + response.name + ".");
            });
          } else {
            return console.log("User cancelled login or did not fully authorize.");
          }
        }
      };

      User.prototype.gAuth = function() {};

      User.prototype.clear = function() {
        return this.destroy();
      };

      return User;

    })(Backbone.Model);
    return User;
  });

}).call(this);
