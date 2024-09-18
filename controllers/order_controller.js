const { get_orders_service, create_order_service } = require('../services/order_service')
const { verify_jwt_token } = require('../util/jwt')

async function get_orders(req, res) {
    const userId = verify_jwt_token(req.headers.authorization)

    const result = await get_orders_service(userId)
    if (result.orders) {
        res.status(200).json(result)
    } else {
        res.status(500).json(result)
    }
}

async function create_order(req, res) {
    const userId = verify_jwt_token(req.headers.authorization)
    const { cartId, address } = req.body

    const result = await create_order_service(userId, cartId, address)
    if (result.order) {
        res.status(201).json(result)
    } else {
        res.status(500).json(result)
    }
}

module.exports = { get_orders, create_order }
