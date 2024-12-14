import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

interface PhotoUploadProps {
  itineraryId: string;
  currentPhoto: string;
  onPhotoUpdate: (newPhotoUrl: string) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ itineraryId, currentPhoto, onPhotoUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrorMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);
    const formData = new FormData();
    formData.append('picture', selectedFile);

    try {
      console.log('Uploading photo for itinerary:', itineraryId);
      const response = await axios.put(`/api/Itinerary/uploadPicture/${itineraryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Server response:', response.data);

      if (response.data && response.data.itinerary && response.data.itinerary.picture) {
        onPhotoUpdate(response.data.itinerary.picture);
        alert('Photo uploaded successfully!');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Upload failed: ${error.response?.data?.message || error.message}`);
      } else {
        setErrorMessage('An unexpected error occurred while uploading the photo');
      }
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg">
          <FaUpload className="inline mr-2" />
          Select Photo
          <input type="file" className="hidden" onChange={handleFileSelect} accept="image/*" />
        </label>
        {selectedFile && (
          <>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              <FaCheck className="inline mr-2" />
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
                setErrorMessage(null);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              <FaTimes className="inline mr-2" />
              Cancel
            </button>
          </>
        )}
      </div>
      {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;

