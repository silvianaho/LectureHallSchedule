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
    this.pool.on("error", function (err, client) {
      return "Error, ".concat(err, ", on idle client ").concat(client);
    });
  }

  (0, _createClass2["default"])(Model, [{
    key: "selectDistinct",
    value: function () {
      var _selectDistinct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(columns) {
        var query;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "\n  SELECT\n    DISTINCT ".concat(columns, "\n  FROM\n    ").concat(this.table, "\n  GROUP BY ").concat(columns, ";");
                return _context.abrupt("return", this.pool.query(query));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function selectDistinct(_x) {
        return _selectDistinct.apply(this, arguments);
      }

      return selectDistinct;
    }()
  }, {
    key: "select",
    value: function () {
      var _select = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(columns) {
        var clause,
            query,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                clause = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : "";
                query = "SELECT ".concat(columns, " FROM ").concat(this.table, " ");
                if (clause) query += clause;
                return _context2.abrupt("return", this.pool.query(query));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function select(_x2) {
        return _select.apply(this, arguments);
      }

      return select;
    }()
  }, {
    key: "insert",
    value: function () {
      var _insert = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(columns, values) {
        var query;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "\n    INSERT INTO ".concat(this.table, " (").concat(columns, ")\n    VALUES ").concat(values, "\n    ");
                return _context3.abrupt("return", this.pool.query(query));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function insert(_x3, _x4) {
        return _insert.apply(this, arguments);
      }

      return insert;
    }()
  }]);
  return Model;
}();

var _default = Model;
exports["default"] = _default;