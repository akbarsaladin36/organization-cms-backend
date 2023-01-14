const rolesModel = require("./roles_model")
const helper = require("../../helpers/helper")

module.exports = {
    allRoles: async (req, res) => {
        try {
            const result = await rolesModel.getAllRoles()
            if(result.length>0) {
                return helper.response(res, 200, 'All roles data is succesfully showed!', result)
            } else {
                return helper.response(res, 200, 'All roles data is empty!', null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneRole: async (req, res) => {
        try {
            const { id } = req.params
            const result = await rolesModel.getRolesById(id)
            if(result.length>0) {
                return helper.response(res, 200, `A role data by id ${id} is succesfully showed!`, result)
            } else {
                return helper.response(res, 400, `A role data by id ${id} is not found!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createNewRole: async (req, res) => {
        try {
            const { rolesName } = req.body
            const setData = {
                roles_name: rolesName
            }
            const result = await rolesModel.createNewRoles(setData)
            return helper.response(res, 200, 'A new roles is succesfully created!', result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateRole: async (req, res) => {
        try {
            const { id } = req.params
            const { rolesName } = req.body
            const prev_result = await rolesModel.getRolesById(id)
            // console.log(prev_result)
            if(prev_result.length > 0) {
                const setData = {
                    roles_name: rolesName,
                    roles_updated_at: new Date(Date.now())
                }
                const result = await rolesModel.updateRoles(setData, id)
                return helper.response(res, 200, `A roles data with id ${id} succesfully updated!`, result)
            } else {
                return helper.response(res, 400, `A roles data with id ${id} is not found!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteRole: async (req, res) => {
        try {
            const { id } = req.params
            const prev_result = await rolesModel.getRolesById(id)
            if(prev_result.length>0) {
                const result = await rolesModel.deleteRoles(id)
                return helper.response(res, 200, `A roles data with id ${id} is succesfully deleted`, result)
            } else {
                return helper.response(res, 400, `A roles data with id ${id} is not found!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}