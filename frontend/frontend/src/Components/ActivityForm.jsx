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

    const handleChange = (e) => {
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        });
    };

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
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ActivityForm;
