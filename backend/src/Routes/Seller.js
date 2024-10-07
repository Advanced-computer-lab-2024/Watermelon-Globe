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
    updateProduct,
    sortProducts
} = require('../Controller/SellerController')

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
router.get('/filterProductPrice/:price', filterProduct)

//post a new product 
router.post('/createProduct', createProduct);

//delete a product 
router.get('/searchProductName', searchProductbyName)

//update a product 
router.put('/editProduct', updateProduct)

//sort Products according to Ratings
router.get('/sortProducts', sortProducts)



module.exports = router