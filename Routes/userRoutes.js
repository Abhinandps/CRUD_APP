const express = require('express');

const router = express.Router();

const { getUser, getMe } = require('../Controllers/userController');
const {
  protect,
  signup,
  login,
  logout,
} = require('../Controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.use(protect);

router.route('/me').get(getMe, getUser);

module.exports = router;
