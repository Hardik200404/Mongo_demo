const mongoose = require('mongoose')
const { Schema } = mongoose

// Define the Product schema
const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Product', productSchema)