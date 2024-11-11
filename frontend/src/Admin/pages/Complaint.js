import { useEffect, useState } from "react";
import { useComplaintContext } from "../hooks/useComplaintContext";

const Complaint = () => {
    const { complaint, dispatch } = useComplaintContext();
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reply, setReply] = useState("");
    const [replyError, setReplyError] = useState(null);
    const [replySuccess, setReplySuccess] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
    const [statusFilter, setStatusFilter] = useState("");
  
    // Fetch complaints on page load
    const fetchComplaints = async (url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "SET_COMPLAINT", payload: json });
        }
      } catch (err) {
        setError("Failed to fetch complaints");
      }
    };
  
    useEffect(() => {
      fetchComplaints("/api/Admin/Complaint");
    }, [dispatch]);
  
    // Handle sorting by date
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
      setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
    };
  
    // Fetch and view complaint details
    const handleViewDescription = async (complaintId) => {
      setLoading(true);
      setError(null);
      setReply("");
  
      try {
        const response = await fetch(`/api/Admin/Complaint/${complaintId}`);
        const json = await response.json();
        if (response.ok) {
          setSelectedComplaint(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError("Something went wrong while fetching the complaint.");
      } finally {
        setLoading(false);
      }
    };
  
    // Handle reply submission
    const handleReplySubmit = async (e) => {
      e.preventDefault();
      setReplyError(null);
      setReplySuccess(null);
  
      if (!reply.trim()) {
        setReplyError("Reply cannot be empty.");
        return;
      }
  
      try {
        const response = await fetch(`/api/Admin/replyComplaint/${selectedComplaint._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reply }),
        });
  
        const json = await response.json();
        if (response.ok) {
          setReplySuccess("Reply added successfully.");
          setSelectedComplaint({ ...selectedComplaint, reply: json.reply });
          setReply("");
        } else {
          setReplyError(json.error || "Failed to submit reply.");
        }
      } catch (err) {
        setReplyError("Something went wrong while submitting the reply.");
      }
    };
  
    // Handle status change
    const handleStatusChange = async (e) => {
      const newStatus = e.target.checked ? "resolved" : "pending";
      if (selectedComplaint.status === "resolved" && e.target.checked) return;
  
      try {
        const response = await fetch(`/api/Admin/Complaint/${selectedComplaint._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
  
        const json = await response.json();
        if (response.ok) {
          setSelectedComplaint(json.complaint);
        } else {
          setError(json.error || "Failed to update status.");
        }
      } catch (err) {
        setError("Something went wrong while updating the status.");
      }
    };
  
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Complaints Management</h2>
  
        {/* Sort and Filter Actions */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded transition duration-300 ease-in-out shadow-md"
          onClick={() => {
            toggleSortOrder();
            handleSortByDate();
          }}
        >
          Sort by Date ({sortOrder === "desc" ? "Newest First" : "Oldest First"})
        </button>
          <div className="space-x-2 flex flex-wrap gap-2">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded transition duration-300 ease-in-out"
              onClick={() => handleFilterByStatus("pending")}
            >
              Show Pending
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded transition duration-300 ease-in-out"
              onClick={() => handleFilterByStatus("resolved")}
            >
              Show Resolved
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded transition duration-300 ease-in-out"
              onClick={() => fetchComplaints("/api/Admin/Complaint")}
            >
              Show All
            </button>
          </div>
        </div>
  
        {/* Complaints List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaint &&
            complaint.map((complaintItem) => (
              <div
                key={complaintItem._id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h4 className="text-xl font-semibold mb-2">{complaintItem.title}</h4>
                <p className="mb-1">
                  <strong>Status:</strong> {complaintItem.status}
                </p>
                <p className="mb-2">
                  <strong>Issued date:</strong>{" "}
                  {new Date(complaintItem.date).toLocaleDateString()}
                </p>
                <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded transition duration-300 ease-in-out shadow-md"
                onClick={() => handleViewDescription(complaintItem._id)}
              >
                View Details
              </button>
              </div>
            ))}
        </div>
  
        {/* Complaint Description and Reply Form */}
        <div className="mt-8">
          {loading ? (
            <p>Loading description...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : selectedComplaint ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-2">Description</h4>
              <p className="mb-4">{selectedComplaint.body}</p>
              <p className="mb-2">
                <strong>Status:</strong> {selectedComplaint.status}
              </p>
              <p className="mb-4">
                <strong>Issued date:</strong>{" "}
                {new Date(selectedComplaint.date).toLocaleDateString()}
              </p>
  
              {/* Reply Section */}
              <div className="reply-section mb-4">
                {selectedComplaint.reply ? (
                  <p className="bg-gray-100 p-4 rounded">
                    <strong>Reply:</strong> {selectedComplaint.reply}
                  </p>
                ) : (
                  <form onSubmit={handleReplySubmit} className="space-y-4">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows="4"
                      className="w-full p-2 border rounded"
                      placeholder="Type your reply here..."
                    />
                    {replyError && (
                      <p className="text-red-500 text-sm">{replyError}</p>
                    )}
                    {replySuccess && (
                      <p className="text-green-500 text-sm">{replySuccess}</p>
                    )}
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded transition duration-300 ease-in-out"
                    >
                      Submit Reply
                    </button>
                  </form>
                )}
              </div>
  
              {/* Status Update */}
            <div className="flex items-center mt-4">
              <label htmlFor="status-toggle" className="mr-2 text-gray-700 font-medium">
                Mark as Resolved:
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="status-toggle"
                  id="status-toggle"
                  checked={selectedComplaint.status === "resolved"}
                  onChange={handleStatusChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="status-toggle"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <span className="text-gray-700 font-medium">
                {selectedComplaint.status === "resolved" ? "Resolved" : "Pending"}
              </span>
            </div>
          </div>
        ) : (
          <p>Select a complaint to view the description</p>
        )}
      </div>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #68D391;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #68D391;
        }
      `}</style>
    </div>
  )
}

export default Complaint;
