// import moment from 'moment';

export const mapMultipleValues = (req, res, next) => {
  const { data } = req.body;
  const values = data
    .map(
      (lecture) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        `(${parseInt(lecture.lectureId, 10)}, ${parseInt(
          lecture.semesterId,
          10
        )}, ${parseInt(lecture.facultyId, 10)}, ${parseInt(
          lecture.dayOfWeek,
          10
        )}, '${lecture.startTime}', '${lecture.endTime}')`
    )
    .join(',');
  // eslint-disable-next-line operator-linebreak
  const columns =
    'lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime';
  req.body = { data, columns, values };
  next();
  /*
(req, res, next) => {
    const input = // extract req input
    const {error, result} = controller.doSomethingWithInput(input)
    if (error) return next(error)
    res.status(200).json(result);
}
 */
};