module.exports = async (req, res, next) => {

  if (
    // allow if user is an admin
    req.user.role === 'admin' ||
    // allow if user is the ticket creator
    req.user.subject === req.body.helper_id
  ) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorised' });
  }

};
