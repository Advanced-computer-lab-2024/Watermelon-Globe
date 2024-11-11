import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItineraryDetails.css';

const CompletedItineraries = () => {
    const { id: touristId } = useParams(); // Get the tourist ID from the route params
    const [childItineraries, setChildItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchChildItineraries = async () => {
        try {
            const response = await fetch(`/api/Tourist/getMyCompletedItineraries/${touristId}`);
            if (!response.ok) {
                throw new Error('Child itinerary not found');
            }
            const data = await response.json();
            setChildItineraries(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChildItineraries();
    }, [touristId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Handler to redirect to the ratings page with parent itinerary ID and tourist ID
    const redirectToRatingsPage = (relatedId, type) => {
        if (type === 'guide') {
            navigate(`/ratingsAndCommentsPage/${relatedId}/${touristId}/${type}`);
        } else if (type === 'itinerary') {
            navigate(`/ratingsAndCommentsPage/${relatedId}/${touristId}/${type}`);
        }
    };

    return (
        <div className="itinerary-details">
            <h2>Completed Activities</h2>
            {childItineraries.map((child) => (
                <div key={child._id} className="child-itinerary-box">
                    <h3>Status: {child.status}</h3>
                    <p><strong>Total Price:</strong> ${child.totalPrice}</p>
                    <p><strong>Completed:</strong> {child.completed ? 'Yes' : 'No'}</p>

                    <h3>Itinerary Details</h3>
                    <p><strong>Name:</strong> {child.itinerary?.name}</p>
                    <p><strong>Locations:</strong> {child.itinerary?.locations?.join(', ')}</p>
                    <p><strong>Language of Tour:</strong> {child.itinerary?.languageOfTour}</p>
                    <p><strong>Price Per Day:</strong> ${child.itinerary?.priceOfTour}</p>

                    <h3>Chosen Dates</h3>
                    <ul>
                        {child.chosenDates.map((date, index) => (
                            <li key={index}>{new Date(date).toLocaleDateString()}</li>
                        ))}
                    </ul>

                    <h3>Chosen Times</h3>
                    <ul>
                        {child.chosenTimes.map((time, index) => (
                            <li key={index}>{time}</li>
                        ))}
                    </ul>

                    <h3>Activities</h3>
                    <ul>
                        {child.itinerary?.activities?.map((activity, index) => (
                            <li key={index}>
                                {activity.activityName} - {activity.duration}
                            </li>
                        ))}
                    </ul>

                    {/* Buttons for rating the tour guide and itinerary */}
                    <div className="rating-buttons">
                        <button onClick={() => redirectToRatingsPage(child.itinerary?.guide, 'guide')}>
                            Rate Tour Guide
                        </button>
                        <button onClick={() => redirectToRatingsPage(child.itinerary._id, 'itinerary')}>
                            Rate Itinerary
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CompletedItineraries;
