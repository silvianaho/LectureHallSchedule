import express from 'express';
import { validate } from '../controllers';
import {
  mapMultipleValues,
  transformQueries,
  transformQueriesCompute,
  getPageInfoOnLoad,
} from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/basic/info', getPageInfoOnLoad);

/* GET basic data viewer data */
indexRouter.get('/basic/data', transformQueries);

/* POST basic lecture page. */
indexRouter.post('/basic/insert', validate('createLecture'), mapMultipleValues);

/* GET basic result */
indexRouter.get('/basic/result', transformQueriesCompute);

export default indexRouter;
