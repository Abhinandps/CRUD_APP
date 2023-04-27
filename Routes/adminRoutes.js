const express = require('express');

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require('../Controllers/adminController');

const {
  adminRouteProtect,
  adminLogin,
  adminLogout
} = require('../Controllers/authController');

const router = express.Router();

router.post('/login', adminLogin);
router.get('/logout', adminLogout);

router.use(adminRouteProtect);

router.get('/', getAllUsers);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.post('/addUser', createUser);
module.exports = router;
