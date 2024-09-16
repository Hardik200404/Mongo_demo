const { get_products_service, get_product_service, post_product_service,
    edit_product_service, delete_product_service } = require('../services/product_services')
    
const { ObjectId } = require('mongodb')
    
async function get_products(req,res){
    const result = await get_products_service()
    
    if(result){
        res.status(200).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}
    
async function get_product_by_id(req,res){
    if(req.query.prodId){
        const prodId = new ObjectId(req.query.prodId)
        const result = await get_product_service({'_id': prodId})
        if(result){
            res.status(200).send(JSON.stringify(result))
        }else{
            res.status(500).send(JSON.stringify(result))
        }
    }else{
        res.status(404).send(JSON.stringify({'message': 'Provide A Valid ID'}))
    }
}

async function post_product(req,res){
    const data_to_insert = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    }
    // console.log(data_to_insert)

    const result = await post_product_service(data_to_insert)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

async function edit_product_by_id(req,res){
    const data_to_insert = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    }
    const id = req.params.id

    const result = await edit_product_service(data_to_insert, id)
    if(result){
        res.status(201).send(JSON.stringify(result))
    }else{
        res.status(500).send(JSON.stringify(result))
    }
}

async function delete_product_by_id(req,res){
    if(req.params.id){
        const prodId = new ObjectId(req.params.id)
        const result = await delete_product_service({'_id': prodId})
        if(result){
            res.status(200).send(JSON.stringify(result))
        }else{
            res.status(500).send(JSON.stringify(result))
        }
    }else{
        res.status(404).send(JSON.stringify({'message': 'Provide A Valid ID'}))
    }
}

module.exports = { get_products, get_product_by_id, post_product,
    edit_product_by_id, delete_product_by_id }