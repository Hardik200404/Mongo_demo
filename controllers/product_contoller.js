const { get_products_service, get_product_service, post_product_service,
    edit_product_service, delete_product_service } = require('../services/product_services')
const { verify_jwt_token } = require('../util/jwt')    

async function get_products(req, res) {
    try {
        const result = await get_products_service()
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err })
    }
}

// Get a product by its ID
async function get_product_by_id(req, res) {
    try {
        if (req.query.prodId) {
            const result = await get_product_service(req.query.prodId)
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: 'Provide a valid ID' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err })
    }
}

// Add a new product
async function post_product(req, res) {
    try {
        const data_to_insert = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
        }
        const userId = verify_jwt_token(req.headers.authorization)
        const result = await post_product_service(data_to_insert, userId)
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ message: 'Error adding product', error: err })
    }
}


async function edit_product_by_id(req, res) {
    const data_to_insert = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    }
    const id = req.params.id
    const userId = verify_jwt_token(req.headers.authorization)

    try {
        const result = await edit_product_service(data_to_insert, id, userId)
        if (result.error) {
            return res.status(403).json(result)
        }
        return res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ message: 'Error while updating product', error: err })
    }
}

// Delete product by ID
async function delete_product_by_id(req, res) {
    if (req.params.id) {
        const prodId = req.params.id
        const userId = verify_jwt_token(req.headers.authorization)

        try {
            const result = await delete_product_service(prodId, userId)
            if (result.error) {
                return res.status(403).json(result)
            }
            return res.status(200).json(result)
        } catch (err) {
            res.status(500).json({ message: 'Error while deleting product', error: err })
        }
    } else {
        res.status(404).json({ message: 'Provide a valid product ID' })
    }
}

module.exports = { get_products, get_product_by_id, post_product,
    edit_product_by_id, delete_product_by_id }