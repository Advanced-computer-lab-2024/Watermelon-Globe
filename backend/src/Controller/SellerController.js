const Seller = require('../Models/SellerModel')
const Product = require('../Models/ProductModel')
const mongoose = require('mongoose')

//get all sellers
const getAllSellers = async (req, res) => {
    const seller = await Seller.find({}).sort({createdAt: -1})

    res.status(200).json(seller)
}

//get single seller
const getSeller = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such seller'})
    }

    const seller = await Seller.findById(id)

    if (!seller){
        return res.status(400).json({error: 'No such seller'})
        }
    res.status(200).json(seller)
}

//create new seller
const createSeller = async (req, res) => {
    const {Name, Email, Description} = req.body
    try {
        const seller = await Seller.create({Name, Email, Description}) 
        res.status(200).json(seller)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a seller 
const deleteSeller = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such seller'})
    }

    const seller = await Seller.findOneAndDelete({_id: id})

    if (!seller){
        return res.status(400).json({error: 'No such seller'})
        }
    res.status(200).json(seller)
}

//uptade a seller
const updateSeller = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such seller'})
    }

    const seller = await Seller.findOneAndUpdate({_id: id},{
        ...req.body 
    })

    if (!seller){
        return res.status(400).json({error: 'No such seller'})
        }
    res.status(200).json(seller)
}

//////////////// product ///////////////

//create a new product
const createProduct = async (req, res) => {
    const { name,details, price, quantity,  description, seller, ratings } = req.body

    try {
        // Create a new product with the provided details
        const product = await Product.create({
            name,
            details,
            price,
            quantity,
            // picture,
            description,
            seller,
            ratings: ratings || 0,  // Initialize ratings to 0 if not provided
            // reviews: reviews || []  // Initialize reviews to an empty array if not provided
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



// Get all products
const getAllProducts = async (req, res) => {
    const products = await Product.find({}).sort({ createdAt: -1 })

    res.status(200).json(products)
}


//search a product by name
const searchProductbyName = async (req, res) => {
    try {
      // Access the product name from query parameters
      const productName = req.query.name;
  
      // Search for the product in the database using the name from query
      let product = await Product.find({ name: new RegExp(productName, 'i') });
  
      if (!product || product.length === 0) {
        // Return a 404 status code if no product is found
        return res.status(404).json({ error: 'No such product' });
      }
  
      // Return the found product(s) with a 200 status
      return res.status(200).json(product);
    } catch (error) {
      // Handle potential errors
      return res.status(500).json({ error: 'An error occurred while searching for the product' });
    }
  };
  


//filter products based on price
const filterProduct = async(req,res) => {

    let product = await Product.find(
        { Price: req.body.Price },
        req.body
    )
    if (!product){
        return res.status(400).json({error: 'No such product'})
    }

    return res.send(product).status(201)
}

//Update a product
const updateProduct = async (req, res) => {
    const { id } = req.query
    const { name, description, price} = req.body

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such product' })
    }

    try {
        // Update only the details and price fields
        const product = await Product.findOneAndUpdate(
            { _id: id },
            { name, description, price},
            { new: true } // Return the updated product
        )

        if (!product) {
            return res.status(400).json({ error: 'No such product' })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {createSeller , getAllSellers , getSeller , deleteSeller, updateSeller,
     createProduct , getAllProducts , searchProductbyName , filterProduct , updateProduct}
