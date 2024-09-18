const User = require('../models/user_model')

async function register_service(data_to_insert) {
    const { username, email, password } = data_to_insert

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return { error: 'Email is already registered' }
        }

        const new_user = new User({ username, email, password })
        await new_user.save()
        return { message: 'User Added' }
    } catch (err) {
        console.error('Error While Adding User:', err)
        return { error: 'Error While Adding User' }
    }
}

async function login_service(email, password) {
    try {
        // Find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            return { error: 'User not found' }
        }

        // Check if the password matches
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return { error: 'Invalid email or password' }
        }

        return { user }
    } catch (err) {
        console.error('Error While Logging In:', err)
        return { error: 'Error While Logging In' }
    }
}

module.exports = { register_service, login_service }
