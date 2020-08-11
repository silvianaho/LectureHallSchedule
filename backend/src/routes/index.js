import express from "express";
import { validate } from "../controllers";
import {
  mapMultipleValues,
  transformQueries,
  transformQueriesCompute,
  getPageInfoOnLoad,
  getTechnicianFilterInfoOnLoad
} from "../middleware";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => res.json({
  message: "Welcome to JiBaBoom - TeamSOS",
  availableEndpoints: [
    "POST /basic/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }",
    "POST /advance/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }",
    "GET /basic/result?para1=value1&para2=value2",
    "GET /advance/result?para1=value1&para2=value2",
  ]
}));

indexRouter.get("/basic/info", getPageInfoOnLoad);

/* GET basic data viewer data */
indexRouter.get("/basic/data", transformQueries);

/* POST basic lecture page. */
// @ts-ignore
indexRouter.post("/basic/insert", validate("createLecture"), mapMultipleValues);

/* GET basic result */
indexRouter.get("/basic/result", transformQueriesCompute);

/* get filter info */
indexRouter.get("/advance/info", getTechnicianFilterInfoOnLoad);

/* GET advance data viewer data */
indexRouter.get("/advance/data", transformQueries);

/* POST advance lecture page. */
// @ts-ignore
indexRouter.post("/advance/insert", validate("createTechnician"), mapMultipleValues);

/* GET advance result */
indexRouter.get("/advance/result", transformQueriesCompute);

export default indexRouter;
