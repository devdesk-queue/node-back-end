const restricted = require('./restricted');

module.exports = (roles = [], flag) => {
  // roles param can be a single role string (e.g. 'admin')
  // or an array of roles (e.g. ['admin', 'helper'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    restricted,
    (req, res, next) => {
      if (
        // check if user has valid role if provided
        (roles.length && roles.includes(req.user.role)) ||
        // used for tickets: checks that user is the ticket creator
        (flag === 'creator' && req.user.subject === req.body.student_id) ||
        // checks if user id is equal to the resource being accessed (used for users)
        (flag === ':id' && req.user.subject === req.params.id)
      ) {
        // authentication and authorization successful
        next();
      } else {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorised' });
      }
    }
  ];
};
