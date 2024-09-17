const { get_orders_service, create_order_service } = require('../services/order_service')
const { verify_jwt_token } = require('../util/jwt')
const { ObjectId } = require('mongodb')

async function get_orders(req,res){
    let userId = req.headers.authorization
    userId = verify_jwt_token(userId)
    userId = new ObjectId(userId)

    const result = await get_orders_service({'userId': userId})
    if(result){
        res.status(200).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

async function create_order(req,res){
    const userId = verify_jwt_token(req.headers.authorization)
    const cartId = req.body.cartId
    const address = req.body.address

    const result = await create_order_service(userId, cartId, address)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

module.exports = { get_orders, create_order }