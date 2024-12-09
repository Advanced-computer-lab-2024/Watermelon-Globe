import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Checkbox, FormControlLabel, Button, Grid, InputAdornment, Select, MenuItem, FormControl, InputLabel, Tabs, Tab } from '@mui/material';
import './ActivityForm.css';
import Sidebar from './sidebar/Sidebar';
import Navbar from './AdvertiserNavbar';

const ActivityForm = () => {
    const {id} = useParams();
    console.log(id);
    const [activity, setActivity] = useState({
        Name: '',
        Date: '',
        Time: '',
        LocationType: 'Point',
        coordinates: '',
        Price: '',
        Category: '',
        Discount: '',
        tags: [],
        bookingOpen: false,
    });
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, tagsResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/Admin/getAllActivityCategory'),
                    axios.get('http://localhost:8000/api/Activities/getAllTags')
                ]);
                setCategories(categoriesResponse.data);
                setTags(tagsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleTagToggle = (tagId) => {
        setActivity(prevActivity => ({
            ...prevActivity,
            tags: prevActivity.tags.includes(tagId)
                ? prevActivity.tags.filter(id => id !== tagId)
                : [...prevActivity.tags, tagId]
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setActivity(prevActivity => ({
            ...prevActivity,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!id) {
            console.error('User ID is missing. Cannot create activity.');
            return;
        }
    
        const coordinatesArray = activity.coordinates
            .split(',')
            .map(coord => parseFloat(coord.trim()));
    
        const activityData = {
            ...activity,
            Location: {
                type: activity.LocationType,
                coordinates: coordinatesArray,
            },
            Advertiser: id,
        };
    
        try {
            const response = await axios.post('/api/Activities/newActivity', activityData);
            alert('Activity created successfully.');
            console.log('Activity created:', response.data);
            // navigate('/activities'); 
        } catch (error) {
            console.error(
                'Error creating activity:',
                error.response?.data || error.message
            );
            alert('Error creating activity. Please try again.');
        }
    };
    

    return (
        <div
        style={{
          backgroundColor: "#fff",
          minHeight: "100vh", // Ensures it covers the full viewport
          width: "102%", // Full width of the viewport
          margin: 0, // Remove default margins
          padding: 0, // Remove default padding
          display: "flex", // Optional: for flexible alignment
          flexDirection: "column",
        }}
      >
        <div className="listAdminProduct">
          <Sidebar />
          <div className="listContainerAdminProduct">
            <Navbar />
            <div style={{ padding: "20px" }}>
        <form className="activity-form full-width-form" onSubmit={handleSubmit}>
            <h2 className="form-header">Create a New Activity</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Activity Name"
                        name="Name"
                        value={activity.Name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="Date"
                        type="date"
                        name="Date"
                        value={activity.Date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="Time"
                        type="time"
                        name="Time"
                        value={activity.Time}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Coordinates (lat, long)"
                        name="coordinates"
                        value={activity.coordinates}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        label="Price"
                        name="Price"
                        value={activity.Price}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Discount"
                        name="Discount"
                        value={activity.Discount}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            name="Category"
                            value={activity.Category}
                            onChange={handleChange}
                            label="Category"
                        >
                            {categories.map((category) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.activity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl component="fieldset">
                    <InputLabel>Tags</InputLabel>
                    <Grid container spacing={2}>
                        {tags.map((tag) => (
                            <Grid item key={tag._id} xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={activity.tags.includes(tag._id)}
                                            onChange={() => handleTagToggle(tag._id)}
                                            name={tag.tag}
                                        />
                                    }
                                    label={tag.tag}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={activity.bookingOpen}
                                onChange={handleChange}
                                name="bookingOpen"
                            />
                        }
                        label="Booking Open"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Create Activity
                    </Button>
                </Grid>
            </Grid>
        </form>
        </div>
        </div>
        </div>
        </div>
    );
};

export default ActivityForm;

