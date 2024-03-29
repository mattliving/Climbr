// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone"], function($, _, Backbone) {
    var BaseView;
    BaseView = (function(_super) {

      __extends(BaseView, _super);

      function BaseView() {
        return BaseView.__super__.constructor.apply(this, arguments);
      }

      BaseView.prototype.initialize = function() {
        this.model.on("change", this.render, this);
        return this.model.on("destroy", this.cleanup, this);
      };

      BaseView.prototype.postInitialize = function() {};

      BaseView.prototype.postRender = function() {};

      BaseView.prototype.cleanup = function() {
        this.undelegateEvents();
        return this.remove();
      };

      return BaseView;

    })(Backbone.View);
    return BaseView;
  });

}).call(this);
