import { getPageInfo, getTechnicianFilterInfo } from '../controllers';

export const getPageInfoOnLoad = (req, res, next) => {
  getPageInfo().then((results) => {
    if (results.error) return next(results.error);
    return res.status(200).json(results.result);
  });
};

export const getTechnicianFilterInfoOnLoad = (req, res, next) => {
  getTechnicianFilterInfo().then((results) => {
    if (results.error) return next(results.error);
    return res.status(200).json(results.result);
  });
};
