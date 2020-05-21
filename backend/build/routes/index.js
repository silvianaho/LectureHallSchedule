"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _controllers = require("../controllers");

var _middleware = require("../middleware");

var indexRouter = _express["default"].Router();
/* GET basic data viewer data */


indexRouter.get('/basic/data', _controllers.lectures);
/* POST basic lecture page. */

indexRouter.post('/basic/insert', _middleware.insertMultipleValues, _controllers.addLecture);
/* GET basic result */
// indexRouter.get('/basic/result', resultPage);

var _default = indexRouter;
exports["default"] = _default;