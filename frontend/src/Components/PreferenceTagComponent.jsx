import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreferenceTagComponent = () => {
    const [preferenceTags, setPreferenceTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [updatedTag, setUpdatedTag] = useState('');

    useEffect(() => {
        fetchPreferenceTags();
    }, []);

    const fetchPreferenceTags = async () => {
        try {
            const response = await axios.get('/PreferenceTag/');
            setPreferenceTags(response.data);
        } catch (error) {
            console.error('Error fetching preference tags:', error);
        }
    };

    const createTag = async () => {
        try {
            await axios.post('/PreferenceTag/', { name: newTag });
            fetchPreferenceTags();  // Refresh the list
        } catch (error) {
            console.error('Error creating preference tag:', error);
        }
    };

    const updateTag = async (id) => {
        try {
            await axios.put(`/PreferenceTag/${id}`, { name: updatedTag });
            fetchPreferenceTags();  // Refresh the list
        } catch (error) {
            console.error('Error updating preference tag:', error);
        }
    };

    const deleteTag = async (id) => {
        try {
            await axios.delete(`/PreferenceTag/${id}`);
            fetchPreferenceTags();  // Refresh the list
        } catch (error) {
            console.error('Error deleting preference tag:', error);
        }
    };

    return (
        <div>
            <h2>Preference Tags</h2>
            <input 
                type="text" 
                placeholder="New Tag Name" 
                value={newTag} 
                onChange={(e) => setNewTag(e.target.value)} 
            />
            <button onClick={createTag}>Create Tag</button>

            <ul>
                {preferenceTags.map(tag => (
                    <li key={tag.id}>
                        {tag.name} 
                        <input 
                            type="text" 
                            placeholder="Update Tag Name" 
                            value={updatedTag} 
                            onChange={(e) => setUpdatedTag(e.target.value)} 
                        />
                        <button onClick={() => updateTag(tag.id)}>Update</button>
                        <button onClick={() => deleteTag(tag.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PreferenceTagComponent;
