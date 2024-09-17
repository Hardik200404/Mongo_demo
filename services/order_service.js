const Order = require('../models/order_model')
const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

async function get_orders_service(query) {
    try {
        const db = getDb()
        const orders = await db.collection('orders').find(query).toArray()
        return {'orders': orders}
    } catch (err) {
        console.error(err)
        return {'message': err}
    }
}

async function create_order_service(userId, cartId, address) {
    userId = new ObjectId(userId)
    cartId = new ObjectId(cartId)

    try{
        const db = getDb()
        const cart = await db.collection('carts').findOne({'_id': cartId})
        
        if(cart){
            if(cart.userId.toString() != userId.toString()){
                return {'error': 'Unauthorized'}
            }else{
                if(cart.products.length>0){
                    const productId_and_occ = {}
                    for(let product of cart.products){
                        if(productId_and_occ[product]){
                            productId_and_occ[product] += 1
                        }else{
                            productId_and_occ[product] = 1
                        }
                    }
                    
                    const products = await db.collection('products').find(
                        {'_id': {'$in': cart.products}}
                    ).toArray()
                    
                    let total_price = 0
                    for(let product of products){
                        total_price += product.price * productId_and_occ[product._id]
                    }
                    
                    const new_order =  new Order(userId, products, total_price, address)
                    const result = await new_order.save()
                    return {'Order': result}
                }else{
                    return {'message': 'Add An Item To Cart, Its Empty'}
                }
            }
        }else{
            return { 'message': 'Cart Not Found' }
        }
    }catch(err){
        console.log(err)
        return {'message': 'Error While Creating Order'}
    }
}

module.exports = { get_orders_service, create_order_service }