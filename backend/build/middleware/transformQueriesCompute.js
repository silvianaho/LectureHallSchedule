"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformQueriesCompute = void 0;

var _controllers = require("../controllers");

/* eslint-disable curly */

/* eslint-disable nonblock-statement-body-position */

/* eslint-disable operator-linebreak */
var transformQueriesCompute = function transformQueriesCompute(req, res, next) {
  if (req.query) {
    var _req$query = req.query,
        facultyId = _req$query.facultyId,
        semesterId = _req$query.semesterId,
        dayOfWeek = _req$query.dayOfWeek;
    var clause = '';
    if (!facultyId && !semesterId && !dayOfWeek) clause = '';else {
      clause = 'WHERE ';
      if (facultyId) clause += "facultyId = ".concat(facultyId);
      if (semesterId) clause += facultyId ? " AND semesterId = ".concat(semesterId) : "semesterId = ".concat(semesterId);
      if (dayOfWeek) clause += facultyId || semesterId ? " AND dayOfWeek = ".concat(dayOfWeek) : "dayOfWeek = ".concat(dayOfWeek);
      clause += ' ORDER BY starttime ASC';
    }
    req.query.queryString = clause;
    console.log(clause);
    (0, _controllers.getResult)(req.query.queryString).then(function (result) {
      console.log(result.result);
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  }
};

exports.transformQueriesCompute = transformQueriesCompute;