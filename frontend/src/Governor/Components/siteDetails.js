import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from './sidebar/Sidebar';
import NavbarGovernor from './navbar/Navbar';

const SiteDetails = () => {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchSiteDetails = async () => {
      try {
        const response = await fetch(`/api/Governor/getSite/${id}`);
        const data = await response.json();
        console.log(id);
        console.log(data);
        setSite(data);
      } catch (error) {
        console.error('Error fetching site details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSiteDetails();
  }, [id]);

  if (loading) return <div className="text-center text-primary mt-8">Loading...</div>;
  if (!site) return <div className="text-center text-red-500 mt-8">Site not found</div>;

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

  return (
    // <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
     <div
    style={{
      backgroundColor: "#fff",
      minHeight: "100vh", // Ensures it covers the full viewport
      width: "102%", // Full width of the viewport
      margin: 0, // Remove default margins
      padding: 0, // Remove default padding
      display: "flex", // Optional: for flexible alignment
      flexDirection: "column",
    }}
  >
    <div className="listAdminProduct">
      <Sidebar />
      <div className="listContainerAdminProduct">
        <NavbarGovernor />
      
      <div className="max-w-4xl mx-auto bg-cardBackground shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary px-6 py-4">
          <h2 className="text-3xl font-bold text-white mt-2">Site Details</h2>
        </div>
        <div className="p-6">
          <h1 className="text-secondary text-4xl font-bold mb-4">{site.name}</h1>
          <p className="text-grayText text-lg mb-6">{site.description}</p>
          <img
            src={site.pictures[0]}
            alt={site.name}
            className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
          />
          <div className="text-grayText text-lg space-y-2">
            <p>
              <span className="font-semibold text-secondary">Location:</span> {site.location}
            </p>
            <p>
              <span className="font-semibold text-secondary">Opening Hours:</span> {site.openingHours}
            </p>
            <p>
              <span className="font-semibold text-secondary">Ticket Prices:</span> ${site.ticketPrices}
            </p>
          </div>

          <div className="mt-6 flex gap-4">
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
        </div>
      </div>
    </div>
    </div>
    </div>
   // </div>
  );
};

export default SiteDetails;
