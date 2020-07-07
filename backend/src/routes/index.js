import express from "express";
import { validate } from "../controllers";
import {
  mapMultipleValues,
  transformQueries,
  transformQueriesCompute,
  getPageInfoOnLoad,
} from "../middleware";

const indexRouter = express.Router();

indexRouter.get("/basic/info", getPageInfoOnLoad);

/* GET basic data viewer data */
indexRouter.get("/basic/data", transformQueries);

/* POST basic lecture page. */
// @ts-ignore
indexRouter.post("/basic/insert", validate("createLecture"), mapMultipleValues);

/* GET basic result */
indexRouter.get("/basic/result", transformQueriesCompute);

/* GET advance data viewer data */
indexRouter.get("/advance/data", transformQueries);

/* POST advance lecture page. */
// @ts-ignore
indexRouter.post("/advance/insert", validate("createTechnician"), mapMultipleValues);

/* GET advance result */
// indexRouter.get("/advance/result", transformQueriesCompute);

export default indexRouter;
