const express = require('express')
const router = express.Router()
const usersController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,usersController.allUsers)
router.get('/:id',authMiddleware.userAuthentication,usersController.oneUser)
router.post('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,usersController.createUser)
router.patch('/:id',authMiddleware.userAuthentication,usersController.updateUser)
router.delete('/:id',authMiddleware.userAuthentication,usersController.deleteUser)

module.exports = router