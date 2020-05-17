export const insertMultipleValues = (req, res, next) => {
  const { data } = req.body;
  const values = data
    .map(
      (lecture) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `(${lecture.lectureId}, ${lecture.semesterId}, ${lecture.facultyId}, ${lecture.dayOfWeek}, ${lecture.startTime}, ${lecture.endTime})`
    )
    .join(',');
  // eslint-disable-next-line operator-linebreak
  const columns =
    'lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime';
  req.body = { columns, values };
  next();
};
