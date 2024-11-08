import React, { useState } from 'react';

const StarRating = ({ productId, onRate }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    onRate(rate);  // Call the API to submit the rating
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= rating ? "gold" : "gray"}
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="cursor-pointer"
          onClick={() => handleRating(star)}
        >
          <path d="M12 .587l3.668 7.431 8.144 1.187-5.895 5.618 1.394 8.137-7.183-3.778-7.183 3.778 1.394-8.137-5.895-5.618 8.144-1.187z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
