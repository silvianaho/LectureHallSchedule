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

    if (!facultyId || !semesterId || !dayOfWeek) {
      return res.status(400).json({
        error: "Unprocessable Entity; Invalid Query Detected",
        code: 422
      });
    }

    var whereClause = "WHERE ";
    var whereClauseConditions = [];
    whereClauseConditions.push("facultyId = ".concat(facultyId));
    whereClauseConditions.push("semesterId = ".concat(semesterId));
    whereClauseConditions.push("dayOfWeek = ".concat(dayOfWeek));
    whereClause += whereClauseConditions.join(" AND ");
    whereClause += " ORDER BY starttime ASC";
    req.query.queryString = whereClause; // console.log(clause);

    var baseUrl = req.url.split("?")[0];

    if (baseUrl === "/basic/result") {
      (0, _controllers.getHalls)(req.query.queryString).then(function (result) {
        if (result.error) return next(result.error);
        return res.status(200).json({
          result: result.result
        });
      });
    } else if (baseUrl === "/advance/result") {
      (0, _controllers.getTechSurplus)(req.query.queryString).then(function (result) {
        if (result.error) return next(result.error);
        return res.status(200).json(result.result);
      });
    }
  }
};

exports.transformQueriesCompute = transformQueriesCompute;