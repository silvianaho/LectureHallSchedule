"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMultipleValues = void 0;

var _controllers = require("../controllers");

var _require = require('express-validator'),
    validationResult = _require.validationResult;

var mapMultipleValues = function mapMultipleValues(req, res, next) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({
      errors: errors
    });
  }

  var data = req.body.data;
  var values = data.map(function (lecture) {
    // eslint-disable-next-line implicit-arrow-linebreak
    return "(".concat(parseInt(lecture.lectureId, 10), ", ").concat(parseInt(lecture.semesterId, 10), ", ").concat(parseInt(lecture.facultyId, 10), ", ").concat(parseInt(lecture.dayOfWeek, 10), ", '").concat(lecture.startTime, "', '").concat(lecture.endTime, "')");
  }).join(','); // eslint-disable-next-line operator-linebreak

  var columns = 'lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime';
  req.body = {
    data: data,
    columns: columns,
    values: values
  };
  (0, _controllers.addLecture)(req.body).then(function (result) {
    if (result.error) return next(result.error);
    return res.status(200).json(result.result);
  });
};

exports.mapMultipleValues = mapMultipleValues;