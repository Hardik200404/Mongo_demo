const Product = require('../models/product_model')
const { getDb } = require('../util/database')
const { ObjectId } = require('mongodb')

async function get_products_service() {
    try {
        const db = getDb()
        const products = await db.collection('products').find().toArray()
        return {'products': products}
    } catch (err) {
        console.error(err)
        return {'message': err}
    }
}

async function get_product_service(query) {
    try {
        const db = getDb()
        const product = await db.collection('products').findOne(query)
        return {'product': product}
    } catch (err) {
        console.error(err)
        return {'message': err}
    }
}

async function post_product_service(data_to_insert, userId) {
    const { title, price, description } = data_to_insert
    userId = new ObjectId(userId)
    try{
        const new_product =  new Product(title, price, description, null, userId)
        await new_product.save()
        return {'message': 'Product Added'}
    }catch(err){
        console.log(err)
        return {'message': 'Error While Adding Product'}
    }
}

async function edit_product_service(data_to_insert, id) {
    const { title, price, description } = data_to_insert
    try{
        const new_product =  new Product(title, price, description, id)
        await new_product.save()
        return {'message': 'Product Updated'}
    }catch(err){
        console.log(err)
        return {'message': 'Error While Updating Product'}
    }
}

async function delete_product_service(query) {
    try {
        const db = getDb()
        await db.collection('products').deleteOne(query)
        return {'message': 'Product Deleted'}
    } catch (err) {
        console.error(err)
        return {'message': err}
    }
}

module.exports = { get_products_service, get_product_service,
    post_product_service, edit_product_service, delete_product_service }