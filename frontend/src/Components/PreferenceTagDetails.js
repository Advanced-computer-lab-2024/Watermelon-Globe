import { useState } from 'react';
import { usePreferenceTagContext } from '../hooks/usePreferenceTagContext';

const PreferenceTagDetails = ({ preferencetag }) => {
    const { dispatch } = usePreferenceTagContext();
    const [isEditing, setIsEditing] = useState(false);
    const [newTag, setNewTag] = useState(preferencetag.tag);
    const [error, setError] = useState(null);

    const handleClick = async () => {
      const response = await fetch('/api/Admin/PreferenceTag/' + preferencetag._id, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'DELETE_PREFERENCETAG', payload: json });
      }
    };

    const handleUpdate = async () => {
      const response = await fetch('/api/Admin/PreferenceTag/' + preferencetag._id, {
        method: 'PUT',
        body: JSON.stringify({ tag: newTag }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();
      
      if (!response.ok) {
        setError(json.error); // Show error if the update fails
      } else {
        dispatch({ type: 'UPDATE_PREFERENCETAG', payload: json });
        setIsEditing(false); // Exit edit mode on success
      }
    };

    return (
      <div className="activitycategory-details">
        {isEditing ? (
          <div>
            <input 
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h4>{preferencetag.tag}</h4>
            <p>{preferencetag.createdAt}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <span onClick={handleClick}>Delete</span>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    );
};

export default PreferenceTagDetails;