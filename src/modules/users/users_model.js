const connection = require('../../config/mysql')

module.exports = {
    getAllUsers: () => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT a.user_username,a.user_email,a.user_first_name,a.user_last_name,b.roles_name FROM users a LEFT JOIN roles b ON b.roles_id = a.roles_id',(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getUserDataCondition: (data) => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM users WHERE ?',data,(error,result)=> {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOneUser: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT a.user_username,a.user_email,a.user_first_name,a.user_last_name,a.user_address,a.user_phone_number,b.roles_name FROM users a LEFT JOIN roles b ON b.roles_id = a.roles_id WHERE a.user_id = ?',id,(error,result) => {
                // console.log(result)
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    createNewUser: (setData) => {
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO users SET ?',setData,(error,result) => {
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
    updateOneUser: (setData,id) => {
        return new Promise((resolve,reject) => {
            connection.query('UPDATE users SET ? WHERE user_id = ?',[setData,id],(error,result) => {
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
    deleteOneUser: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('DELETE FROM users WHERE user_id = ?',id,(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}