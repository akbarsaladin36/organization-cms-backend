const connection = require('../../config/mysql')

module.exports = {
    getAllMessages: () => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM messages',(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getAllMessagesBySender: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM messages WHERE sender_id = ?',id,(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getAllMessagesByReceiver: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM messages WHERE receiver_id = ?',id,(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getUsersData: () => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM users',(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getUsersDataById: (id) => {
      return new Promise((resolve,reject) => {
        connection.query('SELECT * FROM users WHERE user_id = ?',id,(error,result) => {
            !error ? resolve(result) : reject(new Error(error))
        })
      })  
    },
    getOneMessageData: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('SELECT * FROM messages WHERE message_id = ?',id,(error,result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    createOneMessageData: (setData) => {
        return new Promise((resolve,reject) => {
            connection.query('INSERT INTO messages SET ?',setData,(error,result) => {
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
    updateOneMessageData: (setData,id) => {
        return new Promise((resolve,reject) => {
            connection.query('UPDATE messages SET ? WHERE message_id = ?',[setData,id],(error,result) => {
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
    deleteOneMessageData: (id) => {
        return new Promise((resolve,reject) => {
            connection.query('DELETE FROM messages WHERE message_id = ?',id,(error,result) => {
                !error ? resolve(result) : new Error(error)
            })
        })
    }
}