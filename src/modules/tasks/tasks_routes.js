const express = require('express')
const router = express.Router()
const tasksController = require('./tasks_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,tasksController.allTasks)
router.get('/all-sender-tasks/:id',authMiddleware.userAuthentication,tasksController.allTasksBySender)
router.get('/all-receiver-tasks/:id',authMiddleware.userAuthentication,tasksController.allTasksByReceiver)


module.exports = router