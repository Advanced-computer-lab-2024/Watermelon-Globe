import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActivityDetails = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await fetch(`/api/Activities/activities/${activityId}`);
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity details:', error);
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  if (!activity) {
    return <p>Loading activity details...</p>;
  }

  // Share functionality
  // const handleShareLink = () => {
  //   const activityUrl = `${window.location.origin}/activityDetails/${activityId}`;
  //   navigator.clipboard.writeText(activityUrl)
  //     .then(() => alert('Activity link copied to clipboard!'))
  //     .catch(err => alert('Failed to copy link: ' + err));
  // };

  // const handleShareEmail = () => {
  //   const activityUrl = `${window.location.origin}/activityDetails/${activityId}`;
  //   const subject = encodeURIComponent('Check out this activity!');
  //   const body = encodeURIComponent(`I thought you might be interested in this activity: ${activityUrl}`);
  //   window.location.href = `mailto:?subject=${subject}&body=${body}`;
  // };

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">{activity.Name}</h2>
      {/* <p className="text-gray-600 mb-4">Location: {activity.Location.coordinates.join(', ')}</p> */}
      <p className="text-gray-600 mb-4">Price: ${activity.Price}</p>
      <p className="text-gray-600 mb-4">Discount: {activity.Discount}%</p>
      <p className="text-gray-600 mb-4">Date: {new Date(activity.Date).toLocaleDateString()}</p>
      <p className="text-gray-600 mb-4">Time: {activity.Time}</p>
      <p className="text-gray-600">{activity.Description}</p>

      {/* Share Buttons */}
      {/* <div className="share-buttons mt-6">
        <button onClick={handleShareLink} className="share-button mr-4">Copy Link</button>
        <button onClick={handleShareEmail} className="share-button">Share via Email</button>
      </div> */}
    </section>
  );
};

export default ActivityDetails;
