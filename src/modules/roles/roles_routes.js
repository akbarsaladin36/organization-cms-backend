const express = require('express')
const router = express.Router()
const rolesController = require('./roles_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,rolesController.allRoles)
router.get('/:id',authMiddleware.userAuthentication,authMiddleware.isAdmin,rolesController.oneRole)
router.post('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,rolesController.createNewRole)
router.patch('/:id',authMiddleware.userAuthentication,authMiddleware.isAdmin,rolesController.updateRole)
router.delete('/:id',authMiddleware.userAuthentication,authMiddleware.isAdmin,rolesController.deleteRole)

module.exports = router