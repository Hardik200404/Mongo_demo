const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000

const app = express()

app.use(express.json())

// Define routes
require('./routes/product_routes')(app)
require('./routes/user_routes')(app)
require('./routes/cart_routes')(app)
require('./routes/order_routes')(app)

mongoose.connect(process.env.LOCAL_DB_URI)
.then(()=> {
    app.listen(PORT, ()=>{
        console.log('Server is running on port ',PORT)
    })
}).catch(err=>{
    console.log(err)
})