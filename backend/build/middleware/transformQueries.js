"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformQueries = void 0;

var _controllers = require("../controllers");

/* eslint-disable object-curly-newline */

/* eslint-disable curly */

/* eslint-disable nonblock-statement-body-position */

/* eslint-disable operator-linebreak */
var transformQueries = function transformQueries(req, res, next) {
  if (req.query) {
    var _req$query = req.query,
        facultyId = _req$query.facultyId,
        semesterId = _req$query.semesterId,
        dayOfWeek = _req$query.dayOfWeek;
    var _req$query2 = req.query,
        page = _req$query2.page,
        pageSize = _req$query2.pageSize; // console.log(lectureId, facultyId, semesterId, dayOfWeek, page, pageSize);
    // eslint-disable-next-line no-console

    var whereClause = '';
    var limitOffsetClause = '';
    if (!facultyId && !semesterId && !dayOfWeek) whereClause = '';else {
      whereClause = 'WHERE ';
      if (facultyId) whereClause += "facultyId = ".concat(facultyId);
      if (semesterId) whereClause += facultyId ? " AND semesterId = ".concat(semesterId) : "semesterId = ".concat(semesterId);
      if (dayOfWeek) whereClause += facultyId || semesterId ? " AND dayOfWeek = ".concat(dayOfWeek) : "dayOfWeek = ".concat(dayOfWeek);
    }

    if (!page || !pageSize) {
      if (!page) page = 0;
      if (!pageSize) pageSize = 10;
    }

    limitOffsetClause = "LIMIT ".concat(pageSize, " OFFSET ").concat(page * pageSize);
    var queryString = "".concat(whereClause).concat(limitOffsetClause);
    req.query.queryString = queryString;
    (0, _controllers.getLectures)(req.query.queryString).then(function (result) {
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  }
};

exports.transformQueries = transformQueries;