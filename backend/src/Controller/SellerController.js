const Seller = require('../Models/sellerModel')
const Product = require('../Models/productModel')
const mongoose = require('mongoose')
const { findById } = require('../Models/touristModel')

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
    const {Name, Email, Password} = req.body
    try {
        const seller = await Seller.create({Name, Email,Password}) 
        res.status(200).json(seller)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a seller 
const deleteSeller = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such seller' });
    }

    try {
        // Find and delete the seller, and return the deleted document
        const seller = await Seller.findOneAndDelete({ _id: id });

        // Check if the seller exists
        if (!seller) {
            return res.status(400).json({ error: 'No such seller' });
        }

        res.status(200).json({ message: 'Seller deleted successfully', seller });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//uptade a seller
const updateSeller = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such seller' });
    }

    try {
        // Find and update the seller, returning the updated document
        const seller = await Seller.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true } // Returns the updated document
        );

        // Check if the seller exists
        if (!seller) {
            return res.status(400).json({ error: 'No such seller' });
        }

        res.status(200).json({ message: 'Seller updated successfully', seller });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//////////////// product ///////////////

//create a new product
const createProduct = async (req, res) => {
    const { name, price, quantity,  description, seller } = req.body

    try {
        // Create a new product with the provided details
        const product = await Product.create({
            name,
            price,
            quantity,
            // picture,
            description,
            seller
            // Initialize ratings to 0 if not provided
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
const filterProduct = async (req, res) => {
    // Extract the Price from the URL parameters
    const { price } = req.params;  // Assuming the param is named 'price'
  
    try {
      // Convert the price to a number for comparison
      const priceValue = parseFloat(price);
  
      if (isNaN(priceValue)) {
        return res.status(400).json({ error: 'Invalid price format' });
      }
  
      // Find the product by price
      let product = await Product.findOne({ price: priceValue });
  
      if (!product) {
        return res.status(400).json({ error: 'No such product' });
      }
  
      // Return the found product
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while fetching the product' });
    }
  };
  


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
// Sort products by ratings
const sortProducts = async (req, res) => {
    try {
        // Fetch all products and sort them by ratings in descending order
        const products = await Product.find({}).sort({ ratings: -1 })

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateRatingProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.query;
  
        // Parse rating as a number
        const numericRating = Number(rating);
        console.log('Received rating:', numericRating);
  
        // Check if the rating is a valid number between 1 and 5
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ message: 'Invalid rating. Rating should be between 1 and 5.' });
        }
  
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
  
        // Initialize the values if not already set
        product.noOfRatings = product.noOfRatings || 0;
        product.ratingsSum = product.ratingsSum || 0;
        product.rating = product.rating || 0;
  
        // Increment noOfRatings and ratingsSum with the new rating
        product.noOfRatings += 1;
        product.ratingsSum += numericRating;
  
        // Calculate the new average rating
        product.rating = product.ratingsSum / product.noOfRatings;
  
       
        await product.save();
  
        return res.status(200).json({
            message: 'Rating updated successfully',
            averageRating: product.rating,
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
  };

  const changePasswordSeller = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword, newPasswordConfirmed } = req.query; // Changed to req.body
  
    console.log(id, oldPassword, newPassword);
  
    // Validate inputs
    if (!oldPassword) {
      return res.status(400).json({ error: "Old password is required" }); // Use 400 for bad requests
    }
    if (!newPassword) {
      return res.status(400).json({ error: "New password is required" });
    }
    if (!newPasswordConfirmed) {
      return res.status(400).json({ error: "New password confirmation is required" });
    }
  
    try {
      const seller = await Seller.findOne({ _id: id });
  
      if (!seller) {
        return res.status(404).json({ error: "seller not found" }); // Tourist not found
      }
  
      // Compare the old password directly
      if (seller.Password !== oldPassword) {
        return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
      }
  
      // Check if new passwords match
      if (newPassword !== newPasswordConfirmed) {
        return res.status(400).json({ error: "New password and confirmed password do not match" });
      }
  
      // Update the password directly
      seller.Password = newPassword;
      await seller.save();
  
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

  const reviewProduct =async(req,res)=>{
    const {ReviewerId,ProductId} = req.params;
    const {Review}=req.query;

    const product = await Product.findById(ProductId);
    if(!product){
        res.status(400).json({message:"Product cannot be found"})
    }
    else{
        try{
            product.reviews.push({
                reviewer: ReviewerId, // Use correct field name as per schema
                review: Review        // Use correct field name as per schema
            });
        await product.save();
        res.status(200).json({ message: "Review was added successfully" });
        }
        catch{
            console.error("Error updating reviews:", error);
            res.status(500).json({ error: "Server error" });
        }

    }




  }
  


module.exports = {createSeller , getAllSellers , getSeller , deleteSeller, updateSeller,
     createProduct , getAllProducts , searchProductbyName , filterProduct , updateProduct,
      sortProducts,updateRatingProduct,changePasswordSeller,reviewProduct}