"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mapMultipleValues = require("./mapMultipleValues");

Object.keys(_mapMultipleValues).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mapMultipleValues[key];
    }
  });
});

var _transformQueries = require("./transformQueries");

Object.keys(_transformQueries).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transformQueries[key];
    }
  });
});

var _transformQueriesCompute = require("./transformQueriesCompute");

Object.keys(_transformQueriesCompute).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _transformQueriesCompute[key];
    }
  });
});

var _getPageInfoOnLoad = require("./getPageInfoOnLoad");

Object.keys(_getPageInfoOnLoad).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getPageInfoOnLoad[key];
    }
  });
});