const Admin = require('../Models/AdminModel')
const Governer = require('../Models/tourismGovernorModel')
const PreferenceTag = require('../Models/preferenceTagModel')
const ActivityCategory = require('../Models/activityCategoryModel')
const Product = require('../Models/ProductModel')
const Complaint = require('../Models/Complaint')
const mongoose = require('mongoose')


const getAllAdmin = async (req, res) => {
    try {
        const admin = await Admin.find({}).sort({ createdAt: -1 });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admins', error: error.message });
    }
};


const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    // Check if username or password are empty
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Check if the username or password already exists
        const existingAdmin = await Admin.findOne({
            $or: [{ username }, { password }]
        })
        
        if (existingAdmin) {
            return res.status(400).json({ error: 'This username or password already exists' });
        }

        // Create new admin if validations pass
        const admin = await Admin.create({ username, password });
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

const getAllGoverner = async (req, res) => {
    const governer = await Governer.find({}).sort({createdAt: -1})

    res.status(200).json(governer)
}

//create new Governer
const createGoverner = async (req, res) => {
    const { username, password } = req.body;

    // Check if username or password are empty
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Check if the username or password already exists
        const existingGoverner = await Governer.findOne({
            $or: [{ username }, { password }]
        });
        
        if (existingGoverner) {
            return res.status(400).json({ error: 'This username or password already exists' });
        }

        // Create new Governer if validations pass
        const governer = await Governer.create({ username, password });
        res.status(200).json(governer);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
    console.log(id);    

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
    const { name, price, quantity,  description, seller, ratings } = req.body

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
      let product = await Product.find({ price: priceValue });
  
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

const sortProducts = async (req, res) => {
    try {
        // Fetch all products and sort them by ratings in descending order
        const products = await Product.find({}).sort({ ratings: -1 })

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const changePasswordAdmin = async (req, res) => {
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
      const admin = await Admin.findOne({ _id: id });
  
      if (!admin) {
        return res.status(404).json({ error: "admin not found" }); // Tourist not found
      }
  
      // Compare the old password directly
      if (admin.password !== oldPassword) {
        return res.status(401).json({ error: "Wrong old password" }); // Use 401 for unauthorized access
      }
  
      // Check if new passwords match
      if (newPassword !== newPasswordConfirmed) {
        return res.status(400).json({ error: "New password and confirmed password do not match" });
      }
  
      // Update the password directly
      admin.password = newPassword;
      await admin.save();
  
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
  

// Get all Complaints
const getAllComplaints = async (req, res) => {
    const complaint = await Complaint.find({}).sort({ createdAt: -1 })

    res.status(200).json(complaint)
}

//get single Complaint
const getComplaint = async (req, res) => {
    const {id} = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(400).json({error: 'No such activity'})
    // }

    const complaint = await Complaint.findById(id)

    if (!complaint){
        return res.status(400).json({error: 'No such complaint'})
        }
    res.status(200).json(complaint)
}

// Function to update complaint status
const updateComplaint = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the complaint by its ID and update the status if it's 'pending'
      const complaint = await Complaint.findOneAndUpdate(
        { _id: id, status: 'pending' },  // Condition to only update if status is 'pending'
        { status: 'resolved' },          // Update the status to 'resolved'
        { new: true }                    // Return the updated document
      );
  
      // If no complaint found or already resolved, return an error
      if (!complaint) {
        return res.status(400).json({ error: 'already resolved' });
      }
  
      res.status(200).json({ message: 'Complaint resolved successfully', complaint });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Function to reply to a complaint
  const replyComplaint = async (req, res) => {
    const { id } = req.params; // Get complaint ID from URL params
    const { reply } = req.body; // Get reply content from the request body
  
    if (!reply) {
      return res.status(400).json({ error: 'Reply cannot be empty' });
    }
  
    try {
      // Find the complaint by its ID and update the reply field
      const complaint = await Complaint.findOneAndUpdate(
        { _id: id },                // Find the complaint by ID
        { reply: reply },           // Set the reply
        { new: true }               // Return the updated complaint
      );
  
      // If no complaint found
      if (!complaint) {
        return res.status(404).json({ error: 'Complaint not found' });
      }
  
      // Send back the updated complaint with the reply
      res.status(200).json({
        message: 'Reply added successfully',
        complaint
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = {createAdmin , deleteAdmin, createGoverner, deleteGoverner,
     getAllPreferenceTag, getPreferenceTag, createPreferenceTag, deletePreferenceTag, updatePreferenceTag,
     getAllActivityCategory, getActivityCategory, createActivityCategory, deleteActivityCategory
     , updateActivityCategory, createProduct, getAllProducts, searchProductbyName, filterProduct, 
    updateProduct, sortProducts, getAllAdmin, getAllGoverner, getAllComplaints, getComplaint, updateComplaint,
    replyComplaint
    ,changePasswordAdmin}