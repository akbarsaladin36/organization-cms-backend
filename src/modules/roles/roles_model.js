const connection = require('../../config/mysql')

module.exports = {
    getAllRoles: () => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM roles',(error,result) => {
                !error ? resolve(result) : reject(new Error(error));
            })
        })
    },
    getRolesById: (id) => {
        return new Promise((resolve,reject) => {
            connection.query("SELECT * FROM roles WHERE roles_id = ?",id,(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    createNewRoles: (setData) => {
        return new Promise((resolve,reject) => {
            connection.query("INSERT INTO roles SET ?",setData,(error,result) => {
                if(!error) {
                    const newResult = {
                        id: result.insertId,
                        ...setData,
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    updateRoles: (setData, id) => {
        return new Promise((resolve,reject) => {
            connection.query("UPDATE roles SET ? WHERE roles_id = ?",[setData,id],(error,result) => {
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
    deleteRoles: (id) => {
        return new Promise((resolve,reject) => {
            connection.query("DELETE FROM roles WHERE roles_id = ?",id,(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }

}