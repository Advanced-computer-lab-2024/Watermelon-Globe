import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminComponent = () => {
    const [admins, setAdmins] = useState([]);
    const [governors, setGovernors] = useState([]);
    const [preferenceTags, setPreferenceTags] = useState([]);
    const [activityCategories, setActivityCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [tourGuides, setTourGuides] = useState([]);

    // State for new entries
    const [data, setData] = useState(null); // Holds the response data from backend
    const [error, setError] = useState(null); // Holds any error message
    const [prefId, setPrefId] = useState('');
    const [rawJson, setRawJson] = useState(''); // State for raw JSON input

    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
    const [newGovernor, setNewGovernor] = useState({ username: '', password: '' });
    const [newPreferenceTag, setNewPreferenceTag] = useState({ tag: '' });
    const [newActivityCategory, setNewActivityCategory] = useState({ activity: '' });
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });
    const [newTourGuide, setNewTourGuide] = useState({ name: '', username: '', email: '', password: '', mobileNumber: '', nationality: '', yearsOfExperience: '' });

    useEffect(() => {
        fetchAdmins();
        fetchGovernors();
        fetchPreferenceTags();
        fetchActivityCategories();
        fetchProducts();
        fetchTourGuides();
        setAdmins([]);
        setGovernors([]);
        setPreferenceTags([]);
        setActivityCategories([]);
        setProducts([]);
        setTourGuides([]);
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await axios.get('/getAllAdmin');
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const fetchGovernors = async () => {
        try {
            const response = await axios.get('/getGoverner');
            setGovernors(response.data);
        } catch (error) {
            console.error('Error fetching governors:', error);
        }
    };

    const fetchPreferenceTags = async () => {
        try {
            const response = await axios.get('/getAllPreferenceTag');
            setPreferenceTags(response.data);
        } catch (error) {
            console.error('Error fetching preference tags:', error);
        }
    };

    const fetchActivityCategories = async () => {
        try {
            const response = await axios.get('/getAllActivityCategory');
            setActivityCategories(response.data);
        } catch (error) {
            console.error('Error fetching activity categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/getAllProducts');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const fetchTourGuides = async () => {
        try {
            const response = await axios.get('/getAllGuides'); 
            setTourGuides(response.data);
        } catch (error) {
            console.error('Error fetching tour guides:', error);
        }
    };

    const deleteAdmin = async (id) => {
        try {
            await axios.delete(`/Admin/${id}`);
            fetchAdmins();
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const deleteGovernor = async (id) => {
        try {
            await axios.delete(`/deleteGoverner/${id}`);
            fetchGovernors();
        } catch (error) {
            console.error('Error deleting governor:', error);
        }
    };

    const deletePreferenceTag = async (id) => {
        try {
            await axios.delete(`/deletePreferenceTag/${id}`);
            fetchPreferenceTags();
        } catch (error) {
            console.error('Error deleting preference tag:', error);
        }
    };

    const deleteTourGuide = async (id) => {
        try {
            await axios.delete(`/deleteGuide/${id}`);
            fetchTourGuides();
        } catch (error) {
            console.error('Error deleting tour Guide:', error);
        }
    };

    const deleteActivityCategory = async (id) => {
        try {
            await axios.delete(`/deleteActivityCategory/${id}`);
            fetchActivityCategories();
        } catch (error) {
            console.error('Error deleting activity category:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/Product/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleInputChange = (event, setState) => {
        const { name, value } = event.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleRequest = async (url, method = 'get', rawJson = null) => {
        try {
          let response;
          let options = {
            headers: { 'Content-Type': 'application/json' },
          };
      
          if (method === 'get' && rawJson) {
            // Convert the raw JSON to query string parameters for GET request
            const queryParams = new URLSearchParams(JSON.parse(rawJson)).toString();
            url = `${url}?${queryParams}`; // Add query parameters to the URL
          } else if (method === 'post' || method === 'put') {
            const body = JSON.parse(rawJson); // Convert raw JSON input to JS object
            options.data = body; // Add the body to the request options
          }
      
          response = await axios({ method, url, ...options });
          console.log(response);
          setData(response.data);  // Set the response data
          setError(null);  // Reset error if the request succeeds
          setRawJson('');  // Clear the raw JSON input after the request
        //   setActivId('');
        //   setChildItineraryId('');
        //   setGovId('');
        //   setGuide1Id('');
        //   setGuideId('');
        //   setItineraryId('');
        //   setProfId('');
        //   setSiteId('');
        } catch (err) {
          setError(err.response ? err.response.data : "Something went wrong");
        }
      };

      

    const createEntity = async (url, entity, fetchFunction) => {
        try {
            await axios.post(url, entity);
            fetchFunction();
        } catch (error) {
            console.error(`Error creating entity at ${url}:`, error);
        }
    };

    return (
        <div>

            <h2>Raw JSON Body</h2>
            <textarea
                rows={10}
                cols={50}
                value={rawJson}
                onChange={(e) => setRawJson(e.target.value)}
                placeholder="Enter raw JSON Here"
                style={{ width: '100%', marginBottom: '20px' }}
            />


            <h2>Admin Management</h2>
            <Link to="/create-admin">
                <button>Create New Admin</button>
            </Link>
            <ul>
                {admins.map((admin) => (
                    <li key={admin._id}>
                        {admin.username}
                        <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Governor Management</h2>
            <input
                name="username"
                value={newGovernor.username}
                onChange={(e) => handleInputChange(e, setNewGovernor)}
                placeholder="Username"
            />
            <input
                name="password"
                value={newGovernor.password}
                onChange={(e) => handleInputChange(e, setNewGovernor)}
                placeholder="Password"
                type="password"
            />
            <button onClick={() => createEntity('/createGoverner', newGovernor, fetchGovernors)}>Add Governor</button>
            <ul>
                {governors.map((governor) => (
                    <li key={governor._id}>
                        {governor.username}
                        <button onClick={() => deleteGovernor(governor._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Preference Tag Management</h2>
            <input
                name="tag"
                value={newPreferenceTag.tag}
                onChange={(e) => handleInputChange(e, setNewPreferenceTag)}
                placeholder="Tag"
            />
            <button onClick={() => createEntity('/createPreferenceTag', newPreferenceTag, fetchPreferenceTags)}>
                Add Preference Tag
            </button>
            <button onClick={() => handleRequest(`/updatePreferenceTag/${prefId}`, 'put', rawJson)}>
                update Preference Tag
            </button>

            <div>
                <input
                    type="text"
                    value={prefId}
                    onChange={(e) => setPrefId(e.target.value)}
                    placeholder="Enter pref. tag ID"
                />
            </div>

            <ul>
                {preferenceTags.map((tag) => (
                    <li key={tag._id}>
                        {tag._id}
                        {tag.tag}
                        <button onClick={() => deletePreferenceTag(tag._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Activity Category Management</h2>
            <input
                name="activity"
                value={newActivityCategory.activity}
                onChange={(e) => handleInputChange(e, setNewActivityCategory)}
                placeholder="Activity"
            />
            <button onClick={() => createEntity('/createActivityCategory', newActivityCategory, fetchActivityCategories)}>
                Add Activity Category
            </button>
            <ul>
                {activityCategories.map((category) => (
                    <li key={category._id}>
                        {category.activity}
                        <button onClick={() => deleteActivityCategory(category._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Product Management</h2>
            <input
                name="name"
                value={newProduct.name}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                placeholder="Name"
            />
            <input
                name="description"
                value={newProduct.description}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                placeholder="Description"
            />
            <input
                name="price"
                value={newProduct.price}
                onChange={(e) => handleInputChange(e, setNewProduct)}
                placeholder="Price"
                type="number"
            />
            <button onClick={() => createEntity('/createProduct', newProduct, fetchProducts)}>Add Product</button>
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        {product.name} - ${product.price}
                        <button onClick={() => deleteProduct(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Tour Guide Management</h2>
            <input
                name="name"
                value={newTourGuide.name}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Name"
            />
            <input
                name="username"
                value={newTourGuide.username}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Username"
            />
            <input
                name="email"
                value={newTourGuide.email}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Email"
            />
            <input
                name="password"
                value={newTourGuide.password}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Password"
                type="password"
            />
            <input
                name="mobileNumber"
                value={newTourGuide.mobileNumber}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Mobile Number"
            />
            <input
                name="nationality"
                value={newTourGuide.nationality}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Nationality"
            />
            <input
                name="yearsOfExperience"
                value={newTourGuide.yearsOfExperience}
                onChange={(e) => handleInputChange(e, setNewTourGuide)}
                placeholder="Years of Experience"
                type="number"
            />
            <button onClick={() => createEntity('/addGuide', newTourGuide, fetchTourGuides)}>
                Add Tour Guide
            </button>
            <ul>
                {tourGuides.map((tourGuide) => (
                    <li key={tourGuide._id}>
                        {tourGuide.name} ({tourGuide.username})
                        <button onClick={() => deleteTourGuide(tourGuide._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminComponent;
