let { getDb } = require('../util/database')
let { ObjectId } = require('mongodb')

class User{
    constructor(username, email, password, id){
        this.username = username
        this.email = email
        this.password = password
        this._id = id ? new ObjectId(id) : null // incase Id was provided, suggesting this is an update
    }

    async save() {
        const db = getDb()
        try {
            let result
            if(this._id){
                result = await db.collection('users').updateOne(
                    {_id: this._id}, 
                    {$set: {
                        username: this.username, email: this.email, password: this.password 
                    }}
                )
            }else{
                result = await db.collection('users').insertOne(this)
            }
            // console.log(result)
            return result
        } catch (err) {
            console.error('Error Saving User:', err)
            throw err
        }
    }
}

module.exports = User