const { get_products, get_product_by_id, post_product,
    edit_product_by_id, delete_product_by_id } = require('../controllers/product_contoller')

module.exports = function(app){
    app.get('/get-products', get_products),
    app.get('/get-product',get_product_by_id),
    app.post('/post-product', post_product)
    app.put('/edit-product/:id', edit_product_by_id),
    app.delete('/delete-product/:id', delete_product_by_id)
}