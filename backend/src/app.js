import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
// import expressValidator from 'express-validator';
import cors from 'cors';
import indexRouter from './routes/index';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(expressValidator());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('meow, this is an error');
  res.status(error.status || 500).json({
    error: error.message,
    code: error.status,
  });
});

export default app;
