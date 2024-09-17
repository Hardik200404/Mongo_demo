const { register, login } = require('../controllers/user_controller')

module.exports = function(app){
    app.post('/register', register),
    app.post('/login', login)
}