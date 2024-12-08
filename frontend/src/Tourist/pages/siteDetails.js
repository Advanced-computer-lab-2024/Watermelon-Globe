import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TouristNavbar from "../Components/TouristNavBar";
import { useCurrency } from "../Components/CurrencyContext";

const SiteDetails = () => {
  const { id, touristId } = useParams();
  const [site, setSite] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { selectedCurrency, currencies } = useCurrency();
  const [priceInSelectedCurrency, setPriceInSelectedCurrency] = useState(null);

  const fetchSiteDetails = async () => {
    try {
      const response = await fetch(`/api/Governor/getSite/${id}`);
      const data = await response.json();
      console.log(data);
      setSite(data);
    } catch (error) {
      console.error('Error fetching site details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteDetails();
  }, [id]);

  useEffect(() => {
    if (site && selectedCurrency) {
      const conversionRate = getCurrencyConversionRate(selectedCurrency);
      const convertedPrice = (site.ticketPrices * conversionRate).toFixed(2);
      // Fallback to the original price if the conversion results in NaN or an invalid value
      setPriceInSelectedCurrency(isNaN(convertedPrice) ? site.ticketPrices : convertedPrice);
    }
  }, [site, selectedCurrency]);

  if (loading) return <div className="text-center text-primary mt-8">Loading...</div>;
  if (!site) return <div className="text-center text-red-500 mt-8">Site not found</div>;

  function getCurrencyConversionRate(currency) {
    const rates = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.0,
      BGN: 1.96,
      CZK: 21.5,
      AUD: 1.34,
      BRL: 5.0,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.45,
      DKK: 6.36,
      EGP: 50.04,
      HKD: 7.8,
      HRK: 6.63,
      HUF: 310.0,
      IDR: 14400,
      ILS: 3.2,
      INR: 74.0,
      ISK: 129.0,
      KRW: 1180.0,
      MXN: 20.0,
      MYR: 4.2,
      NOK: 8.6,
      NZD: 1.4,
      PHP: 50.0,
      PLN: 3.9,
      RON: 4.1,
      RUB: 74.0,
      SEK: 8.8,
      SGD: 1.35,
      THB: 33.0,
      TRY: 8.8,
      ZAR: 14.0,
    };
    return rates[currency] || 1; // Default to 1 if currency not found
  }

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

  const currencySymbol = selectedCurrency ? currencies[selectedCurrency]?.symbol_native : "$";

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={touristId} />
      <div className="max-w-4xl mx-auto mt-8 bg-cardBackground shadow-lg rounded-lg overflow-hidden">
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
              <span className="font-semibold text-secondary">Ticket Prices:</span>
              {currencySymbol}{isNaN(priceInSelectedCurrency)? site.ticketPrices: priceInSelectedCurrency}
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
  );
};

export default SiteDetails;
