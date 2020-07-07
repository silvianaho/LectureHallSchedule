import { addLecture, addTechnician } from "../controllers";

const { validationResult } = require("express-validator");

export const mapMultipleValues = (req, res, next) => {
  if (req.body.data.length === 0) {
    return res.status(200).json({ result: "success" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    console.log(errors.array());
    return res.status(422).json({ error: errors.array()[0].msg, code: 400 });
  }
  const { data } = req.body;
  const values = data
    .map(
      (item) => {
        if (item.lectureId) item.itemId = item.lectureId; 
        else if (item.technicianId) item.itemId = item.technicianId;

        // eslint-disable-next-line implicit-arrow-linebreak
        return `(${parseInt(item.itemId, 10)}, 
        ${parseInt(item.semesterId, 10)}, 
        ${parseInt(item.facultyId, 10)}, 
        ${parseInt(item.dayOfWeek, 10)}, 
        '${item.startTime}', 
        '${item.endTime}')`
      }
    )
    .join(",");

  let columns = "";
  if (req.url === "/basic/insert") {
    columns = "lectureId, semesterId, facultyId, dayOfWeek, startTime, endTime";
    req.body = { data, columns, values };
    addLecture(req.body).then((result) => {
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  } else if (req.url === "/advance/insert") {
    console.log(values)
    columns = "technicianId, semesterId, facultyId, dayOfWeek, startTime, endTime";
    req.body = { data, columns, values };
    addTechnician(req.body).then((result) => {
      if (result.error) return next(result.error);
      return res.status(200).json(result.result);
    });
  }
};
