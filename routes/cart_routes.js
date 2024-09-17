const { get_cart_by_id, create_cart, add_to_cart, 
    delete_from_cart, delete_cart } = require('../controllers/cart_controller')

module.exports = function(app){
    app.get('/get-cart', get_cart_by_id),
    app.post('/create-cart', create_cart),
    app.put('/add-to-cart', add_to_cart),
    app.delete('/delete-from-cart', delete_from_cart),
    app.delete('/delete-cart', delete_cart)
}