const Cart = require('../models/cart_model')

async function get_cart_service(cartId) {
    try {
        const cart = await Cart.findById(cartId).populate('products')
        return { cart }
    } catch (err) {
        console.error('Error while fetching cart:', err)
        return { error: 'Error while fetching cart' }
    }
}

async function create_cart_service(userId) {
    try {
        const new_cart = new Cart({ userId, products: [] })
        await new_cart.save()
        return { cart: new_cart }
    } catch (err) {
        console.error('Error while creating cart:', err)
        return { error: 'Error while creating cart' }
    }
}

async function add_to_cart_service(userId, prodId, cartId) {
    try {
        const cart = await Cart.findOne({ _id: cartId, userId })
        if (!cart) {
            return { error: 'Cart not found or unauthorized' }
        }

        // Add product to cart
        cart.products.push(prodId)
        await cart.save()

        return { message: 'Product added to cart' }
    } catch (err) {
        console.error('Error while adding to cart:', err)
        return { error: 'Error while adding to cart' }
    }
}

async function delete_from_cart_service(userId, prodId, cartId) {
    try {
        const cart = await Cart.findOne({ _id: cartId, userId })
        if (!cart) {
            return { error: 'Cart not found or unauthorized' }
        }

        // Find the index of the first occurrence of the product
        const prodIndex = cart.products.findIndex(p => p.equals(prodId))
        if (prodIndex !== -1) {
            // Remove only the first occurrence of the product
            cart.products.splice(prodIndex, 1)
            await cart.save()
            return { message: 'Product removed from cart' }
        } else {
            return { error: 'Product not found in cart' }
        }
    } catch (err) {
        console.error('Error while deleting from cart:', err)
        return { error: 'Error while deleting from cart' }
    }
}


async function delete_cart_service(userId, cartId) {
    try {
        const cart = await Cart.findOne({ _id: cartId, userId })
        if (!cart) {
            return { error: 'Cart not found or unauthorized' }
        }

        await Cart.deleteOne({ _id: cartId })
        return { message: 'Cart deleted' }
    } catch (err) {
        console.error('Error while deleting cart:', err)
        return { error: 'Error while deleting cart' }
    }
}

module.exports = { get_cart_service, create_cart_service, add_to_cart_service, 
    delete_from_cart_service, delete_cart_service }