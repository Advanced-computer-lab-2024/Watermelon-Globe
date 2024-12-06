import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewDocuments.css';
const ViewDocuments = () => {
  const [documents, setDocuments] = useState({
    tourGuides: [],
    advertisers: [],
    sellers: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the documents when the component mounts
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/api/Admin/uploaded-documents');
        setDocuments(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load documents');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Handle accepting users
  const acceptUser = async (userType, id) => {
    try {
      let url = '';
      if (userType === 'advertiser') {
        url = `/api/Admin/acceptAdvertiser/${id}`;
      } else if (userType === 'seller') {
        url = `/api/Admin/acceptSeller/${id}`;
      } else if (userType === 'tourGuide') {
        url = `/api/Admin/acceptTourGuide/${id}`;
      }

      // Call the API to accept the user
      await axios.put(url);
      alert(`${userType} accepted successfully!`);

      // Optionally, refresh the list of documents after accepting the user
      const updatedResponse = await axios.get('/api/Admin/uploaded-documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      alert(`Error accepting ${userType}: ${error.message}`);
    }
  };

  // Handle rejecting users
  const rejectUser = async (userType, id) => {
    try {
      let url = '';
      if (userType === 'advertiser') {
        url = `/api/Admin/rejectAdvertiser/${id}`;
      } else if (userType === 'seller') {
        url = `/api/Admin/rejectSeller/${id}`;
      } else if (userType === 'tourGuide') {
        url = `/api/Admin/rejectTourGuide/${id}`;
      }

      // Call the API to reject the user
      await axios.put(url);
      alert(`${userType} rejected successfully!`);

      // Optionally, refresh the list of documents after rejecting the user
      const updatedResponse = await axios.get('/api/Admin/uploaded-documents');
      setDocuments(updatedResponse.data);
    } catch (error) {
      alert(`Error rejecting ${userType}: ${error.message}`);
    }
  };

  if (loading) return <div className="text-center text-lg mt-10">Loading documents...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Uploaded Documents</h1>

      {/* Section for Tour Guides */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Tour Guides</h2>
        {documents.tourGuides.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {documents.tourGuides.map((guide) => (
              <div key={guide._id} className="p-6 border rounded-lg shadow-lg bg-white">
                <h3 className="text-lg font-medium text-gray-800">{guide.username}</h3>
                {guide.idProof && <p className="text-sm text-gray-600"><strong>ID Proof:</strong> {guide.idProof}</p>}
                {guide.certificates && guide.certificates.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <strong>Certificates:</strong> {guide.certificates.join(', ')}
                  </p>
                )}
                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => acceptUser('tourGuide', guide._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => rejectUser('tourGuide', guide._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tour guides uploaded documents.</p>
        )}
      </div>

      {/* Section for Advertisers */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Advertisers</h2>
        {documents.advertisers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {documents.advertisers.map((advertiser) => (
              <div key={advertiser._id} className="p-6 border rounded-lg shadow-lg bg-white">
                <h3 className="text-lg font-medium text-gray-800">{advertiser.Username}</h3>
                {advertiser.idProof && <p className="text-sm text-gray-600"><strong>ID Proof:</strong> {advertiser.idProof}</p>}
                {advertiser.taxationRegistryCard && (
                  <p className="text-sm text-gray-600"><strong>Taxation Registry Card:</strong> {advertiser.taxationRegistryCard}</p>
                )}
                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => acceptUser('advertiser', advertiser._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => rejectUser('advertiser', advertiser._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No advertisers uploaded documents.</p>
        )}
      </div>

      {/* Section for Sellers */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sellers</h2>
        {documents.sellers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {documents.sellers.map((seller) => (
              <div key={seller._id} className="p-6 border rounded-lg shadow-lg bg-white">
                <h3 className="text-lg font-medium text-gray-800">{seller.Name}</h3>
                {seller.idProof && <p className="text-sm text-gray-600"><strong>ID Proof:</strong> {seller.idProof}</p>}
                {seller.taxationRegistryCard && (
                  <p className="text-sm text-gray-600"><strong>Taxation Registry Card:</strong> {seller.taxationRegistryCard}</p>
                )}
                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => acceptUser('seller', seller._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => rejectUser('seller', seller._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No sellers uploaded documents.</p>
        )}
      </div>
    </div>
  );
};

export default ViewDocuments;
