import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Flag, Calendar, Briefcase, DollarSign, Edit2, Check, X, Gift, Bookmark } from 'lucide-react';
import ChangePasswordTourist from '../Components/changePasswordTourist'

export default function TouristDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [tourist, setTourist] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showRedeemModal, setShowRedeemModal] = useState(false);
    const [pointsToRedeem, setPointsToRedeem] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        mobileNumber: '',
        nationality: '',
        status: '',
    });

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
                console.error('Error fetching tourist details:', error);
                alert('Failed to fetch tourist details. Please try again.');
            }
        };

        fetchTourist();
    }, [id]);

    const handleInputChange = (e) => {
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
            alert('Tourist details updated successfully!');
            const response = await fetch(`/api/Tourist/getTourist/${id}`);
            const updatedData = await response.json();
            setTourist(updatedData);
        } catch (error) {
            console.error('Error updating tourist details:', error);
            alert('Failed to update tourist details. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            email: tourist.email,
            mobileNumber: tourist.mobileNumber,
            nationality: tourist.nationality,
            status: tourist.status,
        });
    };

    const handleRedeemPoints = async () => {
        try {
            const response = await axios.put(`/api/Tourist/redeemPoints/${id}`, { pointsToRedeem: Number(pointsToRedeem) });
            alert(response.data.message);
            const updatedData = await fetch(`/api/Tourist/getTourist/${id}`);
            const newTouristData = await updatedData.json();
            setTourist(newTouristData);
            setShowRedeemModal(false);
            setPointsToRedeem('');
        } catch (error) {
            console.error('Error redeeming points:', error);
            alert(error.response?.data?.error || 'Failed to redeem points. Please try again.');
        }
    };

    const handleViewFlightHotelBookings = () => {
        navigate(`/MyHotelFlightBookings/${id}`);
    };

    const handleViewBookings = () => {
        navigate(`/MyBookings/${id}`);
    };

    const handleViewBookmarks = () => {
        navigate(`/TouristBookmarks/${id}`);
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action is irreversible.');
        if (confirmed) {
            try {
                const response = await fetch(`/api/Tourist/requestDeletionTourist/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Your account has been successfully deleted.');
                    navigate('/');
                } else {
                    alert('Failed to delete account. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('An error occurred while trying to delete the account.');
            }
        }
    };

    const renderBadgeIcon = () => {
        switch (tourist.badge) {
          case 'Gold':
            return <span role="img" aria-label="Gold Medal">🥇</span>;
          case 'Silver':
            return <span role="img" aria-label="Silver Medal">🥈</span>;
          case 'Bronze':
            return <span role="img" aria-label="Bronze Medal">🥉</span>;
          default:
            return <span>No badge</span>;
        }
    };

    if (!tourist) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FFE4E1' }}>
                <div style={{ animation: 'spin 1s linear infinite', border: '4px solid #4CAF50', borderTop: '4px solid transparent', borderRadius: '50%', width: '50px', height: '50px' }}></div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#FFE4E1', padding: '2rem' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4CAF50' }}>Watermelon Globe</h1>
                    <p style={{ fontSize: '1.25rem', color: '#4CAF50' }}>Your Travel Companion</p>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ flexBasis: '30%', backgroundColor: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User style={{ width: '80%', height: '80%', color: 'white' }} />
                    </div>
                    <div style={{ flexBasis: '70%', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Tourist Profile</h2>
                        <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{tourist.username}</h3>
                        <p style={{ color: '#666', marginBottom: '1rem' }}>Member since {new Date(tourist.createdAt).toLocaleDateString()}</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <Mail style={{ marginRight: '0.5rem' }} size={16} />
                                    Email:
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                ) : (
                                    <p>{tourist.email}</p>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <Phone style={{ marginRight: '0.5rem' }} size={16} />
                                    Mobile Number:
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                ) : (
                                    <p>{tourist.mobileNumber}</p>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <Flag style={{ marginRight: '0.5rem' }} size={16} />
                                    Nationality:
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="nationality"
                                        value={formData.nationality}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                ) : (
                                    <p>{tourist.nationality}</p>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <Calendar style={{ marginRight: '0.5rem' }} size={16} />
                                    Date of Birth:
                                </label>
                                <p>{new Date(tourist.dob).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <Briefcase style={{ marginRight: '0.5rem' }} size={16} />
                                    Status:
                                </label>
                                {isEditing ? (
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    >
                                        <option value="student">Student</option>
                                        <option value="job">Job</option>
                                    </select>
                                ) : (
                                    <p>{tourist.status}</p>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <DollarSign style={{ marginRight: '0.5rem' }} size={16} />
                                    Wallet Balance:
                                </label>
                                <p>${tourist.wallet.toFixed(2)}</p>
                            </div>
                            <div>
                                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#4CAF50' }}>
                                    <Gift style={{ marginRight: '0.5rem' }} size={16} />
                                    Points:
                                </label>
                                <p>{tourist.loyaltyPoints}</p>
                            </div>
                            <div className="badge-display">
                                <h3>Your Badge:</h3>
                                <div className="badge-icon">{renderBadgeIcon()}</div>
                                <p>{tourist.badge}</p>
                            </div>
                        </div>
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleConfirm}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            marginRight: '1rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Check style={{ marginRight: '0.5rem' }} size={18} />
                                        Confirm
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#f44336',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <X style={{ marginRight: '0.5rem' }} size={18} />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleUpdate}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            marginRight: '1rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Edit2 style={{ marginRight: '0.5rem' }} size={18} />
                                        Update
                                    </button>
                                    <button
                                        onClick={() => setShowRedeemModal(true)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Gift style={{ marginRight: '0.5rem' }} size={18} />
                                        Redeem Points
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <button
                    onClick={handleViewFlightHotelBookings}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                >
                    View My Hotel/Flight
                </button>

                <button
                    onClick={handleViewBookings}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                >
                    View My Itineraries/activities
                </button>

                <button
                    onClick={handleViewBookmarks}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                    <Bookmark size={18} className="inline-block mr-2" />
                    View Bookmarks
                </button>

                <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 mb-4 text-white rounded-md transition duration-200"
                    style={{ backgroundColor: 'rgb(220, 38, 38)', hover: { backgroundColor: 'rgb(185, 28, 28)' } }}
                >
                    Delete Account
                </button>

                <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Change Password
                </button>
            </div>
            {showRedeemModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '2rem',
                        borderRadius: '10px',
                        width: '300px'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Redeem Points</h3>
                        <input
                            type="number"
                            value={pointsToRedeem}
                            onChange={(e) => setPointsToRedeem(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                marginBottom: '1rem'
                            }}
                            placeholder="Enter points to redeem"
                            step="10000"
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setShowRedeemModal(false)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#ccc',
                                    border: 'none',
                                    borderRadius: '4px',
                                    marginRight: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleRedeemPoints}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPasswordModal && <ChangePasswordTourist id={id} onClose={() => setShowPasswordModal(false)} />}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}