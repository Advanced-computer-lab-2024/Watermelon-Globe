import React from 'react';

const ViewReviewsModal = ({ productId, reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Reviews for Product {productId}</h2>
        
        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4">
                <p className="font-semibold">Reviewer: {review.reviewer}</p>
                <p className="text-gray-700 mt-2">{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
        
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewReviewsModal;
