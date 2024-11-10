
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, DollarSign, Globe, MapPin, Star, Users, Accessibility } from "lucide-react";

export default function ItinerarySlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [itineraries, setItineraries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  // State for deleting the account
  const [deleteError, setDeleteError] = useState('')
  const [deleteSuccess, setDeleteSuccess] = useState('')

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch('/api/Itinerary/getAllItineraries')
        if (!response.ok) throw new Error('Failed to fetch itineraries')
        
        const data = await response.json()
        setItineraries(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching itineraries:', error)
        setError('Failed to load itineraries. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchItineraries()
  }, [])

  useEffect(() => {
    if (itineraries.length === 0) return

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % itineraries.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [itineraries.length])

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading itineraries...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>
  }

  if (itineraries.length === 0) {
    return <div className="flex justify-center items-center h-64">No itineraries found.</div>
  }

  // Function to delete the account
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/api/TourGuide/requestDeletionGuide/67013950229bd3b168a94dde`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        setDeleteError('Failed to delete account.')
        setDeleteSuccess('')
      } else {
        alert('Account deleted successfully.')
        setDeleteError('')
        navigate('/');
        // Optionally, you can redirect the user after deletion or reset the state
      }
    } catch (error) {
      setDeleteError('An error occurred while deleting the account.')
      setDeleteSuccess('')
      console.error('Error deleting account:', error)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Delete Account Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleDeleteAccount}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Display any deletion success or error messages */}
      {deleteSuccess && <div className="text-green-500">{deleteSuccess}</div>}
      {deleteError && <div className="text-red-500">{deleteError}</div>}

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {itineraries.map((itinerary, index) => (
            <div key={itinerary._id || index} className="w-full flex-shrink-0">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{itinerary.name}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                    <Globe className="w-4 h-4" />
                    <span>{itinerary.languageOfTour}</span>
                    <MapPin className="w-4 h-4 ml-2" />
                    <span>{itinerary.locations && itinerary.locations.join(', ')}</span>
                  </div>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{itinerary.timeline}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">${itinerary.priceOfTour}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {itinerary.tag && itinerary.tag.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-200 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Activities:</h4>
                      <ul className="list-disc list-inside text-sm">
                        {itinerary.activities && itinerary.activities.map((activity, activityIndex) => (
                          <li key={activityIndex}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{itinerary.availableTimes && itinerary.availableTimes.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Guide: {itinerary.guide?.name || itinerary.guide}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-semibold">{itinerary.rating}</span>
                        <span className="text-sm text-gray-500">({itinerary.noOfRatings} ratings)</span>
                      </div>
                      {itinerary.accessibility && (
                        <div className="flex items-center space-x-2">
                          <Accessibility className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">Accessible</span>
                        </div>
                      )}
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {itineraries.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
