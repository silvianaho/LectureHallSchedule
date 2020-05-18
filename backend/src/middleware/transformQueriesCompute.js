/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
export const transformQueries = (req, res, next) => {
  if (req.query) {
    const {
      lectureId,
      facultyId,
      semesterId,
      dayOfWeek
    } = req.query;

    // console.log(lectureId, facultyId, semesterId, dayOfWeek, page, pageSize);
    // eslint-disable-next-line no-console
    let whereClause = '';
    if (!facultyId && !semesterId && !dayOfWeek) whereClause = '';
    else {
      whereClause = 'WHERE ';
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

    req.query.queryString = whereClause;
  }
  next();
};
