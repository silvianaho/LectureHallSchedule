"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErrorResponse = createErrorResponse;
exports.getTechSurplus = exports.addTechnician = exports.getTechnicians = exports.advanceModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _model = _interopRequireDefault(require("../models/model"));

var _algo = require("../algo");

var _basicController = require("./basicController");

/* eslint-disable curly */

/* eslint-disable nonblock-statement-body-position */
var advanceModel = new _model["default"]("technicians");
exports.advanceModel = advanceModel;

function createErrorResponse(message, status) {
  return {
    error: (0, _httpErrors["default"])(status, message),
    result: null
  };
}

var getTechnicians = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryString) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("meow, this is getTechnicians function");
            _context.prev = 1;
            _context.next = 4;
            return advanceModel.select("*", "".concat(queryString));

          case 4:
            data = _context.sent;

            if (!(data.rows.length === 0)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", createErrorResponse("Not Found", 404));

          case 7:
            return _context.abrupt("return", {
              error: null,
              result: data.rows
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            // eslint-disable-next-line no-console
            console.log(_context.t0);

            if (!(_context.t0.errno === "ENOTFOUND")) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", createErrorResponse("Database Error", 500));

          case 15:
            return _context.abrupt("return", createErrorResponse(JSON.stringify(_context.t0), 500));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function getTechnicians(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTechnicians = getTechnicians;

var addTechnician = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(reqData) {
    var data, columns, values, resultData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("meow, this is addTechnician function"); // eslint-disable-next-line no-unused-vars

            data = reqData.data, columns = reqData.columns, values = reqData.values;
            _context2.prev = 2;
            _context2.next = 5;
            return advanceModel.insert(columns, values);

          case 5:
            resultData = _context2.sent;

            if (!resultData) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", {
              error: null,
              result: {
                result: "success"
              }
            });

          case 8:
            return _context2.abrupt("return", null);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            // eslint-disable-next-line no-console
            console.log(_context2.t0); // duplicate record

            if (!(_context2.t0.code === "23505")) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt("return", createErrorResponse(_context2.t0.detail, 400));

          case 16:
            if (!(_context2.t0.code === "42703")) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", createErrorResponse("Missing Column", 400));

          case 18:
            if (!(_context2.t0.code === "22008")) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", createErrorResponse("The maximum time is 2359", 400));

          case 20:
            if (!(_context2.t0.errno === "ENOTFOUND")) {
              _context2.next = 22;
              break;
            }

            return _context2.abrupt("return", createErrorResponse("Database Error", 500));

          case 22:
            return _context2.abrupt("return", createErrorResponse("Internal Server Error", 500));

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));

  return function addTechnician(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addTechnician = addTechnician;

var getTechSurplus = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(queryString) {
    var lectureData, technicianData, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _basicController.basicModel.select("*", "".concat(queryString));

          case 3:
            lectureData = _context3.sent;
            _context3.next = 6;
            return advanceModel.select("*", "".concat(queryString));

          case 6:
            technicianData = _context3.sent;
            result = (0, _algo.overlappingInterval)(lectureData.rows, technicianData.rows); // console.log(result);

            if (result.length === 0) createErrorResponse("Sorry, we could not find what you asked for", 404);
            return _context3.abrupt("return", {
              error: null,
              result: result
            });

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            createErrorResponse("Internal Server Error", 500);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function getTechSurplus(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getTechSurplus = getTechSurplus;