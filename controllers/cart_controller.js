const { get_cart_service, create_cart_service, add_to_cart_service, 
    delete_from_cart_service, delete_cart_service } = require('../services/cart_service')
const { verify_jwt_token } = require('../util/jwt')

async function get_cart_by_id(req, res) {
    if (req.query.cartId) {
        const result = await get_cart_service(req.query.cartId)
        if (result.cart) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: 'Cart Not Found' })
        }
    } else {
        res.status(400).json({ message: 'Provide A Valid ID' })
    }
}

async function create_cart(req, res) {
    const userId = verify_jwt_token(req.headers.authorization)
    const result = await create_cart_service(userId)
    if (result.error) {
        res.status(500).json(result)
    } else {
        res.status(201).json(result)
    }
}

async function add_to_cart(req, res) {
    const userId = verify_jwt_token(req.headers.authorization)
    const prodId = req.body.productId
    const cartId = req.query.cartId

    const result = await add_to_cart_service(userId, prodId, cartId)
    if (result.error) {
        res.status(500).json(result)
    } else {
        res.status(201).json(result)
    }
}

async function delete_from_cart(req, res) {
    const userId = verify_jwt_token(req.headers.authorization)
    const prodId = req.body.productId
    const cartId = req.query.cartId

    const result = await delete_from_cart_service(userId, prodId, cartId)
    if (result.error) {
        res.status(500).json(result)
    } else {
        res.status(200).json(result)
    }
}

async function delete_cart(req, res) {
    const userId = verify_jwt_token(req.headers.authorization)
    const cartId = req.query.cartId

    const result = await delete_cart_service(userId, cartId)
    if (result.error) {
        res.status(500).json(result)
    } else {
        res.status(200).json(result)
    }
}

module.exports = { get_cart_by_id, create_cart, add_to_cart,
    delete_from_cart, delete_cart }