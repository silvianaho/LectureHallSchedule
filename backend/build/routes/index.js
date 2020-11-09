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

var mcache = require("memory-cache");

var cache = function cache(duration) {
  return function (req, res, next) {
    var key = "__express__".concat(req.url);
    var cachedBody = mcache.get(key); // console.log("cachedBody-----------------------------");
    // console.log(mcache.get(key));
    // console.log(key);
    // console.log("cachedBody-----------------------------");

    if (cachedBody) {
      console.log("cached");
      res.json(cachedBody);
    } else {
      // console.log("test2");
      res.sendResponse = res.json;

      res.json = function (body) {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };

      next();
    }
  };
};

indexRouter.get("/", cache(10), function (req, res) {
  return res.json({
    message: "Welcome to JiBaBoom - TeamSOS",
    availableEndpoints: ["POST /basic/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }", "POST /advance/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }", "GET /basic/result?para1=value1&para2=value2", "GET /advance/result?para1=value1&para2=value2"]
  });
});
indexRouter.get("/basic/info", cache(10), _middleware.getPageInfoOnLoad);
/* GET basic data viewer data */

indexRouter.get("/basic/data", cache(10), _middleware.transformQueries);
/* POST basic lecture page. */
// @ts-ignore

indexRouter.post("/basic/insert", (0, _controllers.validate)("createLecture"), _middleware.mapMultipleValues);
/* GET basic result */

indexRouter.get("/basic/result", cache(10), _middleware.transformQueriesCompute);
/* get filter info */

indexRouter.get("/advance/info", cache(10), _middleware.getTechnicianFilterInfoOnLoad);
/* GET advance data viewer data */

indexRouter.get("/advance/data", cache(10), _middleware.transformQueries);
/* POST advance lecture page. */
// @ts-ignore

indexRouter.post("/advance/insert", (0, _controllers.validate)("createTechnician"), _middleware.mapMultipleValues);
/* GET advance result */

indexRouter.get("/advance/result", cache(100), _middleware.transformQueriesCompute);
var _default = indexRouter;
exports["default"] = _default;