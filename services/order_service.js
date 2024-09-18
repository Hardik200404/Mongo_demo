const Order = require('../models/order_model')
const Cart = require('../models/cart_model')

async function get_orders_service(userId) {
    try {
        const orders = await Order.find({userId}).populate('products.productId')
        return {'orders': orders}
    } catch (err) {
        console.error(err)
        return {'message': err}
    }
}

async function create_order_service(userId, cartId, address) {
    try{
        const cart = await Cart.findById(cartId).populate('products')
        if(cart){
            if(cart.userId.toString() != userId.toString()){
                return {'error': 'Unauthorized'}
            }else{
                if(cart.products.length>0){
                    let total_price = 0
                    for(let product of cart.products){
                        total_price += product.price
                    }
                
                    const new_order = new Order({
                        userId: userId,
                        products: cart.products.map(product => ({ productId: product._id })),
                        total_price: total_price,
                        address: address,
                    })

                    const result = await new_order.save()
                    await Cart.findByIdAndUpdate(cartId, { products: [] })
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