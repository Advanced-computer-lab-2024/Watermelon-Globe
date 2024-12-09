

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   FaUser, FaEnvelope, FaFileAlt, FaIdCard, FaFileInvoiceDollar,
//   FaEdit, FaCheck, FaTimes, FaTrash, FaKey, FaShoppingBasket
// } from 'react-icons/fa';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import ChangePasswordAdvertiser from './ChangePasswordAdvertiser';
// // import SellerLogo from './SellerLogo';
// import AdvertiserLogo from './AdvertiserLogo';

// interface Seller {
//   _id: string;
//   Name: string;
//   Email: string;
//   Description: string;
//   idProof: string;
//   taxationRegistryCard: string;
//   status: 'pending' | 'accepted' | 'rejected';
//   termsAndConditions: boolean;
//   deletionRequest: 'Pending' | 'Accepted' | 'Rejected' | null;
//   Logo: string;
//   Products: string[];
//   notifications: string[];
//   createdAt: string;
// }

// interface FormData {
//   Name: string;
//   Email: string;
//   Description: string;
// }
// const ViewProfile = ()=> {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [seller, setSeller] = useState<Seller | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updateLogo,setUpdateLogo]=useState(false);
//   const[sellerLogo,setSellerLogo]=useState("");
//   const [formData, setFormData] = useState<FormData>({
//     Name: '',
//     Email: '',
//     Description: '',
//   });

//   useEffect(() => {
//     const fetchSeller = async () => {
//       try {
//         const response = await fetch(`/api/Seller/getSeller/${id}`);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setSeller(data);
//         if (data.Logo) {
//           setSellerLogo(`/uploads/${data.Logo}`);
//         }
        
//         setFormData({
//           Name: data.Name,
//           Email: data.Email,
//           Description: data.Description || '',
//         });
//       } catch (error) {
//         console.error('Error fetching seller details:', error);
//         alert('Failed to fetch seller details. Please try again.');
//       }
//     };

//     fetchSeller();
//   }, [id]);



//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = () => {
//     setIsEditing(true);
//   };

//   const handleConfirm = async () => {
//     setIsEditing(false);
//     try {
//       await axios.put(`/api/Seller/updateSeller/${id}`, formData);
//       alert('Seller details updated successfully!');
//       const response = await fetch(`/api/Seller/getSeller/${id}`);
//       const updatedData = await response.json();
//       setSeller(updatedData);
//     } catch (error) {
//       console.error('Error updating seller details:', error);
//       alert('Failed to update seller details. Please try again.');
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     if (seller) {
//       setFormData({
//         Name: seller.Name,
//         Email: seller.Email,
//         Description: seller.Description || '',
//       });
//     }
//   };

//   const handleUpdateLogo = () => {
//     setUpdateLogo(true);
//   };


//   const handleDeleteAccount = async () => {
//     const confirmed = window.confirm(
//       'Are you sure you want to delete your account? This action is irreversible.'
//     );
//     if (confirmed) {
//       try {
//         const response = await fetch(
//           `/api/Seller/requestDeletionSeller/${id}`,
//           {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (response.ok) {
//           alert('Request to delete account sent successfully.');
//          // navigate('/');
//         } else {
//           alert('Failed to send deletion request. Please try again.');
//         }
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         alert('An error occurred while trying to delete the account.');
//       }
//     }
//   };

//   if (!seller) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#f4eaef76]">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#91c297]"></div>
//       </div>
//     );
//   }

//   return (
//     <div
//         style={{
//           backgroundColor: "#fff",
//           minHeight: "100vh", // Ensures it covers the full viewport
//           width: "102%", // Full width of the viewport
//           margin: 0, // Remove default margins
//           padding: 0, // Remove default padding
//           display: "flex", // Optional: for flexible alignment
//           flexDirection: "column",
//         }}
//       >
//         <div className="listAdminProduct">
//           <Sidebar />
//           <div className="listContainerAdminProduct">
//             <Navbar />
//             <div style={{ padding: "20px" }}>
//         <div className="flex-1 max-w-4xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="bg-[#91c297] p-5 relative">
//               <div className="absolute top-4 right-4">
//                 <button
//                   onClick={handleUpdate}
//                   className="flex items-center px-3 py-1 bg-white text-[#91c297] hover:bg-[#f9e2eb]/90 rounded shadow"
//                 >
//                   <FaEdit className="mr-1" size="1em" />
//                   Edit
//                 </button>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="bg-white rounded-full p-2">
//                 <div className="bg-white rounded-full p-2">
//                 <div className="h-16 w-16 text-[#91c297]">
//         {sellerLogo ? (
//           <img  className="h-16 w-16 text-[#91c297]" src={sellerLogo} alt="Logo Preview"  />
//         ) : (
//                    <FaUser className="h-16 w-16 text-[#91c297]" /> 
//         )}
//       </div>                </div>
//                 </div>
                
//                 <div>
//   <div className="text-3xl font-bold text-white">
//     {isEditing ? (
//       <input
//         type="text"
//         name="Name"
//         value={formData.Name}
//         onChange={handleInputChange}
//         className="w-full text-3xl font-bold text-black p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
//       />
//     ) : (
//       <h2
//         className="text-3xl font-bold text-white cursor-pointer"
//         onClick={() => setIsEditing(true)}
//       >
//         {seller.Name}
//       </h2>
//     )}
//   </div>
//   <p className="text-white opacity-75">
//     Member since {new Date(seller.createdAt).toLocaleDateString()}
//   </p>
// </div>

//               </div>
//             </div>
//             <div className="p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="flex items-center text-[#e89bb5] mb-2">
//                     <FaEnvelope className="mr-2 text-[#91c297]" size="1em" />
//                     Email:
//                   </label>
//                   {isEditing ? (
//                     <input
//                       type="email"
//                       name="Email"
//                       value={formData.Email}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
//                     />
//                   ) : (
//                     <p className="text-gray-700">{seller.Email}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="flex items-center text-[#e89bb5] mb-2">
//                     <FaFileAlt className="mr-2 text-[#91c297]" size="1em" />
//                     Description:
//                   </label>
//                   {isEditing ? (
//                     <textarea
//                       name="Description"
//                       value={formData.Description}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
//                       rows={3}
//                     />
//                   ) : (
//                     <p className="text-gray-700">{seller.Description || 'No description provided'}</p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="flex items-center text-[#e89bb5] mb-2">
//                     <FaIdCard className="mr-2 text-[#91c297]" size="1em" />
//                     ID Proof:
//                   </label>
//                   <p className="text-gray-700">{seller.idProof || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <label className="flex items-center text-[#e89bb5] mb-2">
//                     <FaFileInvoiceDollar className="mr-2 text-[#91c297]" size="1em" />
//                     Taxation Registry Card:
//                   </label>
//                   <p className="text-gray-700">{seller.taxationRegistryCard || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <label className="flex items-center text-[#e89bb5] mb-2">
//                     Status:
//                   </label>
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     seller.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                     seller.status === 'rejected' ? 'bg-red-100 text-red-800' :
//                     'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
//                   </span>
//                 </div>
//                 <div>
//                   <label className="flex items-center text-[#e89bb5] mb-2">
//                     <FaShoppingBasket className="mr-2 text-[#91c297]" size="1em" />
//                     Products:
//                   </label>
//                   <p className="text-gray-700">{seller.Products.length} products</p>
//                 </div>
//               </div>
//               <div className="border-t border-gray-200 my-6"></div>

//               {isEditing ? (
//                 <div className="flex justify-end items-center">
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={handleConfirm}
//                       className="flex items-center px-4 py-2 bg-[#91c297] hover:bg-[#7ab481] text-white rounded"
//                     >
//                       <FaCheck className="mr-2" size="1em" />
//                       Confirm
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded"
//                     >
//                       <FaTimes className="mr-2" size="1em" />
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="flex justify-between items-center">
//                     <div className="flex space-x-4">
//                       <button
//                         onClick={handleUpdateLogo}
//                         className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded whitespace-nowrap"
//                       >
//                         <FaUser className="mr-2" size="1em" />
//                         Update Logo
//                       </button>
//                       <button
//                         onClick={() => setShowPasswordModal(true)}
//                         className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded whitespace-nowrap"
//                       >
//                         <FaKey className="mr-2" size="1em" />
//                         Change Password
//                       </button>
//                     </div>
//                     <button
//                       onClick={handleDeleteAccount}
//                       className="flex items-center px-4 py-2 bg-[#e89bb5] hover:bg-[#d787a1] text-white rounded whitespace-nowrap"
//                     >
//                       <FaTrash className="mr-2" size="1em" />
//                       Request Account Deletion
//                     </button>
//                   </div>
//                 </>
//               )}
//               {
//         updateLogo && (
//           <SellerLogo 
//           id={id}
//           onClose={() => setUpdateLogo(false)}
//           />
//         )
//       }
//             </div>
            
//           </div>
//         </div>
       
//       </div>
      
//       </div>
     
//       </div>
     
//       {showPasswordModal && (
//         <ChangePasswordSeller
//          id={id}
//          onClose={() => setShowPasswordModal(false)}
//         />
//       )}
     
//     </div>
//   );
// }
// export default ViewProfile;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaUser, FaEnvelope, FaFileAlt, FaIdCard, FaFileInvoiceDollar,
  FaEdit, FaCheck, FaTimes, FaTrash, FaKey, FaLink, FaPhone
} from 'react-icons/fa';
import Navbar from './AdvertiserNavbar';
import Sidebar from './sidebar/Sidebar';
import ChangePasswordAdvertiser from './ChangePasswordAdvertiser';
import AdvertiserLogo from './AdvertiserLogo';

interface Advertiser {
  _id: string;
  Name: string;
  Username: string;
  Email: string;
  About: string;
  Hotline: string;
  Link: string;
  idProof: string;
  taxationRegistryCard: string;
  status: 'pending' | 'accepted' | 'rejected';
  termsAndConditions: boolean;
  deletionRequest: 'Pending' | 'Accepted' | 'Rejected';
  Logo: string;
  notifications: string[];
  createdAt: string;
}

interface FormData {
  Name: string;
  Username: string;
  Email: string;
  About: string;
  Hotline: string;
  Link: string;
}

const AdvertiserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLogo, setUpdateLogo] = useState(false);
  const [advertiserLogo, setAdvertiserLogo] = useState("");
  const [formData, setFormData] = useState<FormData>({
    Name: '',
    Username: '',
    Email: '',
    About: '',
    Hotline: '',
    Link: '',
  });

  useEffect(() => {
    const fetchAdvertiser = async () => {
      try {
        const response = await fetch(`/api/advertiser/getCompanyProfileById/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setAdvertiser(data);
        if (data.Logo) {
          setAdvertiserLogo(`/uploads/${data.Logo}`);
        }
        
        setFormData({
          Name: data.Name,
          Username: data.Username,
          Email: data.Email,
          About: data.About || '',
          Hotline: data.Hotline || '',
          Link: data.Link || '',
        });
      } catch (error) {
        console.error('Error fetching advertiser details:', error);
        alert('Failed to fetch advertiser details. Please try again.');
      }
    };

    fetchAdvertiser();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      await axios.put(`/api/advertiser/updateProfile/${id}`, formData);
      alert('Advertiser details updated successfully!');
      const response = await fetch(`/api/advertiser/getCompanyProfileById/${id}`);
      const updatedData = await response.json();
      setAdvertiser(updatedData);
    } catch (error) {
      console.error('Error updating advertiser details:', error);
      alert('Failed to update advertiser details. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (advertiser) {
      setFormData({
        Name: advertiser.Name,
        Username: advertiser.Username,
        Email: advertiser.Email,
        About: advertiser.About || '',
        Hotline: advertiser.Hotline || '',
        Link: advertiser.Link || '',
      });
    }
  };

  const handleUpdateLogo = () => {
    setUpdateLogo(true);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `/api/advertiser/requestDeletionAdvertiser/${id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          alert('Request to delete account sent successfully.');
          navigate('/');
        } else {
          alert('Failed to send deletion request. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while trying to delete the account.');
      }
    }
  };

  if (!advertiser) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f4eaef76]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#91c297]"></div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        width: "102%",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="listAdminProduct">
        <Sidebar />
        <div className="listContainerAdminProduct">
          <Navbar/>
          <div style={{ padding: "20px" }}>
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#91c297] p-5 relative">
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={handleUpdate}
                      className="flex items-center px-3 py-1 bg-white text-[#91c297] hover:bg-[#f9e2eb]/90 rounded shadow"
                    >
                      <FaEdit className="mr-1" size="1em" />
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* <div className="bg-white rounded-full p-2">
                      <div className="h-16 w-16 text-[#91c297]">
                        {advertiserLogo ? (
                          <img className=" text-[#91c297]" src={advertiserLogo} alt="Logo Preview" />
                        ) : (
                          <FaUser className=" text-[#91c297]" />
                        )}
                      </div>
                    </div> */}
                    <div className="bg-white rounded-full p-2">
  <div className="h-16 w-16">
    {advertiserLogo ? (
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={advertiserLogo}
        alt="Logo Preview"
      />
    ) : (
      <FaUser className="h-16 w-16 text-[#91c297]" />
    )}
  </div>
</div>

                    <div>
                      <div className="text-3xl font-bold text-white">
                        {isEditing ? (
                          <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleInputChange}
                            className="w-full text-3xl font-bold text-black p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                          />
                        ) : (
                          <h2
                            className="text-3xl font-bold text-white cursor-pointer"
                            onClick={() => setIsEditing(true)}
                          >
                            {advertiser.Name}
                          </h2>
                        )}
                      </div>
                      <p className="text-white opacity-75">
                        Member since {new Date(advertiser.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaUser className="mr-2 text-[#91c297]" size="1em" />
                        Username:
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="Username"
                          value={formData.Username}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                        />
                      ) : (
                        <p className="text-gray-700">{advertiser.Username}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaEnvelope className="mr-2 text-[#91c297]" size="1em" />
                        Email:
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                        />
                      ) : (
                        <p className="text-gray-700">{advertiser.Email}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaFileAlt className="mr-2 text-[#91c297]" size="1em" />
                        About:
                      </label>
                      {isEditing ? (
                        <textarea
                          name="About"
                          value={formData.About}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-700">{advertiser.About || 'No description provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaPhone className="mr-2 text-[#91c297]" size="1em" />
                        Hotline:
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="Hotline"
                          value={formData.Hotline}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                        />
                      ) : (
                        <p className="text-gray-700">{advertiser.Hotline || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaLink className="mr-2 text-[#91c297]" size="1em" />
                        Website Link:
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="Link"
                          value={formData.Link}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-[#91c297] rounded focus:ring-2 focus:ring-[#91c297]"
                        />
                      ) : (
                        <p className="text-gray-700">{advertiser.Link || 'Not provided'}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaIdCard className="mr-2 text-[#91c297]" size="1em" />
                        ID Proof:
                      </label>
                      <p className="text-gray-700">{advertiser.idProof || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        <FaFileInvoiceDollar className="mr-2 text-[#91c297]" size="1em" />
                        Taxation Registry Card:
                      </label>
                      <p className="text-gray-700">{advertiser.taxationRegistryCard || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="flex items-center text-[#e89bb5] mb-2">
                        Status:
                      </label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        advertiser.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        advertiser.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {advertiser.status.charAt(0).toUpperCase() + advertiser.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 my-6"></div>

                  {isEditing ? (
                    <div className="flex justify-end items-center">
                      <div className="flex space-x-4">
                        <button
                          onClick={handleConfirm}
                          className="flex items-center px-4 py-2 bg-[#91c297] hover:bg-[#7ab481] text-white rounded"
                        >
                          <FaCheck className="mr-2" size="1em" />
                          Confirm
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded"
                        >
                          <FaTimes className="mr-2" size="1em" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <button
                            onClick={handleUpdateLogo}
                            className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded whitespace-nowrap"
                          >
                            <FaUser className="mr-2" size="1em" />
                            Update Logo
                          </button>
                          <button
                            onClick={() => setShowPasswordModal(true)}
                            className="flex items-center px-4 py-2 border border-[#91c297] text-[#91c297] hover:bg-[#91c297]/10 rounded whitespace-nowrap"
                          >
                            <FaKey className="mr-2" size="1em" />
                            Change Password
                          </button>
                        </div>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex items-center px-4 py-2 bg-[#e89bb5] hover:bg-[#d787a1] text-white rounded whitespace-nowrap"
                        >
                          <FaTrash className="mr-2" size="1em" />
                          Request Account Deletion
                        </button>
                      </div>
                      {updateLogo && (
                      <AdvertiserLogo 
                         id={id}
                         onClose={() => setUpdateLogo(false)}
                      />
                    )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPasswordModal && (
        <ChangePasswordAdvertiser         
         id={id}
           onClose={() => setShowPasswordModal(false)}
        />
      )}
     
    </div>
  );
};

export default AdvertiserProfile;

