const express = require('express');

const {
  getHomePage,
  getAdminLoginForm,
  adminDashboard,
  getLoginForm,
  getAccount,
  getSignUpForm,
  getOverview,
  createUserForm
} = require('../Controllers/viewsController');

const {
  protect,
  isLoggedIn,
  adminIsLoggedIn,
//   adminRouteProtect,
} = require('../Controllers/authController');

const router = express.Router();

// ADMIN VIEW
router.get('/admin/login', adminIsLoggedIn,getAdminLoginForm);
router.get('/dashboard', adminIsLoggedIn, adminDashboard);
router.get('/add', adminIsLoggedIn, createUserForm);


// USER VIEW
router.get('/login', isLoggedIn, getLoginForm);
router.get('/signup', isLoggedIn, getSignUpForm);

router.get('/', isLoggedIn, getOverview);
router.get('/me', protect, getAccount);


// INDEX

router.get('/home',isLoggedIn,adminIsLoggedIn,getHomePage)

module.exports = router;
