const express = require('express')
const router = express.Router()
const messagesController = require('./message_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/',authMiddleware.userAuthentication,authMiddleware.isAdmin,messagesController.allMessages)
router.get('/all-sender/:id',authMiddleware.userAuthentication,messagesController.allSenderMessages)
router.get('/all-receiver/:id',authMiddleware.userAuthentication,messagesController.allReceiverMessages)
router.get('/:id',authMiddleware.userAuthentication,messagesController.oneMessage)
router.post('/',authMiddleware.userAuthentication,messagesController.createMessage)
router.patch('/:id',authMiddleware.userAuthentication,messagesController.updateMessage)
router.delete('/:id',authMiddleware.userAuthentication,messagesController.deleteMessage)


module.exports = router