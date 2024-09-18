const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Pre-save hook to hash the password before saving a new user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(8)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (err) {
        next(err)
    }
})

// Method to check password validity
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)