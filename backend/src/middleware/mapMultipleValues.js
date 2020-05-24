import { addLecture } from '../controllers';

const { validationResult } = require('express-validator');

export const mapMultipleValues = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ errors });
  }
  const { data } = req.body;
  const values = data
    .map((lecture) => {
      // eslint-disable-next-line implicit-arrow-linebreak
      return `(${parseInt(lecture.lectureId, 10)}, ${parseInt(
        lecture.semesterId,
        10
      )}, ${parseInt(lecture.facultyId, 10)}, ${parseInt(
        lecture.dayOfWeek,
        10
      )}, '${lecture.startTime}', '${lecture.endTime}')`;
    })
    .join(',');
  // eslint-disable-next-line operator-linebreak
  const columns =
    'lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime';
  req.body = { data, columns, values };

  addLecture(req.body).then((result) => {
    if (result.error) return next(result.error);
    return res.status(200).json(result.result);
  });
};
