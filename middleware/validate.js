module.exports = validator => {
  return (req, res, next) => {
    const { error } = validator(req.body);

    if (error) return res.status(422).json({
      message: error.details[0].message
    });

    next();
  };
};
