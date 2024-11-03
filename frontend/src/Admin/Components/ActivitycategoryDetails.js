import { useState } from 'react';
import { useActivityCategoryContext } from '../hooks/useActivityCategoryContext';

const ActivitycategoryDetails = ({ activitycategory }) => {
    const { dispatch } = useActivityCategoryContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newActivity, setNewActivity] = useState(activitycategory.activity);
    const [error, setError] = useState(null);

    // Function to handle deleting the activity category
    const handleClick = async () => {
      const response = await fetch('/api/Admin/ActivityCategory/' + activitycategory._id, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'DELETE_ACTIVITYCATEGORY', payload: json });
      }
    };

    // Function to handle updating the activity category
    const handleUpdate = async () => {
      const response = await fetch('/api/Admin/ActivityCategory/' + activitycategory._id, {
        method: 'PUT',
        body: JSON.stringify({ activity: newActivity }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      
      if (!response.ok) {
        setError(json.error); // Show error if the update fails
      } else {
        dispatch({ type: 'UPDATE_ACTIVITYCATEGORY', payload: json });
        setIsEditing(false); // Exit edit mode on success
      }
    };

    return (
      <div className="activitycategory-details">
        {isEditing ? (
          <div>
            <input 
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h4>{activitycategory.activity}</h4>
            <p>{activitycategory.createdAt}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <span onClick={handleClick}>Delete</span>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    );
};

export default ActivitycategoryDetails;