let { getDb } = require('../util/database')
let { ObjectId } = require('mongodb')

class Product{
    constructor(title, price, description, id, userId){
        this.title = title
        this.price = price
        this.description = description
        this._id = id ? new ObjectId(id) : null // incase Id was provided, suggesting this is an update
        this.userId = userId
    }

    async save() {
        const db = getDb()
        try {
            let result
            if(this._id){
                result = await db.collection('products').updateOne(
                    {_id: this._id}, 
                    {$set: {
                        title: this.title, price: this.price, description: this.description 
                    }}
                )
            }else{
                result = await db.collection('products').insertOne(this)
            }
            // console.log(result)
            return result
        } catch (err) {
            console.error('Error saving product:', err)
            throw err
        }
    }
}

module.exports = Product