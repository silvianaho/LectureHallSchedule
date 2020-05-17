import express from 'express';
import {
  indexPage,
  messagesPage,
  addMessage,
  allLectures,
  addLecture,
  // resultPage
} from '../controllers';
import { modifyMessage, performAsyncAction, insertMultipleValues } from '../middleware';

const indexRouter = express.Router();

/* GET home page data */
indexRouter.get('/', indexPage);

/* GET test page. */
indexRouter.get('/messages', messagesPage);

/* POST test message. */
indexRouter.post('/messages', modifyMessage, performAsyncAction, addMessage);

/* GET basic data viewer data */
indexRouter.get('/basic', allLectures);

/* POST basic lecture page. */
indexRouter.post('/basic/insert', insertMultipleValues, addLecture);

/* GET basic result */
// indexRouter.get('/basic/result', resultPage);

export default indexRouter;
