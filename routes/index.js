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

indexRouter.get("/basic/info", _middleware.getPageInfoOnLoad);
/* GET basic data viewer data */

indexRouter.get("/basic/data", _middleware.transformQueries);
/* POST basic lecture page. */
// @ts-ignore

indexRouter.post("/basic/insert", (0, _controllers.validate)("createLecture"), _middleware.mapMultipleValues);
/* GET basic result */

indexRouter.get("/basic/result", _middleware.transformQueriesCompute);
/* GET advance data viewer data */

indexRouter.get("/advance/data", _middleware.transformQueries);
/* POST advance lecture page. */
// @ts-ignore

indexRouter.post("/advance/insert", (0, _controllers.validate)("createTechnician"), _middleware.mapMultipleValues);
/* GET advance result */

indexRouter.get("/advance/result", _middleware.transformQueriesCompute);
var _default = indexRouter;
exports["default"] = _default;