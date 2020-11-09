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
const mcache = require("memory-cache");

const cache = (duration) => (req, res, next) => {
  const key = `__express__${req.url}`;
  const cachedBody = mcache.get(key);
  // console.log("cachedBody-----------------------------");
  // console.log(mcache.get(key));
  // console.log(key);
  // console.log("cachedBody-----------------------------");
  if (cachedBody) {
    console.log("cached");
    res.json(cachedBody);
  } else {
    // console.log("test2");
    res.sendResponse = res.json;
    res.json = (body) => {
      mcache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };
    next();
  }
};

indexRouter.get("/", cache(10), (req, res) => res.json({
  message: "Welcome to JiBaBoom - TeamSOS",
  availableEndpoints: [
    "POST /basic/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }",
    "POST /advance/insert { \"data\": [ {key1: value1, key2: value2, ...} ] }",
    "GET /basic/result?para1=value1&para2=value2",
    "GET /advance/result?para1=value1&para2=value2",
  ]
}));

indexRouter.get("/basic/info", cache(10), getPageInfoOnLoad);

/* GET basic data viewer data */
indexRouter.get("/basic/data", cache(10), transformQueries);

/* POST basic lecture page. */
// @ts-ignore
indexRouter.post("/basic/insert", validate("createLecture"), mapMultipleValues);

/* GET basic result */
indexRouter.get("/basic/result", cache(10), transformQueriesCompute);

/* get filter info */
indexRouter.get("/advance/info", cache(10), getTechnicianFilterInfoOnLoad);

/* GET advance data viewer data */
indexRouter.get("/advance/data", cache(10), transformQueries);

/* POST advance lecture page. */
// @ts-ignore
indexRouter.post("/advance/insert", validate("createTechnician"), mapMultipleValues);

/* GET advance result */
indexRouter.get("/advance/result", cache(100), transformQueriesCompute);

export default indexRouter;
