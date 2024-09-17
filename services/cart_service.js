const Cart = require('../models/cart_model')
const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

async function get_cart_service(query) {
    try {
        const db = getDb()
        const cart = await db.collection('carts').findOne(query)
        return {'cart': cart}
    } catch (err) {
        console.error(err)
        return {'message': err}
    }
}

async function create_cart_service(userId) {
    userId = new ObjectId(userId)
    try{
        const new_cart =  new Cart(userId)
        const result = await new_cart.save()
        return {'cart': result}
    }catch(err){
        console.log(err)
        return {'message': 'Error While Creating Cart'}
    }
}

async function add_to_cart_service(userId, prodId, id) {
    try{
        const db = getDb()
        const cart = await db.collection('carts').findOne({'_id': new ObjectId(id)})
        if(cart){
            if(cart.userId.toString() != userId.toString()){
                return {'error': 'Unauthorized'}
            }else{
                cart.products.push(prodId)
                await db.collection('carts').updateOne(
                    {_id: new ObjectId(id)},
                    {$set: { products: cart.products }}
                )
                return {'message': 'Cart Updated'}
            }
        }else{
            return { 'message': 'Cart Not Found' }
        }
    }catch(err){
        console.log(err)
        return {'message': 'Error While Updating Cart'}
    }
}

async function delete_from_cart_service(userId, prodId, id) {
    try{
        const db = getDb()
        const cart = await db.collection('carts').findOne({'_id': new ObjectId(id)})
        if(cart){
            if(cart.userId.toString() != userId.toString()){
                return {'error': 'Unauthorized'}
            }else{
                let prodIndex = cart.products.findIndex(product => product.equals(prodId))
                if(prodIndex === -1){
                    return {message: 'Product Not Found In Cart'}
                }
                cart.products.splice(prodIndex, 1)

                await db.collection('carts').updateOne(
                    {_id: new ObjectId(id)},
                    {$set: { products: cart.products }}
                )
                return {'message': 'Cart Updated'}
            }
        }else{
            return { 'message': 'Cart Not Found' }
        }
    }catch(err){
        console.log(err)
        return {'message': 'Error While Updating Cart'}
    }
}

async function delete_cart_service(userId, id) {
    try{
        const db = getDb()
        const cart = await db.collection('carts').findOne({'_id': new ObjectId(id)})
        if(cart){
            if(cart.userId.toString() != userId.toString()){
                return {'error': 'Unauthorized'}
            }else{
                await db.collection('carts').deleteOne({_id: new ObjectId(id)})
                return {'message': 'Cart Deleted'}
            }
        }else{
            return { 'message': 'Cart Not Found' }
        }
    }catch(err){
        console.log(err)
        return {'message': 'Error While Deleting Cart'}
    }
}

module.exports = { get_cart_service, create_cart_service, add_to_cart_service, 
    delete_from_cart_service, delete_cart_service }