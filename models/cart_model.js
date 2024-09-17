let { getDb } = require('../util/database')
let { ObjectId } = require('mongodb')

class Cart{
    constructor(userId, products, id){
        this.userId = userId
        this.products = products ? products : [] // incase creating cart
    }

    async save() {
        const db = getDb()
        try {
            const result = await db.collection('carts').insertOne(this)
            // console.log(result)
            return result
        } catch (err) {
            console.error('Error Saving Cart:', err)
            throw err
        }
    }
}

module.exports = Cart