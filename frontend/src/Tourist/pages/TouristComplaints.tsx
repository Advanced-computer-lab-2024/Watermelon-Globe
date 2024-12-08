'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaCheckCircle, FaPaperPlane, FaFileAlt, FaClock, FaClipboardCheck } from 'react-icons/fa'
import axios from 'axios'
import TouristNavbar from "../Components/TouristNavBar";

interface Complaint {
  _id: string
  title: string
  body: string
  status: string
  date: string
  reply?: string
}

const TouristComplaints = () => {
  const params = useParams()
  const navigate = useNavigate();
  const id = params.id as string
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!id) {
      setError('Tourist ID is missing. Please log in again.')
      return
    }
    fetchComplaints()
  }, [id])

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`/api/Tourist/myComplaints/${id}`)
      setComplaints(response.data)
    } catch (err) {
      setError('Failed to load complaints. Please try again later.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) {
      setError('Tourist ID is missing. Please log in again.')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await axios.post(`/api/Tourist/Complaint/${id}`, { title, body })
      setSuccess('Complaint submitted successfully!')
      setTitle('')
      setBody('')
      fetchComplaints()
    } catch (err) {
      setError('Failed to submit complaint. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <FaExclamationCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Authentication Error</h1>
          <p className="text-gray-600 mb-6">Tourist ID is missing. Please log in again to access the complaints portal.</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-hover transition duration-300 ease-in-out w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={id} />
      <p>hello</p>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaClipboardCheck className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Tourist Complaints Portal</h1>
                <p className="text-white opacity-75">Submit and view your complaints</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Complaint Form */}
            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                <FaFileAlt className="mr-2" />
                File a New Complaint
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Complaint Title</label>
                  <input
                    id="title"
                    type="text"
                    placeholder="Brief title of your complaint"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Complaint Details</label>
                  <textarea
                    id="body"
                    placeholder="Provide more details about your complaint"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaClock className="animate-spin -ml-1 mr-3 h-5 w-5" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Submit Complaint
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Existing Complaints */}
            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-secondary mb-4 flex items-center">
                <FaClipboardCheck className="mr-2" />
                Your Complaints
              </h2>
              <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto">
                {complaints.length === 0 ? (
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">You haven't filed any complaints yet.</p>
                ) : (
                  complaints.map((complaint) => (
                    <div key={complaint._id} className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">{complaint.title}</h3>
                      <p className="text-sm font-medium mb-2 flex items-center">
                        Status: 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                        </span>
                      </p>
                      <p className="text-gray-600 mb-3">{complaint.body}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FaClock className="mr-2" size={14} />
                        Filed on: {new Date(complaint.date).toLocaleDateString()}
                      </p>
                      {complaint.reply && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="font-semibold text-gray-700 mb-2 flex items-center">
                            <FaCheckCircle className="mr-2 text-green-500" size={14} />
                            Admin Reply:
                          </p>
                          <p className="text-gray-600">{complaint.reply}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Success and Error Messages */}
            {success && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md flex items-center" role="alert">
                <FaCheckCircle className="mr-3 flex-shrink-0" />
                <div>
                  <p className="font-bold">Success</p>
                  <p>{success}</p>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md flex items-center" role="alert">
                <FaExclamationCircle className="mr-3 flex-shrink-0" />
                <div>
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TouristComplaints

