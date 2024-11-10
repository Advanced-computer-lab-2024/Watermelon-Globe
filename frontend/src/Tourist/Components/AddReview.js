import React, { useState } from 'react';

const AddReview = ({ productId, onAddReview }) => {
  const [review, setReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const handleSubmit = () => {
    onAddReview(review);  // Call the API to submit the review
    setReview("");
    setIsReviewing(false);
  };

  return (
    <div>
      {isReviewing ? (
        <div className="mt-4">
          <textarea
            className="border p-2 w-full"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      ) : (
        <button
          className="bg-gray-500 text-white px-4 py-2"
          onClick={() => setIsReviewing(true)}
        >
          Add Review
        </button>
      )}
    </div>
  );
};

export default AddReview;
