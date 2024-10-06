const Admin = require('../Models/AdminModel')
const Governer = require('../Models/GovernerModel')
const PreferenceTag = require('../Models/PreferenceTagModel')
const ActivityCategory = require('../Models/ActivityCategoryModel')
const mongoose = require('mongoose')

//create new Admin
const createAdmin = async (req, res) => {
    const {username, password} = req.body
    try {
        const admin = await Admin.create({username, password}) 
        res.status(200).json(admin)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a Admin 
const deleteAdmin = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such user'})
    }

    const admin = await Admin.findOneAndDelete({_id: id})

    if (!admin){
        return res.status(400).json({error: 'No such user'})
        }
    res.status(200).json(admin)
}

//create new Governer
const createGoverner = async (req, res) => {
    const {username, password} = req.body
    try {
        const governer = await Governer.create({username, password}) 
        res.status(200).json(governer)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a Governer 
const deleteGoverner = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such user'})
    }

    const governer = await Governer.findOneAndDelete({_id: id})

    if (!governer){
        return res.status(400).json({error: 'No such user'})
        }
    res.status(200).json(governer)
}

//get all PreferenceTag
const getAllPreferenceTag = async (req, res) => {
    const preferencetag = await PreferenceTag.find({}).sort({createdAt: -1})

    res.status(200).json(preferencetag)
}

//get single preferencetag
const getPreferenceTag = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such tag'})
    }

    const preferencetag = await PreferenceTag.findById(id)

    if (!preferencetag){
        return res.status(400).json({error: 'No such tag'})
        }
    res.status(200).json(preferencetag)
}

//create new preferencetag
const createPreferenceTag = async (req, res) => {
    const {tag} = req.body

    let emptyFields = []
        if (!tag) {
            emptyFields.push('tag')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }

        const existingTag = await PreferenceTag.findOne({ tag });
        if (existingTag) {
            return res.status(400).json({ error: 'This tag already exists' });
        }

    try {

        const preferencetag = await PreferenceTag.create({tag}) 
        res.status(200).json(preferencetag)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a preferencetag 
const deletePreferenceTag = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such tag'})
    }

    const preferencetag = await PreferenceTag.findOneAndDelete({_id: id})

    if (!preferencetag){
        return res.status(400).json({error: 'No such tag'})
        }
    res.status(200).json(preferencetag)
}

//uptade a preferencetag
const updatePreferenceTag = async (req, res) => {
    const {id} = req.params
    const { tag } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such tag'})
    }

    let emptyFields = []
        if (!tag) {
            emptyFields.push('tag')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }

    const existingTag = await PreferenceTag.findOne({ tag });

        if (existingTag) {
            return res.status(400).json({ error: 'Tag name already exists' });
        }
        else{

    const preferencetag = await PreferenceTag.findOneAndUpdate({_id: id},{
        ...req.body 
    })

    if (!preferencetag){
        return res.status(400).json({error: 'No such tag'})
        }
    res.status(200).json(preferencetag)
        }
}

//get all activitycategory
const getAllActivityCategory = async (req, res) => {
    const activitycategory = await ActivityCategory.find({}).sort({createdAt: -1})

    res.status(200).json(activitycategory)
}

//get single activitycategory
const getActivityCategory = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activitycategory = await ActivityCategory.findById(id)

    if (!activitycategory){
        return res.status(400).json({error: 'No such activity'})
        }
    res.status(200).json(activitycategory)
}

//create new activitycategory
const createActivityCategory = async (req, res) => {
    const {activity} = req.body

    let emptyFields = []
        if (!activity) {
            emptyFields.push('activity')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }

        const existingCategory = await ActivityCategory.findOne({ activity });
        if (existingCategory) {
            return res.status(400).json({ error: 'This category already exists' });
        }

    
    try {
        const activitycategory = await ActivityCategory.create({activity}) 
        res.status(200).json(activitycategory)
    }
    catch (error){
        res.status(400).json({error: error.mssg})
    }
}

//delete a activitycategory 
const deleteActivityCategory = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    const activitycategory = await ActivityCategory.findOneAndDelete({_id: id})

    if (!activitycategory){
        return res.status(400).json({error: 'No such activity'})
        }
    res.status(200).json(activitycategory)
}

//uptade a activitycategory
const updateActivityCategory = async (req, res) => {
    const {id} = req.params
    const { activity } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such activity'})
    }

    let emptyFields = []
        if (!activity) {
            emptyFields.push('activity')
        }
        if (emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
        }

    const existingActivity = await ActivityCategory.findOne({ activity });

        if (existingActivity) {
            return res.status(400).json({ error: 'Activity name already exists' });
        }
        else{

    const activitycategory = await ActivityCategory.findOneAndUpdate({_id: id},{
        ...req.body 
    })

    if (!activitycategory){
        return res.status(400).json({error: 'No such activity'})
        }
    res.status(200).json(activitycategory)
        }
}

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

module.exports = {createAdmin , deleteAdmin, createGoverner, deleteGoverner,
     getAllPreferenceTag, getPreferenceTag, createPreferenceTag, deletePreferenceTag, updatePreferenceTag,
     getAllActivityCategory, getActivityCategory, createActivityCategory, deleteActivityCategory
     , updateActivityCategory, createProduct, getAllProducts, searchProductbyName, filterProduct, 
    updateProduct}