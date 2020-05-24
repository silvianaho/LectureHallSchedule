"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

var _require = require('express-validator'),
    body = _require.body;

var validate = function validate(method) {
  switch (method) {
    case 'createLecture':
      {
        return [body('data.*.lectureId', 'Invalid lectureId').exists().isInt().isLength({
          min: 10,
          max: 10
        }), body('data.*.semesterId', 'Invalid semesterId').exists().isInt().isLength({
          min: 10,
          max: 10
        }), body('data.*.facultyId', 'Invalid facultyId').exists().isInt().isLength({
          min: 10,
          max: 10
        }), body('data.*.dayOfWeek', 'Invalid dayOfWeek').exists().isIn([1, 2, 3, 4, 5, 6, 7]), body('data.*.startTime', 'Invalid startTime').exists().isInt().isLength({
          min: 4,
          max: 4
        }), body('data.*.endTime', 'Invalid endTime').exists().isInt().isLength({
          min: 4,
          max: 4
        })];
      }

    default:
      break;
  }

  return 0;
};

exports.validate = validate;