import Model from '../models/model';

const basicModel = new Model('lectures');

export const getLectures = async (req, res) => {
  try {
    const data = await basicModel.select('*', `${req.query.queryString}`);
    res.status(200).json({ lectures: data.rows });
  } catch (err) {
    res.status(200).json({ lectures: err.stack });
  }
};

export const addLecture = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { data, columns, values } = req.body;
  try {
    const resultData = await basicModel.insertLecture(columns, values);
    res.status(200).json({ messages: resultData.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

export const getResult = async (req, res) => {
  try {
    const data = await basicModel.select('*', `${req.query.queryString}`);
    // computation goes here
    res.status(200).json({ lectures: data.rows });
  } catch (err) {
    res.status(200).json({ lectures: err.stack });
  }
};
