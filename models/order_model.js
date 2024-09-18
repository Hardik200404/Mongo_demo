const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  products: [{
      productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  }],
  total_price: { type: Number, required: true },
  address: { type: String, required: true },
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

module.exports = Order