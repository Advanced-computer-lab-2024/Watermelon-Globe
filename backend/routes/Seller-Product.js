const express = require('express')
const {
    createSeller, 
    getAllSellers, 
    getSeller,
    deleteSeller,
    updateSeller,
    createProduct,
    getAllProducts,
    searchProductbyName,
    filterProduct,
    updateProduct
} = require('../Controller/Seller-ProductController')

const router = express.Router()

//////////////// Seller ////////////////

//Get all sellers
router.get('/sellers', getAllSellers)

//Get single seller
router.get('/getSeller/:id', getSeller)

//post a new seller 
router.post('/createSeller', createSeller)

//delete a seller 
router.delete('/deleteSeller/:id', deleteSeller)

//update a seller 
router.put('/updateSeller/:id', updateSeller)

//////////////// Seller ////////////////


//Get all products
router.get('/products', getAllProducts)

//Get single product
router.get('/filterProductPrice', filterProduct)

//post a new product 
router.post('/createProduct', createProduct);

//delete a product 
router.get('/searchProductName', searchProductbyName)

//update a product 
router.put('/editProduct', updateProduct)




module.exports = router

