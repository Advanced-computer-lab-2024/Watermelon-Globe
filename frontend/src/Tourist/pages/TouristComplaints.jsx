import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle, CheckCircle, Send, FileText, Clock, CheckSquare } from 'lucide-react';

const TouristComplaints = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Tourist ID is missing. Please log in again.');
      return;
    }
    fetchComplaints();
  }, [id]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`/api/Tourist/myComplaints/${id}`);
      if (!response.ok) throw new Error('Failed to fetch complaints');
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError('Failed to load complaints. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      setError('Tourist ID is missing. Please log in again.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/Tourist/Complaint/${id}`, {
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

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md w-full">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-6">Tourist ID is missing. Please log in again to access the complaints portal.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Tourist Complaints Portal</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Complaint Form */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <FileText className="mr-2 text-blue-500" />
                File a New Complaint
              </h2>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Clock className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" />
                      Submit Complaint
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Existing Complaints */}
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 sticky top-0 bg-white py-4 flex items-center">
                <CheckSquare className="mr-2 text-blue-500" />
                Your Complaints
              </h2>
              <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-300px)]">
                {complaints.length === 0 ? (
                  <p className="text-gray-600 bg-gray-50 p-6 rounded-lg">You haven't filed any complaints yet.</p>
                ) : (
                  complaints.map((complaint) => (
                    <div key={complaint._id} className="bg-gray-50 rounded-lg p-6 transition duration-300 hover:shadow-md">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{complaint.title}</h3>
                      <p className="text-sm font-medium mb-3 flex items-center">
                        Status: 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </span>
                      </p>
                      <p className="text-gray-600 mb-4">{complaint.body}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="mr-2" size={16} />
                        Filed on: {new Date(complaint.date).toLocaleDateString()}
                      </p>
                      {complaint.reply && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="font-semibold text-gray-700 mb-2 flex items-center">
                            <CheckCircle className="mr-2 text-green-500" size={16} />
                            Admin Reply:
                          </p>
                          <p className="text-gray-600">{complaint.reply}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Success and Error Messages */}
        {success && (
          <div className="mt-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md flex items-center" role="alert">
            <CheckCircle className="mr-3 flex-shrink-0" />
            <div>
              <p className="font-bold">Success</p>
              <p>{success}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md flex items-center" role="alert">
            <AlertCircle className="mr-3 flex-shrink-0" />
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristComplaints;