"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHalls = exports.addLecture = exports.getLectures = exports.getPageInfo = exports.basicModel = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _model = _interopRequireDefault(require("../models/model"));

var _algo = require("../algo");

/* eslint-disable curly */

/* eslint-disable nonblock-statement-body-position */
var basicModel = new _model["default"]("lectures");
exports.basicModel = basicModel;

var getPageInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _yield$Promise$all, _yield$Promise$all2, facultyid, semesterid, totalCount, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Promise.all([basicModel.selectDistinct("facultyid"), basicModel.selectDistinct("semesterid"), basicModel.select("COUNT (*)")]);

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

  return function getPageInfo() {
    return _ref.apply(this, arguments);
  };
}();

exports.getPageInfo = getPageInfo;

var getLectures = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(queryString) {
    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return basicModel.select("*", "".concat(queryString));

          case 3:
            data = _context2.sent;

            if (!(data.rows.length === 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Not Found", 404),
              result: null
            }));

          case 6:
            return _context2.abrupt("return", Promise.resolve({
              error: null,
              result: data.rows
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            // eslint-disable-next-line no-console
            console.log(_context2.t0);

            if (!(_context2.t0.errno === "ENOTFOUND")) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Database Error", 500),
              result: null
            }));

          case 14:
            return _context2.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])(JSON.stringify(_context2.t0), 500),
              result: null
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function getLectures(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getLectures = getLectures;

var addLecture = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(reqData) {
    var data, columns, values, resultData;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // eslint-disable-next-line no-unused-vars
            data = reqData.data, columns = reqData.columns, values = reqData.values;
            _context3.prev = 1;
            _context3.next = 4;
            return basicModel.insert(columns, values);

          case 4:
            resultData = _context3.sent;

            if (!resultData) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", Promise.resolve({
              error: null,
              result: {
                result: "success"
              }
            }));

          case 7:
            return _context3.abrupt("return", null);

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            // eslint-disable-next-line no-console
            console.log(_context3.t0); // duplicate record

            if (!(_context3.t0.code === "23505")) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])(_context3.t0.detail, 400),
              result: null
            }));

          case 15:
            if (!(_context3.t0.code === "42703")) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Missing Column", 400),
              result: null
            }));

          case 17:
            if (!(_context3.t0.code === "22008")) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("The maximum time is 2359", 400),
              result: null
            }));

          case 19:
            if (!(_context3.t0.errno === "ENOTFOUND")) {
              _context3.next = 21;
              break;
            }

            return _context3.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Database Error", 500),
              result: null
            }));

          case 21:
            return _context3.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Internal Server Error", 500),
              result: null
            }));

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 10]]);
  }));

  return function addLecture(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addLecture = addLecture;

var getHalls = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(queryString) {
    var data, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return basicModel.select("*", "".concat(queryString));

          case 3:
            data = _context4.sent;
            result = (0, _algo.intervalScheduling)(data.rows);

            if (!(result.length === 0)) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Sorry, we could not find what you asked for", 404),
              result: null
            }));

          case 7:
            return _context4.abrupt("return", Promise.resolve({
              error: null,
              result: result
            }));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", Promise.resolve({
              error: (0, _httpErrors["default"])("Internal Server Error", 500),
              result: null
            }));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function getHalls(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getHalls = getHalls;