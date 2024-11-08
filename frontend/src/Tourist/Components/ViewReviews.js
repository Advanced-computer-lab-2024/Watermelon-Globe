import React, { useState } from 'react';

const ViewReviewsModal = ({ productId, reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold">Product Reviews</h2>
        <ul className="mt-4 space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="border-b pb-2">
              <p className="font-semibold">{review.reviewer.username}</p>
              <p className="text-gray-600">{review.review}</p>
            </li>
          ))}
        </ul>
        <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewReviewsModal;
