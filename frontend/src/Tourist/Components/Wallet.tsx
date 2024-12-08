import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWallet } from 'react-icons/fa';
import GoldMedal from '../../images/GoldMedal.jpg';
import SilverMedal from '../../images/SilverMedal.png';
import BronzeMedal from '../../images/BronzeMedal.png';
import { useCurrency } from "./CurrencyContext";

type WalletComponentProps = {
  touristId: string | undefined;
  onClose: () => void;
};

const WalletComponent = ({ touristId, onClose }: WalletComponentProps) => {
  const [walletAmount, setWalletAmount] = useState<number | null>(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number | null>(null);
  const [loyaltyBadge, setLoyaltyBadge] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  interface Currency {
    symbol_native: string;
  }

  interface CurrencyContextType {
    selectedCurrency: string | null;
    currencies: { [key: string]: Currency }; // An object with currency codes as keys and Currency objects as values
  }

  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType; // Type assertion

  function getCurrencyConversionRate(currency: string): number {
    const rates: { [key: string]: number } = {
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


  useEffect(() => {
    fetchWallet();
  }, [touristId]);

  const priceInSelectedCurrency = walletAmount !== null
  ? selectedCurrency
    ? (walletAmount * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
    : walletAmount.toFixed(2)
  : '0.00';

const currencySymbol = selectedCurrency ? currencies[selectedCurrency]?.symbol_native : "$";


  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 shadow-lg transform transition-all"
        onClick={(e) => e.stopPropagation()}
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
            <p className="text-2xl font-bold text-primary">{currencySymbol}{priceInSelectedCurrency}</p>

            <div className="mt-6">
              <p className="text-xl font-semibold">Loyalty Points:</p>
              <p className="text-2xl font-bold text-primary">{loyaltyPoints?.toFixed(0) || 0}</p>
            </div>

            <div className="mt-6">
              <p className="text-xl font-semibold">Loyalty Badge:</p>
              {loyaltyBadge === 'Gold' && (
                <img
                  src={GoldMedal}
                  alt="Gold Medal"
                  className="w-20 h-20 mx-auto"
                />
              )}
              {loyaltyBadge === 'Silver' && (
                <img
                  src={SilverMedal}
                  alt="Silver Medal"
                  className="w-20 h-20 mx-auto"
                />
              )}
              {loyaltyBadge === 'Bronze' && (
                <img
                  src={BronzeMedal}
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
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;

