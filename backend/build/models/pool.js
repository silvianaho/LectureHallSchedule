"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _settings = require("../settings");

_dotenv["default"].config();

var config = {
  connectionString: _settings.connectionString,
  // maximum number of clients the pool should contain
  max: 10
};
var pool = new _pg.Pool(config);
exports.pool = pool;