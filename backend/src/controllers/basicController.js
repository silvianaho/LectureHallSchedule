import Model from '../models/model';

const basicModel = new Model('lectures');

export const allLectures = async (req, res) => {
  try {
    const data = await basicModel.select('*');
    res.status(200).json({ lectures: data.rows });
  } catch (err) {
    res.status(200).json({ lectures: err.stack });
  }
};

export const addLecture = async (req, res) => {
  const { columns, values } = req.body;
  try {
    const data = await basicModel.insertLecture(columns, values);
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
