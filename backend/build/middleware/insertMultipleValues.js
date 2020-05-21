"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertMultipleValues = void 0;

var insertMultipleValues = function insertMultipleValues(req, res, next) {
  var data = req.body.data;
  var values = data.map(function (lecture) {
    return (// eslint-disable-next-line implicit-arrow-linebreak
      "(".concat(lecture.lectureId, ", ").concat(lecture.semesterId, ", ").concat(lecture.facultyId, ", ").concat(lecture.dayOfWeek, ", ").concat(lecture.startTime, ", ").concat(lecture.endTime, ")")
    );
  }).join(','); // eslint-disable-next-line operator-linebreak

  var columns = 'lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime';
  req.body = {
    columns: columns,
    values: values
  };
  next();
};

exports.insertMultipleValues = insertMultipleValues;