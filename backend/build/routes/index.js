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

indexRouter.get("/", function (req, res) {
  return res.json({
    message: "Welcome to JiBaBoom - TeamSOS",
    availableEndpoints: ["POST /basic/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }", "POST /advance/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }", "GET /basic/result?para1=value1&para2=value2", "GET /advance/result?para1=value1&para2=value2"]
  });
});
indexRouter.get("/basic/info", _middleware.getPageInfoOnLoad);
/* GET basic data viewer data */

indexRouter.get("/basic/data", _middleware.transformQueries);
/* POST basic lecture page. */
// @ts-ignore

indexRouter.post("/basic/insert", (0, _controllers.validate)("createLecture"), _middleware.mapMultipleValues);
/* GET basic result */

indexRouter.get("/basic/result", _middleware.transformQueriesCompute);
/* get filter info */

indexRouter.get("/advance/info", _middleware.getTechnicianFilterInfoOnLoad);
/* GET advance data viewer data */

indexRouter.get("/advance/data", _middleware.transformQueries);
/* POST advance lecture page. */
// @ts-ignore

indexRouter.post("/advance/insert", (0, _controllers.validate)("createTechnician"), _middleware.mapMultipleValues);
/* GET advance result */

indexRouter.get("/advance/result", _middleware.transformQueriesCompute);
var _default = indexRouter;
exports["default"] = _default;