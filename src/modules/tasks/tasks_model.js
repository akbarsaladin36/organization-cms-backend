const connection = require('../../config/mysql')

module.exports = {
    getAllTasks: () => {
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM tasks',(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getUsersData: () => {
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM users',(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getUsersByUserId: (id) => {
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM users WHERE user_id = ?',id,(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getAllTasksBySenderUserId: (id) => {
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM tasks WHERE user_id = ?',id,(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getAllTasksByReceiverUserId: (id) => {
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM tasks WHERE to_user_id = ?',id,(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOneTask: (id) => {
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM tasks WHERE task_id = ?',id,(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    createNewTask: (setData) => {
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO tasks SET ?',setData,(error,result)=>{
                if(!error) {
                    const newResult = {
                        id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    updateOneTask: (id,setData) => {
        return new Promise((resolve,reject)=>{
            connection.query('UPDATE tasks SET ? WHERE task_id = ?',[setData,id],(error,result)=>{
                if(!error) {
                    const newResult = {
                        id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteOneTask: (id) => {
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM tasks WHERE task_id = ?',id,(error,result)=>{
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}