const bcrypt = require('bcrypt')
const usersModel = require('./users_model')
const helper = require('../../helpers/helper')

module.exports = {
    allUsers: async (req, res) => {
        try {
            const result = await usersModel.getAllUsers()
            return helper.response(res, 200, 'All users data is succesfully showed!',result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneUser: async (req, res) => {
       try {
         const { id } = req.params
         const result = await usersModel.getOneUser(id)
         if(result.length > 0) {
            return helper.response(res, 200, `The user with id ${id} data is succesfully showed!`, result)
         } else {
            return helper.response(res, 400, `The user with id ${id} is not found`, null)
         }
       } catch (err) {
         console.log(err)
         return helper.response(res, 404, 'Bad Request', null)
       } 
    },
    createUser: async (req, res) => {
        try {
            const { userUsername,userEmail,userPassword,userFirstName,userLastName,userAddress,userPhoneNumber,userRoles } = req.body
            const checkEmail = await usersModel.getUserDataCondition({ user_email: userEmail })
            if(checkEmail.length > 0) {
                return helper.response(res, 400, 'Your email is already exist!, Please try to type a new email again', null)
            } else {
                const salt = bcrypt.genSaltSync(10)
                const encryptPassword = bcrypt.hashSync(userPassword, salt)
                const setData = {
                    user_username: userUsername,
                    user_email: userEmail,
                    user_password: encryptPassword,
                    user_first_name: userFirstName,
                    user_last_name: userLastName,
                    user_address: userAddress,
                    user_phone_number: userPhoneNumber,
                    roles_id: userRoles
                }
                const result = await usersModel.createNewUser(setData)
                return helper.response(res, 200, 'A new user is succesfully created!', result)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params
            const { userFirstName,userLastName,userAddress,userPhoneNumber } = req.body
            const checkUser = await usersModel.getOneUser(id)
            if(checkUser.length > 0) {
                const setData = {
                    user_first_name: userFirstName,
                    user_last_name: userLastName,
                    user_address: userAddress,
                    user_phone_number: userPhoneNumber,
                    user_updated_at: new Date(Date.now())
                }
                const result = await usersModel.updateOneUser(setData, id)
                return helper.response(res, 200, `The user with id ${id} data is succesfully updated!`,result)
            } else {
                return helper.response(res, 400, `The user with id ${id} is not found! Please try again!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            const checkUser = await usersModel.getOneUser(id)
            if(checkUser.length>0) {
                const result = await usersModel.deleteOneUser(id)
                return helper.response(res, 200, `The user with id ${id} is succesfully deleted!`, result)
            } else {
                return helper.response(res, 400, `The user with id ${id} is not found!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}