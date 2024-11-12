import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import './RatingsAndCommentsPage.css';

const RatingsAndCommentsPage = () => {
  const { relatedObjectId, touristId, type} = useParams();  // Extract both relatedObjectId and touristId from the URL params
  const navigate = useNavigate();  // For redirection after submit
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please enter a comment.');
      return;
    }

    setError('');  // Clear previous errors

    try {
      console.log({relatedObjectId, touristId, comment });
      handleRequestType(relatedObjectId, touristId, type);
      // Navigate back to MainTouristPage with the touristId after successful submission
      navigate(`/MainTouristPage/${touristId}`);
    } catch (error) {
      console.error('Failed to submit rating and comment:', error);
      setError('There was an error submitting your feedback. Please try again.');
    }
  };

  const handleRequestType = async(relatedObjectId, touristId, type) => {
    const ratedId = relatedObjectId;
    let route = '';
    if(type === 'itinerary'){
      route = 'itineraries'
    }
    if(type === 'guide'){
      route = 'tourGuide'
    }
    if(type === 'activity'){
      route = 'activities'
    }
      try {
        // Submit the rating
        await fetch(`/api/Tourist/${route}/${ratedId}/rate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating, touristId }),
        });
  
        // Submit the comment
        await fetch(`/api/Tourist/${route}/${ratedId}/comment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({touristId, comment}),
        });
        // Display success message
        window.alert(`Rating and Comment have been added/updated to the ${type} Successfully! \n\nRating: ${rating}\nComment: ${comment} `);
    }catch (error) {
      console.error('Failed to submit rating and comment:', error);
      setError('There was an error submitting your feedback. Please try again.');
    }};
  

  return (
    <div className="ratings-comments p-4">
      <h2 className="text-2xl mb-4">Submit Your Rating and Comment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Rating:</label>
          <Rating
            count={5}
            size={30}
            value={rating}
            onChange={handleRatingChange}
            activeColor="#ffd700"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Comment:</label>
          <textarea
            className="border w-full p-2"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RatingsAndCommentsPage;
