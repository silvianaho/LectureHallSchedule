export const validate = (req, res, next) => {
  const { data } = req.body;
  next();
};
