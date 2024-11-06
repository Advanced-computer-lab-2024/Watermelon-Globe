import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';

const RatingsAndCommentsPage = ({ relatedObjectId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
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

    setError(''); // Clear previous errors

    // Call the onSubmit prop to handle the form submission logic
    onSubmit({
      relatedObjectId,
      rating,
      comment,
    });
    
    // Reset the form after submission
    setRating(0);
    setComment('');
  };

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
