import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TouristComplaints = () => {
  const { touristId } = useParams();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!touristId) {
      setError('Tourist ID is missing. Please log in again.');
      return;
    }
    fetchComplaints();
  }, [touristId]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`/api/Tourist/myComplaints/${touristId}`);
      if (!response.ok) throw new Error('Failed to fetch complaints');
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError('Failed to load complaints. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!touristId) {
      setError('Tourist ID is missing. Please log in again.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/Tourist/Complaint/${touristId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      });

      if (!response.ok) throw new Error('Failed to submit complaint');

      setSuccess('Complaint submitted successfully!');
      setTitle('');
      setBody('');
      fetchComplaints();
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!touristId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Authentication Error</h1>
          <p className="text-gray-700 mb-6">Tourist ID is missing. Please log in again to access the complaints portal.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-black px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 mt-8">Tourist Complaints Portal</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complaint Form */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 transform transition duration-500 hover:scale-105">
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">File a New Complaint</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Complaint Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Brief title of your complaint"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                />
              </div>
              <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Complaint Details</label>
                <textarea
                  id="body"
                  placeholder="Provide more details about your complaint"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </form>
          </div>

          {/* Existing Complaints */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-3xl font-bold text-indigo-900 sticky top-0 bg-gradient-to-br from-purple-100 to-indigo-200 py-4">Your Complaints</h2>
            {complaints.length === 0 ? (
              <p className="text-gray-600 bg-white p-6 rounded-xl shadow-lg">You haven't filed any complaints yet.</p>
            ) : (
              complaints.map((complaint) => (
                <div key={complaint._id} className="bg-white shadow-lg rounded-xl p-6 transition duration-300 hover:shadow-2xl">
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-700">{complaint.title}</h3>
                  <p className="text-sm font-medium mb-3">
                    Status: <span className={`${complaint.status === 'resolved' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-gray-700 mb-4">{complaint.body}</p>
                  <p className="text-sm text-gray-500">
                    Filed on: {new Date(complaint.date).toLocaleDateString()}
                  </p>
                  {complaint.reply && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="font-semibold text-indigo-700 mb-2">Admin Reply:</p>
                      <p className="text-gray-700">{complaint.reply}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Success and Error Messages */}
        {success && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md" role="alert">
            <p className="font-bold">Success</p>
            <p>{success}</p>
          </div>
        )}
        {error && (
          <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristComplaints;



