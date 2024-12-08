'use client'

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from 'react-rating-stars-component';
import { FaStar } from 'react-icons/fa';
import TouristNavbar from "../Components/TouristNavBar";

interface RatingsAndCommentsPageProps {}

const RatingsAndCommentsPage: React.FC<RatingsAndCommentsPageProps> = () => {
  const { relatedObjectId, touristId, type } = useParams<{ relatedObjectId: string; touristId: string; type: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    if (!comment.trim()) {
      setError('Please enter a comment.');
      return;
    }

    setError('');

    try {
      console.log({ relatedObjectId, touristId, comment });
      await handleRequestType(relatedObjectId!, touristId!, type!);
      navigate(`/MainTouristPage/${touristId}`);
    } catch (error) {
      console.error('Failed to submit rating and comment:', error);
      setError('There was an error submitting your feedback. Please try again.');
    }
  };

  const handleRequestType = async (ratedId: string, touristId: string, type: string) => {
    let route = '';
    if (type === 'itinerary') {
      route = 'itineraries';
    } else if (type === 'guide') {
      route = 'tourGuide';
    } else if (type === 'activity') {
      route = 'activities';
    }

    try {
      await fetch(`/api/Tourist/${route}/${ratedId}/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, touristId }),
      });

      await fetch(`/api/Tourist/${route}/${ratedId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ touristId, comment }),
      });

      window.alert(`Rating and Comment have been added/updated to the ${type} Successfully! \n\nRating: ${rating}\nComment: ${comment}`);
    } catch (error) {
      console.error('Failed to submit rating and comment:', error);
      setError('There was an error submitting your feedback. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId!} />
      <p>hello</p>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaStar className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Submit Your Rating and Comment</h2>
                <p className="text-white opacity-75">
                  Share your experience
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-2xl font-semibold text-black mb-4" >Rating:</label>
                <Rating
                  count={5}
                  size={30}
                  value={rating}
                  onChange={handleRatingChange}
                  activeColor='#91c297'
                />
              </div>
              <div>
                <label htmlFor="comment" className="text-2xl font-semibold text-black mb-4">Comment:</label>
                <textarea
                  id="comment"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button 
                type="submit" 
                className="w-full bg-primary text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-hover transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingsAndCommentsPage;
