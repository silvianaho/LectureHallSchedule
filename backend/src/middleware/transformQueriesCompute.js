/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
import { getHalls, getTechSurplus } from "../controllers";

export const transformQueriesCompute = (req, res, next) => {
  if (req.query) {
    const { facultyId, semesterId, dayOfWeek } = req.query;

    if (!facultyId || !semesterId || !dayOfWeek) {
      return res.status(400).json({ error: "Unprocessable Entity; Invalid Query Detected", code: 422 })
    }

    let whereClause = "WHERE ";
    const whereClauseConditions = [];
    whereClauseConditions.push("facultyId = ".concat(facultyId));
    whereClauseConditions.push("semesterId = ".concat(semesterId));
    whereClauseConditions.push("dayOfWeek = ".concat(dayOfWeek));
    whereClause += whereClauseConditions.join(" AND ");
    whereClause += " ORDER BY starttime ASC";

    req.query.queryString = whereClause;
    // console.log(clause);
    const baseUrl = req.url.split("?")[0];

    if (baseUrl === "/basic/result") {
      getHalls(req.query.queryString).then((result) => {
        if (result.error) return next(result.error);
        return res.status(200).json({ result: result.result });
      });
    } else if (baseUrl === "/advance/result") {
      getTechSurplus(req.query.queryString).then((result) => {
        if (result.error) return next(result.error);
        return res.status(200).json(result.result);
      });
    }
  }
};
