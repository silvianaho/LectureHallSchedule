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

    var whereClause = "";
    var limitOffsetClause = "";

    if (facultyId || semesterId || dayOfWeek) {
      whereClause = "WHERE ";
      var whereClauseConditions = [];
      if (facultyId) whereClauseConditions.push("facultyId = ".concat(facultyId));
      if (semesterId) whereClauseConditions.push("semesterId = ".concat(semesterId));
      if (dayOfWeek) whereClauseConditions.push("dayOfWeek = ".concat(dayOfWeek));
      whereClause += whereClauseConditions.join(" AND ");
    }

    if (!page || !pageSize) {
      if (!page) page = 0;
      if (!pageSize) pageSize = 10;
    }

    limitOffsetClause = "LIMIT ".concat(pageSize, " OFFSET ").concat(page * pageSize);
    var queryString = "".concat(whereClause, " ").concat(limitOffsetClause);
    req.query.queryString = queryString;
    var baseUrl = req.url.split("?")[0];

    if (baseUrl === "/basic/data") {
      (0, _controllers.getLectures)(req.query.queryString).then(function (result) {
        if (result.error) return next(result.error);
        return res.status(200).json(result.result);
      });
    } else if (baseUrl === "/advance/data") {
      (0, _controllers.getTechnicians)(req.query.queryString).then(function (result) {
        if (result.error) return next(result.error);
        return res.status(200).json(result.result);
      });
    }
  }
};

exports.transformQueries = transformQueries;