import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '' });
    const [searchName, setSearchName] = useState('');
    const [filterPrice, setFilterPrice] = useState('');
    const [sortByRating, setSortByRating] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const createProduct = async () => {
        try {
            await axios.post('/createProduct/', newProduct);
            fetchProducts();  // Refresh the list
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const filterByPrice = async () => {
        try {
            const response = await axios.get(`/filterProductPrice/${filterPrice}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error filtering products by price:', error);
        }
    };

    const searchByName = async () => {
        try {
            const response = await axios.get(`/searchProductName?name=${searchName}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error searching products by name:', error);
        }
    };

    const sortProducts = async () => {
        try {
            const response = await axios.get('/sortProducts');
            setProducts(response.data);
        } catch (error) {
            console.error('Error sorting products by rating:', error);
        }
    };

    return (
        <div>
            <h2>Products</h2>
            <div>
                <input 
                    type="text" 
                    placeholder="New Product Name" 
                    value={newProduct.name} 
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
                />
                <input 
                    type="number" 
                    placeholder="New Product Price" 
                    value={newProduct.price} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} 
                />
                <button onClick={createProduct}>Create Product</button>
            </div>

            <div>
                <input 
                    type="text" 
                    placeholder="Search by Name" 
                    value={searchName} 
                    onChange={(e) => setSearchName(e.target.value)} 
                />
                <button onClick={searchByName}>Search</button>
            </div>

            <div>
                <input 
                    type="number" 
                    placeholder="Filter by Price" 
                    value={filterPrice} 
                    onChange={(e) => setFilterPrice(e.target.value)} 
                />
                <button onClick={filterByPrice}>Filter</button>
            </div>

            <div>
                <button onClick={sortProducts}>Sort by Rating</button>
            </div>

            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductComponent;
