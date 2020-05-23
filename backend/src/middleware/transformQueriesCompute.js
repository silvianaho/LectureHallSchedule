/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
import { getResult } from '../controllers';

export const transformQueriesCompute = (req, res, next) => {
  if (req.query) {
    const { facultyId, semesterId, dayOfWeek } = req.query;

    let clause = '';
    if (!facultyId && !semesterId && !dayOfWeek) clause = '';
    else {
      clause = 'WHERE ';
      if (facultyId) clause += `facultyId = ${facultyId}`;
      if (semesterId)
        clause += facultyId
          ? ` AND semesterId = ${semesterId}`
          : `semesterId = ${semesterId}`;
      if (dayOfWeek)
        clause +=
          facultyId || semesterId
            ? ` AND dayOfWeek = ${dayOfWeek}`
            : `dayOfWeek = ${dayOfWeek}`;
      clause += ' ORDER BY starttime ASC';
    }

    req.query.queryString = clause;
    console.log(clause);
    getResult(req.query.queryString).then((result) => {
      console.log(result.result);
      
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  }
};
