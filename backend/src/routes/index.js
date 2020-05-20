import express from 'express';
import { getLectures, addLecture, getResult } from '../controllers';
import {
  mapMultipleValues,
  transformQueries,
  transformQueriesCompute,
} from '../middleware';

const indexRouter = express.Router();

/* GET basic data viewer data */
indexRouter.get('/basic/data', transformQueries, getLectures);

/* POST basic lecture page. */
indexRouter.post('/basic/insert', mapMultipleValues, addLecture);

/* GET basic result */
indexRouter.get('/basic/result', transformQueriesCompute, getResult);

export default indexRouter;
