// const User = require("../Models/userModel")

// HOME PAGE

exports.getHomePage = (req, res) => {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.status(200).render('index');
  }
};

// ADMIN VIEW CONTROLLERS

exports.getAdminLoginForm = (req, res) => {
  if (req.user) {
    res.redirect('/dashboard');
  } else {
    res.status(200).render('adminLogin', {
      title: 'Log into your account',
    });
  }
};


exports.adminDashboard = (req, res) => {
  if (req.user) {
    res.status(200).render('adminDashboard', {
      title: 'Log into your account',
    });
  } else {
    res.redirect('/admin/login');
  }
};



exports.createUserForm = (req, res) => {
  if (req.user) {
    res.status(200).render('createUser', {
      title: 'Create Account',
    });
  } else {
    res.redirect('/admin/login');
  }
};

// USER VIEW CONTROLLERS

exports.getLoginForm = (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.status(200).render('login', {
      title: 'Log into your account',
    });
  }
};

exports.getSignUpForm = (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.status(200).render('signup', {
      title: 'create new account',
    });
  }
};

exports.getAccount = (req, res) => {
  res.status(200).render('me', {
    title: 'my account',
    user:req.user
  });
};

exports.getOverview = (req, res) => {
  if (req.user) {
    res.status(200).render('home', {
      title: 'home',
      user:req.user
    });
  } else {
    res.redirect('/login');
  }
};
