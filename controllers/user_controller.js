const { register_service, login_service } = require('../services/user_service')
const { generate_jwt_token } = require('../util/jwt')

// Register a new user
async function register(req, res) {
    try {
        const response = await register_service(req.body)
        if (response.error) {
            res.status(500).json(response)
        } else {
            res.status(201).json(response)
        }
    } catch (err) {
        res.status(500).json({ error: 'Error while registering user', message: err.message })
    }
}

// Login user
async function login(req, res) {
    try {
        const result = await login_service(req.body.email, req.body.password)
        if (result.error) {
            res.status(500).json(result)
        } else if (!result.user) {
            res.status(404).json({ message: 'User Not Found' })
        } else {
            const token = generate_jwt_token(result.user._id.toString())
            res.status(200).json({ token })
        }
    } catch (err) {
        res.status(500).json({ error: 'Error while logging in', message: err.message })
    }
}

module.exports = { register, login }
