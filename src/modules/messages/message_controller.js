const helper = require('../../helpers/helper')
const messagesModel = require('./message_model')

module.exports = {
    allMessages: async (req,res) => {
        try {
            const result = await messagesModel.getAllMessages();
            // console.log(result)
            return helper.response(res,200,'All messages is succesfully showed',result)
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    allSenderMessages: async (req,res) => {
        try {
            const { id } = req.params
            const allSenderMessages = await messagesModel.getAllMessagesBySender(id)
            const sender_user = await messagesModel.getUsersDataById(id)
            const result = allSenderMessages.map((message)=>{
                const sender = sender_user.find(data => data.user_id == message.sender_id)
                if(sender) {
                    return {
                        ...message,
                        ...sender
                    }
                }
            })
            if(result.length>0) {
                return helper.response(res,200,`All messages by sender id ${id} is succesfully displayed!`,result)
            } else {
                return helper.response(res,200,`All messages by sender id ${id} is empty!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    allReceiverMessages: async (req,res) => {
        try {
            const { id } = req.params
            const allReceiverMessages = await messagesModel.getAllMessagesByReceiver(id)
            const receiver_user = await messagesModel.getUsersDataById(id)
            const result = allReceiverMessages.map((message)=>{
                const receiver = receiver_user.find(data => data.user_id == message.receiver_id)
                if(receiver) {
                    return {
                        ...message,
                        ...receiver
                    }
                }
            })
            if(result.length>0) {
                return helper.response(res,200,`All messages by receiver id ${id} is succesfully displayed`,result)
            } else {
                return helper.response(res,200,`All messages by sender id ${id} is empty!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    oneMessage: async (req,res) => {
        try {
            const { id } = req.params
            const checkMessage = await messagesModel.getOneMessageData(id)
            if(checkMessage.length>0) {
                return helper.response(res,200,`A message id ${id} is succesfully showed`,checkMessage)
            } else {
                return helper.response(res,400,`A message id ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    createMessage: async (req,res) => {
        try {
            const { receiverId,messageTitle,messageDescription } = req.body
            const setData = {
                sender_id: req.decodeToken.user_id,
                receiver_id: receiverId,
                message_title: messageTitle,
                message_description: messageDescription
            }
            const result = await messagesModel.createOneMessageData(setData)
            return helper.response(res,200,'A new message is succesfully sent!',result)
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    updateMessage: async (req,res) => {
        try {
            const { id } = req.params
            const { messageTitle, messageDescription } = req.body
            const checkMessage = await messagesModel.getOneMessageData(id)
            if(checkMessage.length>0) {
                const setData = {
                    message_title: messageTitle,
                    message_description: messageDescription
                }
                const result = await messagesModel.updateOneMessageData(setData,id)
                return helper.response(res,200,`The message id ${id} is succesfully updated!`,result)
            } else {
                return helper.response(res,400,`The message id ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    deleteMessage: async (req,res) => {
        try {
            const { id } = req.params
            const checkMessage = await messagesModel.getOneMessageData(id)
            if(checkMessage.length>0) {
                const result = await messagesModel.deleteOneMessageData(id)
                return helper.response(res,200,`The message ${id} is succesfully deleted!`,result)
            } else {
                return helper.response(res,400,`The message ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    }
}