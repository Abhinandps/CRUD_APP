const express = require('express');

const {
  getAdminLoginForm,
  adminDashboard,
  adminUpdateForm,
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
router.get('/edit', adminIsLoggedIn, adminUpdateForm);
router.get('/add', adminIsLoggedIn, createUserForm);


// USER VIEW
router.get('/login', isLoggedIn, getLoginForm);
router.get('/signup', isLoggedIn, getSignUpForm);

router.get('/', isLoggedIn, getOverview);
router.get('/me', protect, getAccount);

module.exports = router;
