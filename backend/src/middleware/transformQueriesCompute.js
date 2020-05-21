/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable operator-linebreak */
export const transformQueriesCompute = (req, res, next) => {
  if (req.query) {
    const { facultyId, semesterId, dayOfWeek } = req.query;

    // console.log(lectureId, facultyId, semesterId, dayOfWeek, page, pageSize);
    // eslint-disable-next-line no-console
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
  }
  next();
};
