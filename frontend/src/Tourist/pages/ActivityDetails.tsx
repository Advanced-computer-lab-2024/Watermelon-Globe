import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PaymentOptions2 from "../Components/PaymentOptions2";
import {
  MapPin,
  Calendar,
  Clock,
  Tag,
  Star,
  Share2,
  Mail,
  Bookmark,
} from "lucide-react";
import WalletComponent from "../Components/Wallet";

interface Tag {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Location {
  type: string;
  coordinates: [number, number];
}

interface Rating {
  user: string;
  rating: number;
}

interface Comment {
  user: string;
  comment: string;
  date: string;
}

interface Activity {
  _id: string;
  Name: string;
  Date: string;
  Time: string;
  Location: Location;
  Price: number;
  priceRange: number[];
  Category: Category | null;
  tags: Tag[];
  Discount: number;
  bookingOpen: boolean;
  ratings: Rating[];
  rating: number;
  noOfRatings: number;
  Advertiser: string | null;
  comments: Comment[];
}

const ActivityDetails: React.FC = () => {
  const { activityId, id } = useParams<{ activityId: string; id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "wallet" | "creditCard" | null
  >(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `/api/Activities/getActivityById/${activityId}`
        );
        setActivity(response.data);
      } catch (err) {
        setError("Failed to load activity details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const bookmarkResponse = await axios.get(
          `/api/Tourist/checkBookmarkActivity/${id}/${activityId}`
        );
        setIsBookmarked(bookmarkResponse.data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [id, activityId]);

  const handleShareLink = () => {
    const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`;
    navigator.clipboard
      .writeText(activityUrl)
      .then(() => alert("Activity link copied to clipboard!"))
      .catch((err) => alert("Failed to copy link: " + err));
  };

  const handleShareEmail = () => {
    const activityUrl = `${window.location.origin}/TouristActivityDetails/${activityId}/${id}`;
    const subject = encodeURIComponent("Check out this activity!");
    const body = encodeURIComponent(
      `I thought you might be interested in this activity: ${activityUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.put(
          `/api/Tourist/removeBookmarkActivity/${id}/${activityId}`
        );
      } else {
        await axios.put(`/api/Tourist/bookmarkActivity/${id}/${activityId}`);
      }
      setIsBookmarked(!isBookmarked);
      alert(
        isBookmarked
          ? "Activity removed from bookmarks"
          : "Activity added to bookmarks"
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("Error toggling bookmark. Please try again.");
    }
  };

  const handleBooking = async () => {
    if (!paymentMethod || !activity) {
      alert("Please select a payment method before booking.");
      return;
    }

    setBookingInProgress(true);
    setError(null);

    try {
      if (paymentMethod === "wallet") {
        const walletResponse = await axios.put(
          `/api/Tourist/updateWallet/${id}`,
          {
            amount: -activity.Price,
          }
        );

        if (walletResponse.data.wallet >= 0) {
          alert("Payment confirmed using Wallet!");

          await axios.post("/api/TouristItinerary/createActivityBooking", {
            activity: activityId,
            tourist: id,
            chosenDate: activity.Date,
          });

          await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
            amountPaid: activity.Price,
          });

          alert("Activity booked successfully!");
        } else {
          await axios.put(`/api/Tourist/updateWallet/${id}`, {
            amount: +activity.Price,
          });
          alert("Insufficient wallet balance.");
        }
      } else if (paymentMethod === "creditCard") {
        alert("Proceeding with credit card payment (Stripe)...");

        await axios.post("/api/TouristItinerary/createActivityBooking", {
          activity: activityId,
          tourist: id,
          chosenDate: activity.Date,
        });

        await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
          amountPaid: activity.Price,
        });

        alert("Activity booked successfully!");
      }
    } catch (err) {
      console.error("Error during booking:", err);
      alert(
        "An error occurred while processing the booking. Please try again later."
      );
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-xl mt-10">{error}</div>
    );
  }

  if (!activity) {
    return (
      <div className="text-gray-700 text-center text-xl mt-10">
        No activity found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{activity.Name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="space-y-4">
          <p className="flex items-center text-gray-700 space-x-2">
            <MapPin className="text-primary-500" />
            <span>{`Latitude: ${activity.Location.coordinates[1]}, Longitude: ${activity.Location.coordinates[0]}`}</span>
          </p>
          <p className="flex items-center text-gray-700 space-x-2">
            <Calendar className="text-primary-500" />
            <span>{new Date(activity.Date).toLocaleDateString()}</span>
          </p>
          <p className="flex items-center text-gray-700 space-x-2">
            <Clock className="text-primary-500" />
            <span>{activity.Time}</span>
          </p>
          <p className="flex items-center text-gray-700 space-x-2">
            <Star className="text-yellow-500" />
            <span>
              {activity.rating
                ? `${activity.rating.toFixed(1)} / 5 (${
                    activity.noOfRatings
                  } ratings)`
                : "No Ratings Yet"}
            </span>
          </p>
          <p className="flex items-center text-gray-700 space-x-2">
            <Tag className="text-primary-500" />
            <span>
              {activity.tags.map((tag) => tag.name).join(", ") || "No Tags"}
            </span>
          </p>
          <p className="text-gray-800 font-medium">
            <strong>Price:</strong> ${activity.Price}
            {activity.Discount > 0 && (
              <span className="text-green-500 ml-2">{`(${activity.Discount}% Off)`}</span>
            )}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleShareLink}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <Share2 className="mr-2" />
            Share Link
          </button>
          <button
            onClick={handleShareEmail}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
          >
            <Mail className="mr-2" />
            Share via Email
          </button>
        </div>
      </div>

      <PaymentOptions2
        paymentMethod={paymentMethod}
        onPaymentMethodSelection={setPaymentMethod}
      />

      <div className="mt-6">
        <button
          onClick={handleBookmark}
          className={`w-full px-4 py-2 mb-4 text-sm font-semibold rounded-lg ${
            isBookmarked
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark className="mr-2 inline-block" size={20} />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
        <button
          onClick={handleBooking}
          className={`w-full px-4 py-2 text-white rounded-lg ${
            bookingInProgress
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark"
          }`}
          disabled={bookingInProgress}
        >
          {bookingInProgress ? "Booking..." : "Book Activity"}
        </button>
      </div>
      <WalletComponent touristId={id} />
    </div>
  );
};

export default ActivityDetails;
