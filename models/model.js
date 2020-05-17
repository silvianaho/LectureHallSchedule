"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _pool = require("./pool");

var Model = /*#__PURE__*/function () {
  function Model(table) {
    (0, _classCallCheck2["default"])(this, Model);
    this.pool = _pool.pool;
    this.table = table;
    this.pool.on('error', function (err, client) {
      return "Error, ".concat(err, ", on idle client ").concat(client);
    });
  }

  (0, _createClass2["default"])(Model, [{
    key: "select",
    value: function () {
      var _select = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(columns, clause) {
        var query;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "SELECT ".concat(columns, " FROM ").concat(this.table);
                if (clause) query += clause;
                return _context.abrupt("return", this.pool.query(query));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function select(_x, _x2) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "insertMessages",
    value: function () {
      var _insertMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(columns, values) {
        var query;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "\n    INSERT INTO ".concat(this.table, " (").concat(columns, ")\n    VALUES (").concat(values, ")\n    RETURNING ").concat(columns, "\n    "); // eslint-disable-next-line no-console

                console.log(query);
                return _context2.abrupt("return", this.pool.query(query));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function insertMessages(_x3, _x4) {
        return _insertMessages.apply(this, arguments);
      }

      return insertMessages;
    }()
  }, {
    key: "insertLecture",
    value: function () {
      var _insertLecture = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(columns, values) {
        var query;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n    INSERT INTO ".concat(this.table, " (").concat(columns, ")\n    VALUES ").concat(values, "\n    RETURNING ").concat(columns, "\n    "); // eslint-disable-next-line no-console

                console.log(query);
                return _context3.abrupt("return", this.pool.query(query));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function insertLecture(_x5, _x6) {
        return _insertLecture.apply(this, arguments);
      }

      return insertLecture;
    }()
  }]);
  return Model;
}();

var _default = Model;
exports["default"] = _default;