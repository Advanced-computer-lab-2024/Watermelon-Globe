<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ActivityForm = () => {
    const [activity, setActivity] = useState({
        Date: '',
        Time: '',
        LocationType: 'Point', // Default type for location
        coordinates: '',       // User will input coordinates as a string
        Price: '',
        Category: '',
        Discount: '',
        bookingOpen: false,
    });
    
    const [tags, setTags] = useState([]); // To hold the fetched tags
    const [selectedTags, setSelectedTags] = useState([]); // To hold selected tag IDs

    const navigate = useNavigate();

    // Fetch tags from the database
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getTags'); // Adjust the URL as necessary
                setTags(response.data); // Assuming response.data contains the list of tags
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);
=======
import React, { useState } from 'react';
import axios from 'axios';

const ActivityForm = () => {
    const [activity, setActivity] = useState({
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        discount: '',
        bookingOpen: false,
    });
>>>>>>> c4ce3dc547e25db25175f6c03b8dbc46becda68a

    const handleChange = (e) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        });
    };

<<<<<<< HEAD
    const handleTagChange = (e) => {
        const tagId = e.target.value;
        if (e.target.checked) {
            // Add the tag ID if checked
            setSelectedTags([...selectedTags, tagId]);
        } else {
            // Remove the tag ID if unchecked
            setSelectedTags(selectedTags.filter(id => id !== tagId));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        console.log(userId);

        if (!userId) {
            console.error('User ID is missing. Cannot create activity.');
            return;
        }

        // Split coordinates input into an array of numbers
        const coordinatesArray = activity.coordinates.split(',').map(coord => parseFloat(coord.trim()));

        const activityData = {
            ...activity,
            Location: {
                type: activity.LocationType, // Set the type to 'Point'
                coordinates: coordinatesArray, // Use the parsed coordinates
            },
            tags: selectedTags, // Send selected tag IDs
            Advertiser: userId, // Add advertiser ID
        };

        console.log('Sending activity data:', activityData); 

        try {
            const response = await axios.post('http://localhost:8000/newActivity', activityData);
            console.log('Activity created:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error creating activity:', error.response.data); // Log error response
=======
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/activities', activity);
            console.log('Activity created:', response.data);
        } catch (error) {
            console.error('Error creating activity:', error);
>>>>>>> c4ce3dc547e25db25175f6c03b8dbc46becda68a
        }
    };

    return (
        <form onSubmit={handleSubmit}>
<<<<<<< HEAD
            <input 
                type="date" 
                name="Date" 
                value={activity.Date} 
                onChange={handleChange} 
                placeholder="Date" 
                required 
            />
            <input 
                type="time" 
                name="Time" 
                value={activity.Time} 
                onChange={handleChange} 
                placeholder="Time" 
                required 
            />
            <input 
                type="text" 
                name="coordinates" 
                value={activity.coordinates} 
                onChange={handleChange} 
                placeholder="Coordinates (lat, long)" 
                required 
            />
            <input 
                type="text" 
                name="Price" 
                value={activity.Price} 
                onChange={handleChange} 
                placeholder="Price" 
                required 
            />
            <input 
                type="text" 
                name="Category" 
                value={activity.Category} 
                onChange={handleChange} 
                placeholder="Category" 
                required 
            />
            <input 
                type="text" 
                name="Discount" 
                value={activity.Discount} 
                onChange={handleChange} 
                placeholder="Special Discounts" 
            />

            <div>
                <h4>Select Tags:</h4>
                {tags.map(tag => (
                    <label key={tag._id}>
                        <input 
                            type="checkbox" 
                            value={tag._id} 
                            onChange={handleTagChange} 
                        />
                        {tag.type} - {tag.historicPeriod} {/* Display tag information */}
                    </label>
                ))}
            </div>

            <label>
                Booking Open:
                <input 
                    type="checkbox" 
                    name="bookingOpen" 
                    checked={activity.bookingOpen} 
                    onChange={() => setActivity({ ...activity, bookingOpen: !activity.bookingOpen })} 
                />
=======
            <input type="date" name="date" value={activity.date} onChange={handleChange} placeholder="Date" />
            <input type="time" name="time" value={activity.time} onChange={handleChange} placeholder="Time" />
            <input type="text" name="location" value={activity.location} onChange={handleChange} placeholder="Location" />
            <input type="text" name="price" value={activity.price} onChange={handleChange} placeholder="Price" />
            <input type="text" name="category" value={activity.category} onChange={handleChange} placeholder="Category" />
            <input type="text" name="tags" value={activity.tags} onChange={handleChange} placeholder="Tags" />
            <input type="text" name="discount" value={activity.discount} onChange={handleChange} placeholder="Special Discounts" />
            <label>
                Booking Open:
                <input type="checkbox" name="bookingOpen" checked={activity.bookingOpen} onChange={() => setActivity({ ...activity, bookingOpen: !activity.bookingOpen })} />
>>>>>>> c4ce3dc547e25db25175f6c03b8dbc46becda68a
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ActivityForm;
