const { get_cart_service, create_cart_service, add_to_cart_service, 
    delete_from_cart_service, delete_cart_service } = require('../services/cart_service')
const { verify_jwt_token } = require('../util/jwt')
const { ObjectId } = require('mongodb')

async function get_cart_by_id(req,res){
    if(req.query.cartId){
        const cartId = new ObjectId(req.query.cartId)
        const result = await get_cart_service({'_id': cartId})
        if(result){
            res.status(200).send(JSON.stringify(result))
        }else{
            res.status(500).send(JSON.stringify(result))
        }
    }else{
        res.status(404).send(JSON.stringify({'message': 'Provide A Valid ID'}))
    }
}

async function create_cart(req,res){
    const userId = verify_jwt_token(req.headers.authorization)

    const result = await create_cart_service(userId)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

async function add_to_cart(req,res){
    let userId = verify_jwt_token(req.headers.authorization)
    userId = new ObjectId(userId)
    let prodId = req.body.productId
    prodId = new ObjectId(prodId)
    const id = req.query.cartId

    const result = await add_to_cart_service(userId, prodId, id)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

async function delete_from_cart(req,res){
    let userId = verify_jwt_token(req.headers.authorization)
    userId = new ObjectId(userId)
    let prodId = req.body.productId
    prodId = new ObjectId(prodId)
    const id = req.query.cartId

    const result = await delete_from_cart_service(userId, prodId, id)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

async function delete_cart(req,res){
    let userId = verify_jwt_token(req.headers.authorization)
    userId = new ObjectId(userId)
    const id = req.query.cartId

    const result = await delete_cart_service(userId, id)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

module.exports = { get_cart_by_id, create_cart, add_to_cart,
    delete_from_cart, delete_cart }