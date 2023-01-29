const express = require('express')
const router = express.Router()
const tasksController = require('./tasks_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,tasksController.allTasks)
router.get('/all-sender-tasks/:id',authMiddleware.userAuthentication,tasksController.allTasksBySender)
router.get('/all-receiver-tasks/:id',authMiddleware.userAuthentication,tasksController.allTasksByReceiver)
router.get('/:id',authMiddleware.userAuthentication,tasksController.oneTask)
router.post('/',authMiddleware.userAuthentication,tasksController.createTask)
router.patch('/:id',authMiddleware.userAuthentication,tasksController.updateTask)
router.delete('/:id',authMiddleware.userAuthentication,tasksController.deleteTask)


module.exports = router