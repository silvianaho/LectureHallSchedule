"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _basicController = require("./basicController");

Object.keys(_basicController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _basicController[key];
    }
  });
});

var _validate = require("./validate");

Object.keys(_validate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validate[key];
    }
  });
});