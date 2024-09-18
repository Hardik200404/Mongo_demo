const Product = require('../models/product_model')

async function get_products_service() {
    try {
        const products = await Product.find()
        return { 'products': products }
    } catch (err) {
        console.error(err)
        return { 'error': 'Error While Fetching Products' }
    }
}

// Get a product by ID
async function get_product_service(prodId) {
    try {
        const product = await Product.findById(prodId)
        if (!product) {
            return { message: 'Product not found' }
        }
        return { 'product': product }
    } catch (err) {
        console.error(err)
        return { 'error': 'Error While Fetching Product' }
    }
}

// Add a new product
async function post_product_service(data_to_insert, userId) {
    const { title, price, description } = data_to_insert
    try {
        // Create a new product instance using the Mongoose model
        const new_product = new Product({
            title,
            price,
            description,
            userId: userId
        })
        const result = await new_product.save()
        return { message: 'Product added successfully', product: result }
    } catch (err) {
        console.error(err)
        return {'error': 'Error while adding product'}
    }
}

async function edit_product_service(data_to_insert, id, userId) {
    const { title, price, description } = data_to_insert
    try {
        const product = await Product.findById(id)
        if (!product) {
            return { message: 'Product not found' }
        }

        // Check if the user is authorized to edit the product
        if (product.userId.toString() !== userId) {
            return { error: 'Unauthorized' }
        }

        product.title = title
        product.price = price
        product.description = description

        await product.save()
        return { message: 'Product updated successfully', product }
    } catch (err) {
        console.error(err)
        throw new Error('Error while updating product')
    }
}

// Delete product service
async function delete_product_service(prodId, userId) {
    try {
        // Find the product by ID and check the userId
        const product = await Product.findOne({ _id: prodId, userId })

        if (!product) {
            return { message: 'Product not found or you are not authorized to delete it' }
        }

        // Delete the product
        await Product.findByIdAndDelete(prodId)
        return { message: 'Product deleted successfully' }
    } catch (err) {
        console.error(err)
        throw new Error('Error while deleting product')
    }
}

module.exports = { get_products_service, get_product_service,
    post_product_service, edit_product_service, delete_product_service }