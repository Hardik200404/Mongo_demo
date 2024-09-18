const mongoose = require('mongoose')
const { Schema } = mongoose

// Define the cart schema
const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

// Export the Cart model
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart