import { useEffect, useState } from "react";
import ComplaintDetails from "../Components/ComplaintDetails";
import { useComplaintContext } from "../hooks/useComplaintContext";

const Complaint = () => {
    const { complaint, dispatch } = useComplaintContext();
    const [selectedComplaint, setSelectedComplaint] = useState(null); // State to store selected complaint details
    const [loading, setLoading] = useState(false); // Loading state for fetching the complaint
    const [error, setError] = useState(null); // Error state
    const [reply, setReply] = useState(""); // State to store the reply
    const [replyError, setReplyError] = useState(null); // Error state for reply submission
    const [replySuccess, setReplySuccess] = useState(null); // Success message for reply submission

    // New states for sorting and filtering
    const [sortOrder, setSortOrder] = useState('desc');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchComplaints = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_COMPLAINT', payload: json });
            }
        } catch (err) {
            setError("Failed to fetch complaints");
        }
    };

    useEffect(() => {
        fetchComplaints('/api/Admin/Complaint'); // Fetch complaints on initial load
    }, [dispatch]);

    // Handle sorting by dates
    const handleSortByDate = async () => {
        const url = `/api/Admin/ComplaintsSortByDate?order=${sortOrder}`;
        fetchComplaints(url);
    };

    // Handle filtering by status
    const handleFilterByStatus = async (status) => {
        const url = `/api/Admin/ComplaintsFilterByStatus?status=${status}`;
        fetchComplaints(url);
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
    };


    // Function to fetch a single complaint
    const handleViewDescription = async (complaintId) => {
        setLoading(true); // Set loading to true while fetching the complaint
        setError(null); // Reset error state
        setReply(""); // Clear previous reply

        try {
            const response = await fetch(`/api/Admin/Complaint/${complaintId}`);
            const json = await response.json();

            if (response.ok) {
                setSelectedComplaint(json); // Set the fetched complaint to the selectedComplaint state
            } else {
                setError(json.error); // Set error message if the complaint is not found
            }
        } catch (err) {
            setError('Something went wrong while fetching the complaint.'); // Handle fetch error
        } finally {
            setLoading(false); // Set loading to false once the fetch is complete
        }
    };

    // Function to handle reply submission
    const handleReplySubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setReplyError(null);
        setReplySuccess(null);

        if (!reply.trim()) {
            setReplyError("Reply cannot be empty.");
            return;
        }

        try {
            const response = await fetch(`/api/Admin/replyComplaint/${selectedComplaint._id}`, {
                method: "PUT", // or PATCH depending on your preference
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ reply }) // Send the reply
            });

            const json = await response.json();

            if (response.ok) {
                setReplySuccess("Reply added successfully.");
                setSelectedComplaint({ ...selectedComplaint, reply: json.reply }); // Update the complaint with the new reply
                setReply(""); // Clear the reply input after successful submission
            } else {
                setReplyError(json.error || "Failed to submit reply.");
            }
        } catch (err) {
            setReplyError("Something went wrong while submitting the reply.");
        }
    };

    // Function to update complaint status
    const handleStatusChange = async (e) => {
        const newStatus = e.target.checked ? 'resolved' : 'pending'; // Determine new status based on checkbox
        if (selectedComplaint.status === 'resolved' && e.target.checked) return; // Prevent updating if already resolved

        try {
            const response = await fetch(`/api/Admin/Complaint/${selectedComplaint._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus }) // Send the updated status
            });

            const json = await response.json();

            if (response.ok) {
                setSelectedComplaint(json.complaint); // Update the selected complaint with the new status
            } else {
                setError(json.error || "Failed to update status.");
            }
        } catch (err) {
            setError("Something went wrong while updating the status.");
        }
    };

    return (
        <div className="activitycategory">

            <div className="complaint-actions">
                {/* Sort Button */}
                <button onClick={() => { toggleSortOrder(); handleSortByDate(); }}>
                    Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
                </button>

                {/* Filter Buttons */}
                <button onClick={() => handleFilterByStatus('pending')}>Show Pending Complaints</button>
                <button onClick={() => handleFilterByStatus('resolved')}>Show Resolved Complaints</button>
                <button onClick={() => fetchComplaints('/api/Admin/Complaint')}>Show All Complaints</button>
            </div>

            <div className="workouts">
                {complaint && complaint.map((complaintItem) => (
                    <ComplaintDetails 
                        key={complaintItem._id} 
                        complaint={complaintItem} 
                        onViewDescription={() => handleViewDescription(complaintItem._id)} 
                    />
                ))}
            </div>

            {/* Display the selected complaint's description and reply form */}
            <div className="complaint-description">
                {loading ? (
                    <p>Loading description...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : selectedComplaint ? (
                    <div>
                        <h4>Description</h4>
                        <p>{selectedComplaint.body}</p>
                        <p>Status: {selectedComplaint.status}</p>
                        <p>Issued date: {new Date(selectedComplaint.date).toLocaleDateString()}</p>
                        <br />
                        {/* Reply Form */}
                        <div className="reply-section">
                            {selectedComplaint.reply ? (
                                <p><strong>Reply:</strong> {selectedComplaint.reply}</p>
                            ) : (
                                <form onSubmit={handleReplySubmit}>
                                    <textarea 
                                        value={reply} 
                                        onChange={(e) => setReply(e.target.value)} 
                                        rows="4" 
                                        placeholder="Type your reply here..." 
                                    />
                                    {replyError && <p className="error">{replyError}</p>}
                                    {replySuccess && <p className="success">{replySuccess}</p>}
                                    <button type="submit">Submit Reply</button>
                                </form>
                            )}
                        </div>

                        {/* Status Update Slider */}
                        <div className="status-update">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={selectedComplaint.status === 'resolved'}
                                    onChange={handleStatusChange}
                                />
                                <span className="slider round"></span>
                            </label>
                            <span>{selectedComplaint.status === 'resolved' ? "Resolved" : "Pending"}</span>
                        </div>
                    </div>
                ) : (
                    <p>Select a complaint to view the description</p>
                )}
            </div>
        </div>
    );
};

export default Complaint;