/* eslint-disable object-curly-newline */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
import { getLectures } from '../controllers';

export const transformQueries = (req, res, next) => {
  if (req.query) {
    const { lectureId, facultyId, semesterId, dayOfWeek } = req.query;
    let { page, pageSize } = req.query;
    // console.log(lectureId, facultyId, semesterId, dayOfWeek, page, pageSize);
    // eslint-disable-next-line no-console
    let whereClause = '';
    let limitOffsetClause = '';
    if (!lectureId && !facultyId && !semesterId && !dayOfWeek) whereClause = '';
    else {
      whereClause = 'WHERE ';
      if (lectureId) whereClause += `lectureid = ${lectureId}`;
      if (facultyId)
        whereClause += lectureId
          ? ` AND facultyId = ${facultyId}`
          : `facultyId = ${facultyId}`;
      if (semesterId)
        whereClause +=
          lectureId || facultyId
            ? ` AND semesterId = ${semesterId}`
            : `semesterId = ${semesterId}`;
      if (dayOfWeek)
        whereClause +=
          lectureId || facultyId || semesterId
            ? ` AND dayOfWeek = ${dayOfWeek}`
            : `dayOfWeek = ${dayOfWeek}`;
    }

    if (!page || !pageSize) {
      if (!page) page = 0;
      if (!pageSize) pageSize = 10;
    }
    limitOffsetClause = `LIMIT ${pageSize} OFFSET ${page * pageSize}`;
    const queryString = `${whereClause}${limitOffsetClause}`;
    req.query.queryString = queryString;

    getLectures(req.query.queryString).then((result) => {
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  }
};
