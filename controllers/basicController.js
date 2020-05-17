"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addLecture = exports.lectures = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _model = _interopRequireDefault(require("../models/model"));

var basicModel = new _model["default"]('lectures');

var lectures = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, lectureId, facultyId, semesterId, dayOfWeek, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, lectureId = _req$query.lectureId, facultyId = _req$query.facultyId, semesterId = _req$query.semesterId, dayOfWeek = _req$query.dayOfWeek;
            _context.prev = 1;
            _context.next = 4;
            return basicModel.select('*');

          case 4:
            data = _context.sent;
            res.status(200).json({
              lectures: data.rows
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            res.status(200).json({
              lectures: _context.t0.stack
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function lectures(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.lectures = lectures;

var addLecture = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, columns, values, data;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, columns = _req$body.columns, values = _req$body.values;
            _context2.prev = 1;
            _context2.next = 4;
            return basicModel.insertLecture(columns, values);

          case 4:
            data = _context2.sent;
            res.status(200).json({
              messages: data.rows
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(200).json({
              messages: _context2.t0.stack
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function addLecture(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.addLecture = addLecture;