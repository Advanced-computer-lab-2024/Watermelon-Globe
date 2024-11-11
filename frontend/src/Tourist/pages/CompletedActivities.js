import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItineraryDetails.css'; // Reuse existing CSS or create a new one for activities if needed

const CompletedActivities = () => {
    const { id: touristId } = useParams(); // Get the tourist ID from the route params
    const [completedActivities, setCompletedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCompletedActivities = async () => {
        try {                                
            const response = await fetch(`/api/Tourist/getMyCompletedActivities/${touristId}`);
            if (!response.ok) {
                throw new Error('Completed activities not found');
            }
            const data = await response.json();
            setCompletedActivities(data.completedActivities); // Access completedActivities from response
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompletedActivities();
    }, [touristId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Handler to redirect to the ratings page with activity ID and tourist ID
    const redirectToRatingsPage = (activityId, type) => {
        navigate(`/ratingsAndCommentsPage/${activityId}/${touristId}/${type}`);
    };

    return (
        <div className="itinerary-details">
            <h2>Completed Activities</h2>
            {completedActivities.map((activityBooking) => (
                <div key={activityBooking._id} className="activity-box">
                    <h3>Status: {activityBooking.status}</h3>
                    <p><strong>Total Price:</strong> ${activityBooking.activity.Price}</p>
                    <p><strong>Completed:</strong> {activityBooking.completed ? 'Yes' : 'No'}</p>

                    <h3>Activity Details</h3>
                    <p><strong>Name:</strong> {activityBooking.activity.Name}</p>
                    <p><strong>Location:</strong> {activityBooking.activity.Location.coordinates.join(', ')}</p>
                    <p><strong>Date:</strong> {new Date(activityBooking.activity.Date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {activityBooking.activity.Time}</p>
                    <p><strong>Price:</strong> ${activityBooking.activity.Price}</p>

                    <h3>Chosen Date</h3>
                    <p>{new Date(activityBooking.chosenDate).toLocaleDateString()}</p>

                    {/* Button for rating the activity */}
                    <div className="rating-buttons">
                        <button onClick={() => redirectToRatingsPage(activityBooking.activity._id, 'activity')}>
                            Rate Activity
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CompletedActivities;
