import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './siteDetails.css';

const SiteDetails = () => {
  const { id } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const response = await fetch(`/api/Governor/getSite/${id}`);
        const data = await response.json();
        setSite(data);
      } catch (error) {
        console.error('Error fetching site details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSiteDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!site) return <div>Site not found</div>;

  // Share functionality
  const handleShareLink = () => {
    const siteUrl = `${window.location.origin}/siteDetails/${id}`;
    navigator.clipboard.writeText(siteUrl)
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
    <div className="site-details">
      <h1>{site.name}</h1>
      <p>{site.description}</p>
      <img src={site.pictures[0]} alt={site.name} />
      <p>Location: {site.location}</p>
      <p>Opening Hours: {site.openingHours}</p>
      <p>Ticket Prices: ${site.ticketPrices}</p>

      {/* Share Buttons */}
      <div className="share-buttons">
        <button onClick={handleShareLink} className="share-button">Copy Link</button>
        <button onClick={handleShareEmail} className="share-button">Share via Email</button>
      </div>
    </div>
  );
};

export default SiteDetails;
