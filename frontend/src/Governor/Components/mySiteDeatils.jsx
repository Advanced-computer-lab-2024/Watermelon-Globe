import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './sidebar/Sidebar';
import NavbarGovernor from './navbar/Navbar';

const SiteDetails = () => {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSite, setEditedSite] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const response = await fetch(`/api/Governor/getSite/${id}`);
        const data = await response.json();
        setSite(data);
        setEditedSite(data);
      } catch (error) {
        console.error('Error fetching site details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSiteDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedSite(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSite = async () => {
    try {
      const response = await fetch(`/api/Governor/updateSite?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSite),
      });
      if (response.ok) {
        const updatedSite = await response.json();
        setSite(updatedSite);
        setIsEditing(false);
      } else {
        console.error('Failed to update site');
      }
    } catch (error) {
      console.error('Error updating site:', error);
    }
  };

  const handleShareLink = () => {
    const siteUrl = `${window.location.origin}/siteDetails/${id}`;
    navigator.clipboard
      .writeText(siteUrl)
      .then(() => alert('Site link copied to clipboard!'))
      .catch(err => alert('Failed to copy link: ' + err));
  };

  const handleShareEmail = () => {
    const siteUrl = `${window.location.origin}/siteDetails/${id}`;
    const subject = encodeURIComponent('Check out this site!');
    const body = encodeURIComponent(`I thought you might be interested in visiting this site: ${siteUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (loading) return <div className="text-center text-primary mt-8">Loading...</div>;
  if (!site) return <div className="text-center text-red-500 mt-8">Site not found</div>;

  return (
    <div style={{
      backgroundColor: "#fff",
      minHeight: "100vh",
      width: "102%",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
    }}>
      <div className="listAdminProduct">
        <Sidebar />
        <div className="listContainerAdminProduct">
          <NavbarGovernor />
          <div style={{marginTop:20, marginRight:20}} className="bg-cardBackground shadow-lg rounded-lg">
            <div className="bg-primary px-6 py-4">
              <h2 className="text-3xl font-bold text-white mt-2">Site Details</h2>
            </div>
            <div className="p-6">
              {!isEditing ? (
                <>
                  <h1 className="text-secondary text-4xl font-bold mb-4">{site.name}</h1>
                  <p className="text-grayText text-lg mb-6">{site.description}</p>
                  <img
                    src={site.pictures[0]}
                    alt={site.name}
                    style={{height:60}}
                    className="w-full object-cover rounded-lg shadow-lg mb-6"
                  />
                  <div className="text-grayText text-lg space-y-2">
                    <p><span className="font-semibold text-secondary">Location:</span> {site.location}</p>
                    <p><span className="font-semibold text-secondary">Opening Hours:</span> {site.openingHours}</p>
                    <p><span className="font-semibold text-secondary">Ticket Prices:</span> ${site.ticketPrices}</p>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-hover transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleShareLink}
                      className="bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-hover transition duration-200"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={handleShareEmail}
                      className="bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-hover transition duration-200"
                    >
                      Share via Email
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedSite.name}
                    onChange={handleInputChange}
                    className="text-secondary text-4xl font-bold mb-4 w-full"
                  />
                  <textarea
                    name="description"
                    value={editedSite.description}
                    onChange={handleInputChange}
                    className="text-grayText text-lg mb-6 w-full"
                  />
                  <input
                    type="text"
                    name="location"
                    value={editedSite.location}
                    onChange={handleInputChange}
                    className="text-grayText text-lg mb-2 w-full"
                    placeholder="Location"
                  />
                  <input
                    type="text"
                    name="openingHours"
                    value={editedSite.openingHours}
                    onChange={handleInputChange}
                    className="text-grayText text-lg mb-2 w-full"
                    placeholder="Opening Hours"
                  />
                  <input
                    type="number"
                    name="ticketPrices"
                    value={editedSite.ticketPrices}
                    onChange={handleInputChange}
                    className="text-grayText text-lg mb-2 w-full"
                    placeholder="Ticket Prices"
                  />
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleUpdateSite}
                      className="bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-hover transition duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteDetails;