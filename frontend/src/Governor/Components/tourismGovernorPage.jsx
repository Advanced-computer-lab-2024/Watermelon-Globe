import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TourismGovernorPage() {
  const [sites, setSites] = useState([]);
  const [siteId, setSiteId] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [sitePictures, setSitePictures] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [siteOpeningHours, setSiteOpeningHours] = useState('');
  const [siteTicketPrices, setSiteTicketPrices] = useState('');
  const [siteTag, setSiteTag] = useState('');
  const [siteTourismGovernor, setSiteTourismGovernor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleRequest = async (url, method = 'get', data = null) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let response;
      let options = {
        headers: { 'Content-Type': 'application/json' },
      };

      if (method === 'post' || method === 'put') {
        options.data = data;
      }

      response = await axios({ method, url, ...options });

      if (url.includes('getAllSites')) {
        setSites(response.data);
      } else if (url.includes('getSite')) {
        // Set only the specific site in the array
        setSites([response.data]);
      } else {
        setSuccess('Operation completed successfully');
        handleRequest('/api/Governor/getAllSites');
      }

      clearForm();
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setSiteId('');
    setSiteName('');
    setSiteDescription('');
    setSitePictures('');
    setSiteLocation('');
    setSiteOpeningHours('');
    setSiteTicketPrices('');
    setSiteTag('');
    setSiteTourismGovernor('');
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: siteName,
      description: siteDescription,
      pictures: sitePictures.split(',').map(pic => pic.trim()),
      location: siteLocation,
      openingHours: siteOpeningHours,
      ticketPrices: siteTicketPrices,
      tag: siteTag,
      tourismGovernor: siteTourismGovernor
    };
    if (isEditing) {
      handleRequest(`/api/Governor/updateSite/${siteId}`, 'put', data);
    } else {
      handleRequest('/api/Governor/addSite', 'post', data);
    }
  };

  const handleEdit = (site) => {
    setSiteId(site._id);
    setSiteName(site.name);
    setSiteDescription(site.description);
    setSitePictures(site.pictures.join(', '));
    setSiteLocation(site.location);
    setSiteOpeningHours(site.openingHours);
    setSiteTicketPrices(site.ticketPrices);
    setSiteTag(site.tag);
    setSiteTourismGovernor(site.tourismGovernor);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Governor's Site Management</h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Form for Adding or Editing Sites */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Update Site' : 'Add New Site'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
              <input
                id="siteName"
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">Site Description</label>
              <textarea
                id="siteDescription"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="sitePictures" className="block text-sm font-medium text-gray-700">Pictures (comma-separated URLs)</label>
              <input
                id="sitePictures"
                type="text"
                value={sitePictures}
                onChange={(e) => setSitePictures(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="siteLocation" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="siteLocation"
                type="text"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="siteOpeningHours" className="block text-sm font-medium text-gray-700">Opening Hours</label>
              <input
                id="siteOpeningHours"
                type="text"
                value={siteOpeningHours}
                onChange={(e) => setSiteOpeningHours(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="siteTicketPrices" className="block text-sm font-medium text-gray-700">Ticket Prices</label>
              <input
                id="siteTicketPrices"
                type="text"
                value={siteTicketPrices}
                onChange={(e) => setSiteTicketPrices(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="siteTag" className="block text-sm font-medium text-gray-700">Tag</label>
              <input
                id="siteTag"
                type="text"
                value={siteTag}
                onChange={(e) => setSiteTag(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="siteTourismGovernor" className="block text-sm font-medium text-gray-700">Tourism Governor</label>
              <input
                id="siteTourismGovernor"
                type="text"
                value={siteTourismGovernor}
                onChange={(e) => setSiteTourismGovernor(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex space-x-2">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                {isEditing ? 'Update Site' : 'Add Site'}
              </button>
              {isEditing && (
                <button type="button" onClick={clearForm} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Site Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Site Actions</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Site ID"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-md"
              />
              <button onClick={() => handleRequest(`/api/Governor/getSite/${siteId}`)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Get Site
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => handleRequest('/api/Governor/getAllSites')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Get All Sites
              </button>
              <button onClick={() => handleRequest(`/api/Governor/deleteSite/${siteId}`, 'delete')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                Delete Site
              </button>
            </div>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {success}</span>
          </div>
        )}

        {/* Display Sites */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">All Sites</h2>
          {sites.length > 0 ? (
            <ul className="space-y-2">
              {sites.map((site) => (
                <li key={site._id} className="bg-gray-50 p-4 rounded shadow">
                  <h3 className="font-semibold">{site.name}</h3>
                  <p>{site.description}</p>
                  <p>Location: {site.location}</p>
                  <p>Opening Hours: {site.openingHours}</p>
                  <p>Ticket Prices: {site.ticketPrices}</p>
                  <button 
                    onClick={() => handleEdit(site)}
                    className="mt-2 px-3 py-1 bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No sites available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
