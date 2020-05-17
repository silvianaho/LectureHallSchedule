import express from 'express';
import {
  allLectures,
  addLecture,
  // resultPage
} from '../controllers';
import { insertMultipleValues } from '../middleware';

const indexRouter = express.Router();

/* GET basic data viewer data */
indexRouter.get('/basic', allLectures);

/* POST basic lecture page. */
indexRouter.post('/basic/insert', insertMultipleValues, addLecture);

/* GET basic result */
// indexRouter.get('/basic/result', resultPage);

export default indexRouter;
