// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('../Models/userModel');

// token creation
const signToken = (id) =>
  jwt.sign(
    { id: id }, // payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

// create and send tokens
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie('jwt', token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  });
};

const createSendTokenForAdmin = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie('jwtAdmin', token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      data: user,
    },
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      throw Error();
    }

    // 2) Check if user exist and password is incorrect
    const user = await User.findOne({ email, isAdmin:  false }).select(
      '+password'
    );

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw Error();
    }

    // 3) if everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Login Credential',
    });
  }
};


exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1) Check if email and password exist
    if (!email || !password) {
      throw Error();
    }

    // 2) Check if user exist and password is incorrect
    const user = await User.findOne({ email, isAdmin:  true }).select(
      '+password'
    );

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw Error();
    }

    // 3) if everything ok, send token to client
    createSendTokenForAdmin(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Login Credential',
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.adminLogout = (req, res) => {
  res.cookie('jwtAdmin', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};



exports.protect = async (req, res, next) => {
  try {
    // 1) Checking token and check if its there
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw Error();
    }

    // 2) Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exist

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw Error();
    }

    //GRAND ACCESS TO ROUTE
    req.user = freshUser;
    res.locals.user = freshUser;

    next();
  } catch (err) {
    res.redirect('/login');
  }
};

exports.adminRouteProtect = async (req, res, next) => {
  try {
    // 1) Checking token and check if its there
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwtAdmin) {
      token = req.cookies.jwtAdmin;
    }

    if (!token) {
      throw Error();
    }

    // 2) Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exist

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      throw Error();
    }

    //GRAND ACCESS TO ROUTE
    req.user = freshUser;
    res.locals.user = freshUser;

    next();
  } catch (err) {
    res.redirect('/login');
  }
};

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};


exports.adminIsLoggedIn = async (req, res, next) => {
  if (req.cookies.jwtAdmin) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwtAdmin,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
