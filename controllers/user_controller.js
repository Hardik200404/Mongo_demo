const { register_service, login_service } = require('../services/user_service')
const { verify_jwt_token, generate_jwt_token } = require('../util/jwt')
const bcrypt = require('bcrypt')

async function register(req,res){
    req.body.password = bcrypt.hashSync(req.body.password,8)
    
    let response = await register_service(req.body)
    if(response.error){
        res.status(500).send(JSON.stringify(response))
    }else{
        res.status(201).send(JSON.stringify(response))
    }
}

async function login(req,res) {
    const result = await login_service({'email': req.body.email})
    if(result){
        if(result.user){
            const token = generate_jwt_token(result.user._id.toString())
            res.status(200).send(JSON.stringify({'token': token}))
        }else{
            res.status(404).send(JSON.stringify({'message': 'User Not Found'}))
        }
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

module.exports = { register, login }