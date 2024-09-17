const { get_orders, create_order } = require('../controllers/order_controller')

module.exports = function(app){
    app.get('/get-orders', get_orders),
    app.post('/place-order', create_order)
}