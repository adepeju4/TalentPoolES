/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const jwtExpress = require('express-jwt');
const jsonWT = require('../Utils/auth-token');
const { errorResMsg } = require('../Utils/response');

const secret = process.env.TALENT_POOL_JWT_SECRET;

exports.checkToken = async (req, res, next) => {
  const authHeader = req.headers['x-access-token'] || req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jsonWT.verifyJWT(token).then((err, decoded) => {
      if (err) {
        return errorResMsg(res, 401, 'Authentication error, invalid token');
      }
      req.decoded = decoded;
    });
  } else {
    errorResMsg(res, 401, 'Authentication error, token required');
  }
  next();
};

exports.checkAdminToken = (req, res, next) => {
  const authHeader = req.headers['x-access-token'] || req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jsonWT.verifyJWT(token).then((err, decoded) => {
      if (err) {
        return errorResMsg(res, 401, 'Authentication error, invalid token');
      }
      if (decoded.userRole !== 3) {
        return errorResMsg(res, 401, 'Authentication error, invalid token');
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return errorResMsg(res, 401, 'Authentication error, token required');
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return errorResMsg(
        res,
        401,
        'Authentication error, You are not authenticated!'
      );
    }
    // if everything is good, save to request for use in other routes !
    req.decoded = decoded;
    next();
  });
};
// Check if your are authorized for the route
exports.verifyRole = (...role_ids) => (req, res, next) => {
  if (!role_ids.includes(req.user.role_id)) {
    return next(
      res.status(403).send({
        error: `oops ${req.user.role_id} does not have permission to perform this action or access this route`,
      })
    );
  }
  next();
};

// Check if your are authorized for the route
exports.authorize = (roleIds = []) => {
  if (typeof roleIds === 'string') {
    // eslint-disable-next-line no-param-reassign
    roleIds = [roleIds];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwtExpress({ secret }),

    // authorize based on user role
    (req, res, next) => {
      if (roleIds.length && !roleIds.includes(req.user.userRole)) {
        // user's role is not authorized
        return res.status(401).json({
          message: `User Role: ${req.user.userRole} does not have permission to perform this action or access this route`,
        });
      }

      // authentication and authorization successful
      next();
    },
  ];
};
