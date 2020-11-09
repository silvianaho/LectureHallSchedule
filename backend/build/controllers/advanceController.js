"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErrorResponse = createErrorResponse;
exports.getTechSurplus = exports.addTechnician = exports.getTechnicians = exports.getTechnicianFilterInfo = exports.advanceModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

var getTechnicianFilterInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _yield$Promise$all, _yield$Promise$all2, facultyid, semesterid, totalCount, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all([advanceModel.selectDistinct("facultyid"), advanceModel.selectDistinct("semesterid"), advanceModel.select("COUNT (*)")]);

          case 3:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 3);
            facultyid = _yield$Promise$all2[0];
            semesterid = _yield$Promise$all2[1];
            totalCount = _yield$Promise$all2[2];
            data = {
              facultyid: facultyid.rows,
              semesterid: semesterid.rows,
              totalCount: totalCount.rows[0].count
            };

            if (!(data.totalCount === 0)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Not Found", 404),
              result: null
            }));

          case 11:
            return _context.abrupt("return", Promise.resolve({
              error: null,
              result: data
            }));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);

            if (!(_context.t0.errno === "ENOTFOUND")) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Database Error", 500),
              result: null
            }));

          case 18:
            return _context.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])(JSON.stringify(_context.t0), 500),
              result: null
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function getTechnicianFilterInfo() {
    return _ref.apply(this, arguments);
  };
}();

exports.getTechnicianFilterInfo = getTechnicianFilterInfo;

var getTechnicians = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryString) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("meow, this is getTechnicians function");
            _context2.prev = 1;
            _context2.next = 4;
            return advanceModel.select("*", "".concat(queryString));

          case 4:
            data = _context2.sent;

            if (!(data.rows.length === 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", createErrorResponse("Not Found", 404));

          case 7:
            return _context2.abrupt("return", {
              error: null,
              result: {
                data: data.rows
              }
            });

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            // eslint-disable-next-line no-console
            console.log(_context2.t0);

            if (!(_context2.t0.errno === "ENOTFOUND")) {
              _context2.next = 15;
              break;
            }

            return _context2.abrupt("return", createErrorResponse("Database Error", 500));

          case 15:
            return _context2.abrupt("return", createErrorResponse(JSON.stringify(_context2.t0), 500));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 10]]);
  }));

  return function getTechnicians(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTechnicians = getTechnicians;

var addTechnician = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(reqData) {
    var data, columns, values, resultData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("meow, this is addTechnician function"); // eslint-disable-next-line no-unused-vars

            data = reqData.data, columns = reqData.columns, values = reqData.values;
            _context3.prev = 2;
            _context3.next = 5;
            return advanceModel.insert(columns, values);

          case 5:
            resultData = _context3.sent;

            if (!resultData) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", {
              error: null,
              result: {
                result: "success"
              }
            });

          case 8:
            return _context3.abrupt("return", null);

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);
            // eslint-disable-next-line no-console
            console.log(_context3.t0); // duplicate record

            if (!(_context3.t0.code === "23505")) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt("return", createErrorResponse(_context3.t0.detail, 400));

          case 16:
            if (!(_context3.t0.code === "42703")) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", createErrorResponse("Missing Column", 400));

          case 18:
            if (!(_context3.t0.code === "22008")) {
              _context3.next = 20;
              break;
            }

            return _context3.abrupt("return", createErrorResponse("The maximum time is 2359", 400));

          case 20:
            if (!(_context3.t0.errno === "ENOTFOUND")) {
              _context3.next = 22;
              break;
            }

            return _context3.abrupt("return", createErrorResponse("Database Error", 500));

          case 22:
            return _context3.abrupt("return", createErrorResponse("Internal Server Error", 500));

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 11]]);
  }));

  return function addTechnician(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addTechnician = addTechnician;

var getTechSurplus = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(queryString) {
    var lectureData, technicianData, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _basicController.basicModel.select("*", "".concat(queryString));

          case 3:
            lectureData = _context4.sent;
            _context4.next = 6;
            return advanceModel.select("*", "".concat(queryString));

          case 6:
            technicianData = _context4.sent;
            result = (0, _algo.overlappingInterval)(lectureData.rows, technicianData.rows);

            if (!(result.length === 0)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", createErrorResponse("Sorry, we could not find what you asked for", 404));

          case 10:
            return _context4.abrupt("return", {
              error: null,
              result: result
            });

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);

            if (!(_context4.t0.code === "53300")) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", createErrorResponse("DBERROR: Too Many Connections", 500));

          case 17:
            return _context4.abrupt("return", createErrorResponse("Internal Server Error", 500));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 13]]);
  }));

  return function getTechSurplus(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getTechSurplus = getTechSurplus;