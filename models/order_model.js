let { getDb } = require('../util/database')
let { ObjectId } = require('mongodb')

class Order{
    constructor(userId, products, total_price, address){
        this.userId = userId
        this.products = products
        this.total_price = total_price
        this.address = address
    }

    async save() {
        const db = getDb()
        try {
            const result = await db.collection('orders').insertOne(this)
            // console.log(result)
            return result
        } catch (err) {
            console.error('Error Saving Order:', err)
            throw err
        }
    }
}

module.exports = Order