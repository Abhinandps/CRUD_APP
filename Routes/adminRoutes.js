const express = require('express')
const { adminLogin , getAllUsers,createUser, updateUser, deleteUser} = require('../Controllers/adminController')
const router = express.Router()


router.post('/login',adminLogin)

router.get('/',getAllUsers)
    
router.route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

router.post('/adduser',createUser)
module.exports = router