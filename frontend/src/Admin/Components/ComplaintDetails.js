const ComplaintDetails = ({ complaint, onViewDescription }) => {
    return (
      <div className="activitycategory-details">
        <h4>{complaint.title}</h4>
        <h4>Status: {complaint.status}</h4>
        <p>Issued date: {new Date(complaint.date).toLocaleDateString()}</p>
        {/* Button to view the description */}
        <button onClick={() => onViewDescription(complaint)}>
          View Details
        </button>
      </div>
    );
  };
  
  export default ComplaintDetails;