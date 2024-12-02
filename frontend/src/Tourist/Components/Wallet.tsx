import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWallet } from 'react-icons/fa';
import GoldMedal from '../../images/GoldMedal.jpg';
import SilverMedal from '../../images/SilverMedal.png';
import BronzeMedal from '../../images/BronzeMedal.png';


type WalletComponentProps = {
  touristId: string | undefined;
};

const WalletComponent = ({ touristId }: WalletComponentProps) => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number | null>(null);
  const [loyaltyBadge, setLoyaltyBadge] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the tourist wallet details
  const fetchWallet = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/Tourist/getTourist/${touristId}`);
      setWalletAmount(response.data.wallet);
      setLoyaltyPoints(response.data.loyaltyPoints);
      setLoyaltyBadge(response.data.badge); 
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load wallet details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle wallet visibility
  const toggleWallet = () => {
    setIsWalletOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isWalletOpen) {
      fetchWallet(); // Fetch wallet details only when the wallet screen is open
    }
  }, [isWalletOpen]);

  return (
    <div>
      {/* Small Wallet Icon */}
      <div
        className="fixed bottom-5 right-5 p-4 bg-primary text-white rounded-full cursor-pointer shadow-lg transition transform hover:scale-110"
        onClick={toggleWallet}
        title="View Wallet"
      >
        <FaWallet className="text-2xl" />
      </div>

      {/* Enlarged Wallet Screen */}
      {isWalletOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={toggleWallet} // Close on click outside the wallet
        >
          <div
            className="bg-white p-6 rounded-lg w-96 shadow-lg transform transition-all"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the wallet
          >
            <div className="flex justify-center mb-4">
              <FaWallet className="text-4xl text-primary" />
            </div>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="text-center">
                <p className="text-xl font-semibold">Wallet Amount:</p>
                <p className="text-2xl font-bold text-primary">${walletAmount?.toFixed(2) || 0}</p>

                <div className="mt-6">
                  <p className="text-xl font-semibold">Loyalty Points:</p>
                  <p className="text-2xl font-bold text-primary">{loyaltyPoints?.toFixed(2) || 0}</p>
                </div>

                <div className="mt-6">
                  <p className="text-xl font-semibold">Loyalty Badge:</p>
                  {loyaltyBadge === 'Gold' && (
                    <img
                      src= {GoldMedal}
                      alt="Gold Medal"
                      className="w-20 h-20 mx-auto"
                    />
                  )}
                  {loyaltyBadge === 'Silver' && (
                    <img
                      src= {SilverMedal}
                      alt="Silver Medal"
                      className="w-20 h-20 mx-auto"
                    />
                  )}
                  {loyaltyBadge === 'Bronze' && (
                    <img
                      src= {BronzeMedal}
                      alt="Bronze Medal"
                      className="w-20 h-20 mx-auto"
                    />
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-hover transition"
                onClick={toggleWallet}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
