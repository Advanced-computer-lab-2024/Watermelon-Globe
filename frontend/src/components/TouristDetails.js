import React, { useState, useEffect } from "react";
// css at the end of video 9
const TouristDetails = ({ tourist }) => {
  return (
    <div className="tourist-details">
      <h4>{tourist.username}</h4>
      <p>
        <strong>Email: </strong>
        {tourist.email}
      </p>
      <p>
        <strong>Password: </strong>
        {tourist.password}
      </p>
      <p>
        <strong>Mobile Number: </strong>
        {tourist.mobileNumber}
      </p>
      <p>
        <strong>Nationality: </strong>
        {tourist.nationality}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {tourist.dob}
      </p>
      <p>
        <strong>Status: </strong>
        {tourist.status}
      </p>
      <p>
        <strong>Wallet: </strong>
        {tourist.wallet}
      </p>

      <p>{tourist.createdAt}</p>
    </div>
  );
};

export default TouristDetails;
