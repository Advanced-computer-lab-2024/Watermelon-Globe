"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser, FaEnvelope, FaPhone, FaFlag, FaCalendar, FaBriefcase, FaDollarSign,
  FaEdit, FaCheck, FaTimes, FaGift, FaTrash, FaPlane, FaCompass, FaKey, FaShoppingBasket
} from 'react-icons/fa'
import ChangePasswordTourist from '../Components/changePasswordTourist.js'
import TouristNavbar from "../Components/TouristNavBar";
import { Margin } from "@mui/icons-material";
import { useCurrency } from "../Components/CurrencyContext";

interface Currency {
  symbol_native: string;
  // Add other fields from the currency object as needed
}

interface CurrencyContextType {
  selectedCurrency: string | null;
  currencies: { [key: string]: Currency }; 
}

interface Tourist {
  id: string;
  username: string;
  email: string;
  mobileNumber: string;
  nationality: string;
  dob: string;
  status: string;
  wallet: number;
  loyaltyPoints: number;
  badge: string;
  createdAt: string;
}

interface FormData {
  email: string;
  mobileNumber: string;
  nationality: string;
  status: string;
}

export default function TouristDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [tourist, setTourist] = useState<Tourist | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    mobileNumber: "",
    nationality: "",
    status: "",
  });
  const { selectedCurrency, currencies } = useCurrency() as CurrencyContextType;

  useEffect(() => {
    const fetchTourist = async () => {
      try {
        console.log(`Fetching details for tourist ID: ${id}`);
        const response = await fetch(`/api/Tourist/getTourist/${id}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setTourist(data);
        setFormData({
          email: data.email,
          mobileNumber: data.mobileNumber,
          nationality: data.nationality,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching tourist details:", error);
        alert("Failed to fetch tourist details. Please try again.");
      }
    };

    fetchTourist();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    setIsEditing(false);
    try {
      await axios.put(`/api/Tourist/updateTourist/${id}`, formData);
      alert("Tourist details updated successfully!");
      const response = await fetch(`/api/Tourist/getTourist/${id}`);
      const updatedData = await response.json();
      setTourist(updatedData);
    } catch (error) {
      console.error("Error updating tourist details:", error);
      alert("Failed to update tourist details. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (tourist) {
      setFormData({
        email: tourist.email,
        mobileNumber: tourist.mobileNumber,
        nationality: tourist.nationality,
        status: tourist.status,
      });
    }
  };

  const handleRedeemPoints = async () => {
    try {
      const response = await axios.put(`/api/Tourist/redeemPoints/${id}`, {
        pointsToRedeem: Number(pointsToRedeem),
      });
      alert(response.data.message);
      const updatedData = await fetch(`/api/Tourist/getTourist/${id}`);
      const newTouristData = await updatedData.json();
      setTourist(newTouristData);
      setShowRedeemModal(false);
      setPointsToRedeem("");
    } catch (error) {
      console.error("Error redeeming points:", error);
      alert("Failed to redeem points. Please try again.");
    }
  };

  const handleViewFlightHotelBookings = () => {
    navigate(`/MyHotelFlightBookings/${id}`);
  };

  const handleViewBookings = () => {
    navigate(`/MyBookings/${id}`);
  };

  const handleViewProducts = () => {
    navigate(`/OrdersPage/${id}`);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `/api/Tourist/requestDeletionTourist/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alert("Request to delete account sent successfully.");
          navigate("/");
        } else {
          alert("Failed to send deletion request. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while trying to delete the account.");
      }
    }
  };

  const renderBadgeIcon = () => {
    if (!tourist) return "🏅";
    switch (tourist.badge) {
      case "Gold":
        return "🥇";
      case "Silver":
        return "🥈";
      case "Bronze":
        return "🥉";
      default:
        return "🏅";
    }
  };

  if (!tourist) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  

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
    return rates[currency] || 1; }
  
  
  
  
  const priceInSelectedCurrency = selectedCurrency
    ? (tourist.wallet * getCurrencyConversionRate(selectedCurrency)).toFixed(2)
    : tourist.wallet.toFixed(2);
  
  
  const currencySymbol = selectedCurrency ? currencies[selectedCurrency]?.symbol_native : "$";
  

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={id} />
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          <div className="bg-primary p-5 relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={handleUpdate}
                className="flex items-center px-3 py-1 bg-white text-primary hover:bg-darkPinkHover/90 rounded shadow"
              >
                <FaEdit className="mr-1" size="1em" />
                Edit
              </button>

            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaUser className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {tourist.username}
                </h2>
                <p className="text-white opacity-75">
                  Member since{" "}
                  {new Date(tourist.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaEnvelope className="mr-2 text-primary" size="1em" />
                  Email:
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-primary rounded focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-700">{tourist.email}</p>
                )}
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaPhone className="mr-2 text-primary" size="1em" />
                  Mobile Number:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-primary rounded focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-700">{tourist.mobileNumber}</p>
                )}
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaFlag className="mr-2 text-primary" size="1em" />
                  Nationality:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-primary rounded focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <p className="text-gray-700">{tourist.nationality}</p>
                )}
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaCalendar className="mr-2 text-primary" size="1em" />
                  Date of Birth:
                </label>
                <p className="text-gray-700">
                  {new Date(tourist.dob).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaBriefcase className="mr-2 text-primary" size="1em" />
                  Status:
                </label>
                {isEditing ? (
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-primary rounded focus:ring-2 focus:ring-primary"
                  >
                    <option value="student">Student</option>
                    <option value="job">Job</option>
                  </select>
                ) : (
                  <p className="text-gray-700 capitalize">{tourist.status}</p>
                )}
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaDollarSign className="mr-2 text-primary" size="1em" />
                  Wallet Balance:
                </label>
                <p className="text-gray-700">
                  {currencySymbol}{priceInSelectedCurrency}
                </p>
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  <FaGift className="mr-2 text-primary" size="1em" />
                  Loyalty Points:
                </label>
                <p className="text-gray-700">
                  {tourist.loyaltyPoints.toFixed(0)}
                </p>
              </div>
              <div>
                <label className="flex items-center text-secondary mb-2">
                  Badge:
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary">
                  {renderBadgeIcon()} {tourist.badge}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-6"></div>

            {isEditing ? (
              <div className="flex justify-end items-center" >
                <div className="flex space-x-4">
                  <div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleConfirm}
                        className="flex items-center px-4 py-2 mr-2 bg-secondary hover:bg-secondaryHover text-white rounded"
                      >
                        <FaCheck className="mr-2" size="1em" />
                        Confirm
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-4 py-2 text-primary hover:bg-primary/10 rounded"
                      >
                        <FaTimes className="mr-2" size="1em" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center" >
                  <div className="flex space-x-4">
                    <div className="flex justify-left">
                      <button
                        onClick={() => setShowRedeemModal(true)}
                        className="flex items-center px-4 py-2  text-primary hover:bg-primary/10 rounded whitespace-nowrap"
                      >
                        <FaGift className="mr-2" size="1em" />
                        Redeem Points
                      </button>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex items-center px-4 py-2  text-primary hover:bg-primary/10 rounded whitespace-nowrap"
                      >
                        <FaKey className="mr-2" size="1em" />
                        Change Password
                      </button>
                    </div>
                  </div>
                  <div
                    className="flex justify-end"
                  >
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center px-4 py-2 bg-darkPink hover:bg-darkPinkHover text-white rounded whitespace-nowrap"
                    >
                      <FaTrash className="mr-2" size="1em" />
                      Request Account Deletion
                    </button>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
      {
    showRedeemModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-xl font-bold mb-4">Redeem Points</h3>
          <input
            type="number"
            value={pointsToRedeem}
            onChange={(e) => setPointsToRedeem(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter points to redeem"
            step="10000"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowRedeemModal(false)}
              className="flex items-center px-4 py-2  text-primary hover:bg-primary/10 rounded"
            >
              <FaTimes className="mr-2" size="1em" />
              Cancel
            </button>
            <button
              onClick={handleRedeemPoints}
              className="flex items-center px-4 py-2 bg-secondary hover:bg-secondaryHover text-white rounded"
            >
              <FaCheck className="mr-2" size="1em" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  }
  {
    showPasswordModal && (
      <ChangePasswordTourist
        id={id}
        onClose={() => setShowPasswordModal(false)}
      />
    )
  }
    </div >
  );
}
