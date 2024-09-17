const User = require('../models/user_model')
const { getDb } = require('../util/database')

async function register_service(data_to_insert){
    const { username, email, password } = data_to_insert
    try{
        const new_user =  new User(username, email, password)
        await new_user.save()
        return {'message': 'User Added'}
    }catch(err){
        console.log(err)
        return {'error': 'Error While Adding User'}
    }
}

async function login_service(query){
    try {
        const db = getDb()
        const user = await db.collection('users').findOne(query)
        return {'user': user}
    } catch (err) {
        console.error(err)
        return {'error': err}
    }
}

module.exports = { register_service, login_service }
