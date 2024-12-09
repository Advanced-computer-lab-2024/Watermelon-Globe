import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TourguideSignupConfirm = () => {
    const [idProof, setIdProof] = useState(null);
    const [certificates, setCertificates] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.name === "idProof") {
            setIdProof(e.target.files[0]);
        } else if (e.target.name === "certificates") {
            setCertificates(Array.from(e.target.files));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("idProof", idProof);
        certificates.forEach((file, index) => {
            formData.append("certificates", file);
        });

        const response = await fetch(`/api/upload/tourguide/${id}`, {
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
            <label>Certificates (up to 5):
                <input type="file" name="certificates" multiple onChange={handleFileChange} />
            </label>
            <button type="submit">Upload Documents</button>
        </form>
    );
}

export default TourguideSignupConfirm;