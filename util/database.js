const { MongoClient } = require('mongodb')
require('dotenv').config()
let _db

const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB_URI)
        .then(client => {
            console.log('Connected To DB')
            _db = client.db()
            callback()
        })
        .catch(err => {
            console.error('Failed To Connect', err)
            throw err
        }
    )
}

const getDb = () => {
    if(_db){
        return _db
    }
    return 'No Database Found'
}

module.exports = { mongoConnect, getDb }