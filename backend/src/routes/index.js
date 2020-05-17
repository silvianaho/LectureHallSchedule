import express from 'express';
import {
  getLectures,
  addLecture,
  // resultPage
} from '../controllers';
import { insertMultipleValues, transformQueries } from '../middleware';

const indexRouter = express.Router();

/* GET basic data viewer data */
indexRouter.get('/basic/data', transformQueries, getLectures);

/* POST basic lecture page. */
indexRouter.post('/basic/insert', insertMultipleValues, addLecture);

/* GET basic result */
// indexRouter.get('/basic/result', resultPage);

export default indexRouter;
