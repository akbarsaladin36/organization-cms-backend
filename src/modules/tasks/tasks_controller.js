const helper = require('../../helpers/helper')
const tasksModel = require('./tasks_model')

module.exports = {
    allTasks: async (req,res) => {
        try {
            const allTasks = await tasksModel.getAllTasks()
            
            const users = await tasksModel.getUsersData()

            const result = allTasks.map((task)=>{
                const user = users.find(user => 
                    user.user_id === task.user_id
                )

                if(user) {
                    return {
                        ...task,
                        ...user
                    }
                }
            })

            // console.log(result)

            return helper.response(res,200,'All data is succesfully showed!',result)
        } catch(error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    allTasksBySender: async (req, res) => {
        try {
            const { id } = req.params
            const checkTasks = await tasksModel.getAllTasksBySenderUserId(id)
            const oneUser = await tasksModel.getUsersData(id)
            // const result = {...checkTasks, ...user}
            const result = checkTasks.map((a)=>{
                const user = oneUser.find(b => b.user_id === a.user_id)
                if(user) {
                    return {
                        ...a,
                        ...user
                    }
                }
            })
            // console.log(result)

            if(result.length>0) {
                return helper.response(res,200,`All tasks by sender id ${id} is found!`,result)
            } else {
                return helper.response(res,400,`All tasks by sender id ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    allTasksByReceiver: async (req,res) => {
        try {
            const { id } = req.params
            const checkReceiverTasks = await tasksModel.getAllTasksByReceiverUserId(id)
            const receiverUser = await tasksModel.getUsersData(id)
            const result = checkReceiverTasks.map((a)=>{
                const user = receiverUser.find(b => b.user_id === a.user_id)
                if(user) {
                    return {
                        ...a,
                        ...user
                    }
                }
            })
            // console.log(result)
            if(result.length>0) {
                return helper.response(res,200,`All tasks by receiver id ${id} is found!`,result)
            } else {
                return helper.response(res,400,`All tasks by receiver id ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneTask: async (req,res) => {
        try {
            const { id } = req.params
            const checkOneTask = await tasksModel.getOneTask(id)
            if(checkOneTask.length>0) {
                return helper.response(res,200,`The task with id ${id} is found!`,checkOneTask)
            } else {
                return helper.response(res,400,`The task with id ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    createTask: async (req,res) => {
        try {
            const { receiverID,taskTitle,taskDescription,taskLevel } = req.body
            const setData = {
                user_id: req.decodeToken.user_id,
                to_user_id: receiverID,
                task_title: taskTitle,
                task_description: taskDescription,
                task_level: taskLevel
            }
            const result = await tasksModel.createNewTask(setData)
            return helper.response(res,200,'A new tasks is succesfully created!',result)
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    updateTask: async (req,res) => {
        try {
            const { id } = req.params
            const { taskTitle,taskDescription,taskLevel } = req.body
            const checkTask = await tasksModel.getOneTask(id)
            if(checkTask.length>0) {
                const setData = {
                    task_title: taskTitle,
                    task_description: taskDescription,
                    task_level: taskLevel,
                    task_updated_at: new Date(Date.now())
                }
                const result = await tasksModel.updateOneTask(id,setData)
                return helper.response(res,200,`The task with id ${id} is succesfully updated!`,result)
            } else {
                return helper.response(res,400,`The task with id ${id} is not found! Please try again!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    },
    deleteTask: async (req,res) => {
        try {
            const { id } = req.params
            const checkTask = await tasksModel.getOneTask(id)
            if(checkTask.length>0) {
                const result = await tasksModel.deleteOneTask(id)
                return helper.response(res,200,`The task id ${id} is succesfully deleted!`,result)
            } else {
                return helper.response(res,400,`The task id ${id} is not found!`,null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res,404,'Bad Request',null)
        }
    }
}