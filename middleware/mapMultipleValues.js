"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMultipleValues = void 0;

var _controllers = require("../controllers");

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var mapMultipleValues = function mapMultipleValues(req, res, next) {
  if (req.body.data.length === 0) {
    return res.status(400).json({
      error: "Unprocessable Entity; Empty Input Detected",
      code: 422
    });
  }

  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      code: 422
    });
  }

  var data = req.body.data;
  var values = data.map(function (item) {
    if (item.lectureId) item.itemId = item.lectureId;else if (item.technicianId) item.itemId = item.technicianId; // eslint-disable-next-line implicit-arrow-linebreak

    return "(".concat(parseInt(item.itemId, 10), ", \n        ").concat(parseInt(item.semesterId, 10), ", \n        ").concat(parseInt(item.facultyId, 10), ", \n        ").concat(parseInt(item.dayOfWeek, 10), ", \n        '").concat(item.startTime, "', \n        '").concat(item.endTime, "')");
  }).join(",");
  var columns = "";

  if (req.url === "/basic/insert") {
    columns = "lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime";
    req.body = {
      data: data,
      columns: columns,
      values: values
    };
    (0, _controllers.addLecture)(req.body).then(function (result) {
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  } else if (req.url === "/advance/insert") {
    columns = "technicianId, semesterId, facultyId, dayOfWeek, startTime, endTime";
    req.body = {
      data: data,
      columns: columns,
      values: values
    };
    (0, _controllers.addTechnician)(req.body).then(function (result) {
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  }

  return null;
};

exports.mapMultipleValues = mapMultipleValues;