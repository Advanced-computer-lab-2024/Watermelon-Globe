import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminComponent = () => {
    const [admins, setAdmins] = useState([]);
    const [governors, setGovernors] = useState([]);
    const [preferenceTags, setPreferenceTags] = useState([]);
    const [activityCategories, setActivityCategories] = useState([]);
    const [products, setProducts] = useState([]);

    // State for new entries
    const [newAdmin, setNewAdmin] = useState({ username: '', password: '' });
    const [newGovernor, setNewGovernor] = useState({ username: '', password: '' });
    const [newPreferenceTag, setNewPreferenceTag] = useState({ tag: '' });
    const [newActivityCategory, setNewActivityCategory] = useState({ activity: '' });
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchAdmins();
        fetchGovernors();
        fetchPreferenceTags();
        fetchActivityCategories();
        fetchProducts();
        setAdmins([]);
        setGovernors([]);
        setPreferenceTags([]);
        setActivityCategories([]);
        setProducts([]);
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
            <ul>
                {preferenceTags.map((tag) => (
                    <li key={tag._id}>
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
        </div>
    );
};

export default AdminComponent;
