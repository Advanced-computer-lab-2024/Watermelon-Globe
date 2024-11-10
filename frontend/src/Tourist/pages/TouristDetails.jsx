import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Phone, Flag, Calendar, Briefcase, DollarSign, Edit2, Check, X } from 'lucide-react';

const TouristDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [tourist, setTourist] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
                                    <input
                                        type="text"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
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
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Edit2 style={{ marginRight: '0.5rem' }} size={18} />
                                    Update
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default TouristDetails;