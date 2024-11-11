import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SellerSignupConfirm = () => {
    const [idProof, setIdProof] = useState(null);
    const [taxationRegistryCard, setTaxationRegistryCard] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.name === "idProof") {
            setIdProof(e.target.files[0]);
        } else if (e.target.name === "taxationRegistryCard") {
            setTaxationRegistryCard(e.target.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("idProof", idProof);
        formData.append("taxationRegistryCard", taxationRegistryCard);

        const response = await fetch(`/api/upload/seller/${id}`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Documents uploaded. Please wait for approval.");
            navigate('/');
        } else {
            alert("Failed to upload documents.");
        }
    };

    return (
        <form onSubmit={handleUpload}>
            <h3>Upload Required Documents</h3>
            <label>ID Proof:
                <input type="file" name="idProof" onChange={handleFileChange} />
            </label>
            <label>Taxation Registry Card:
                <input type="file" name="taxationRegistryCard" onChange={handleFileChange} />
            </label>
            <button type="submit">Upload Documents</button>
        </form>
    );
};

export default SellerSignupConfirm;