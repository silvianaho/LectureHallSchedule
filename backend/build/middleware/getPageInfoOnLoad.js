"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPageInfoOnLoad = void 0;

var _controllers = require("../controllers");

var getPageInfoOnLoad = function getPageInfoOnLoad(req, res, next) {
  (0, _controllers.getPageInfo)().then(function (results) {
    if (results.error) return next(results.error);
    return res.status(200).json(results.result);
  });
};

exports.getPageInfoOnLoad = getPageInfoOnLoad;