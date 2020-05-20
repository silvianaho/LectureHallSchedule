/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
import Model from '../models/model';
import { intervalScheduling } from '../algo';

const basicModel = new Model('lectures');

export const getLectures = async (req, res) => {
  try {
    const data = await basicModel.select('*', `${req.query.queryString}`);
    if (data.rows.length === 0)
      res.status(404).json({ error: 'Not Found', code: 404 });
    return res.status(200).json({ lectures: data.rows });
    // res.status(200).json({ lectures: data.rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (err.errno === 'ENOTFOUND')
      res.status(500).json({ error: 'Database Error', code: 500 });
    return res.status(500).json({ error: JSON.stringify(err), code: 500 });
    // res.status(500).json({ err });
  }
};

export const addLecture = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { data, columns, values } = req.body;
  try {
    const resultData = await basicModel.insertLecture(columns, values);
    if (resultData) res.status(200).json({ result: 'success' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // duplicate record
    if (err.code === '23505')
      res.status(400).json({ error: err.detail, code: 400 });
    // missing column
    if (err.code === '42703')
      res.status(400).json({ error: 'Missing Column', code: 400 });
    // time max 2359
    if (err.code === '22008')
      res.status(400).json({ error: 'The maximum time is 2359', code: 400 });
    // database error
    if (err.errno === 'ENOTFOUND')
      res.status(500).json({ error: 'Database Error', code: 500 });
    res.status(500).json({ error: 'Internal Server Error', code: 500 });
  }
};

export const getResult = async (req, res) => {
  try {
    const data = await basicModel.select('*', `${req.query.queryString}`);
    const result = intervalScheduling(data.rows);
    if (result.length === 0) res.status(404).json({ error: 'Sorry, we could not find what you asked for', code: 404 });
    else res.status(200).json({ result });
  } catch (err) {
    res.status(200).json({ lectures: err.stack });
  }
};
