const express = require('express')
const { mongoConnect }= require('./util/database')
const PORT = 3000

const app = express()

app.use(express.json())

// Define routes
require('./routes/product_routes')(app)
require('./routes/user_routes')(app)
require('./routes/cart_routes')(app)

mongoConnect(() => {
    app.listen(PORT, ()=>{
        console.log('Server is running on port ',PORT)
    })
})