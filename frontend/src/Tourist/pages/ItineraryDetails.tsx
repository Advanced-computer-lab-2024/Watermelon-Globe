import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaCalendar,
  FaDollarSign,
  FaLanguage,
  FaWheelchair,
  FaShare,
  FaEnvelope,
  FaBookmark,
} from "react-icons/fa";
import axios from "axios";
import PaymentOptions2 from "../Components/PaymentOptions2";
import WalletComponent from "../Components/Wallet";
import TouristNavbar from "../Components/TouristNavBar";
import Alert from "@mui/material/Alert";
interface Itinerary {
  name: string;
  locations: string[];
  activities: { activityName: string; duration: string }[];
  timeline: string;
  languageOfTour: string;
  priceOfTour: number;
  accessibility: boolean;
  rating: number;
  availableDates: string[];
  availableTimes: string[];
}
interface PromoCode {
  code: string;
  discountValue: number;
}

const ItineraryDetails = () => {
  const params = useParams();
  const tripid = params.tripid as string;
  const id = params.id as string;

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "wallet" | "creditCard" | null
  >(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [invalidPromo, setInvalidPromo] = useState(false); // To track if the promo is invalid
  const [total, setTotal] = useState(0);

  const handleApplyPromo = async () => {
    try {
      // Send a GET request to your API to fetch the promo codes
      const response = await axios.get<PromoCode[]>("/api/Admin/getPromoCodes"); // Replace with your actual backend API URL

      // Find the promo code that matches the entered promo code
      const validPromo = response.data.find((promo) => {
        console.log(promo); // Log the promo object for each iteration
        return promo.code === promoCode; // Check if the promo code matches
      });

      console.log(validPromo);
      // If promo code is valid
      if (validPromo) {
        setPromoApplied(true);
        const discountAmount = (total * validPromo.discountValue) / 100;
        setTotal(total - discountAmount);
        setInvalidPromo(false); // Reset any error message if the promo code is valid
      } else {
        setInvalidPromo(true); // Set error state if promo code is invalid
      }
    } catch (error) {
      console.error("Error checking promo code", error);
      setInvalidPromo(true); // Handle any errors during the API call
    }
  };


    const fetchItinerary = async () => {
      try {
        const response = await fetch(`/api/Itinerary/getItinerary/${tripid}`);
        if (!response.ok) {
          throw new Error("Itinerary not found");
        }
        const data = await response.json();
        setItinerary(data);
        setTotal(data.priceOfTour);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const bookmarkResponse = await axios.get(
          `/api/Tourist/checkBookmarkItinerary/${id}/${tripid}`
        );
        setIsBookmarked(bookmarkResponse.data.isBookmarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    fetchItinerary();
    checkBookmarkStatus();
  }, [tripid, id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod || !itinerary) {
      alert("Please select a payment method before booking.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      // alert("Please select a date and time.");

      return;
    }

    setBookingInProgress(true);
    setError(null);

    try {
      if (paymentMethod === "wallet") {
        const walletResponse = await axios.put(
          `/api/Tourist/updateWallet/${id}`,
          {
            // amount: -itinerary.priceOfTour,
            amount: -total,
          }
        );

        if (walletResponse.data.wallet >= 0) {
          alert("Payment confirmed using Wallet!");

          await axios.post("/api/TouristItinerary/createChildItinerary", {
            itinerary: tripid,
            buyer: id,
            chosenDates: [selectedDate],
            chosenTimes: [selectedTime],
            // totalPrice: itinerary.priceOfTour,
            totalPrice: total,
            status: "pending",
          });

          await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
            // amountPaid: itinerary.priceOfTour,
            amountPaid: total,
          });

          alert("Itinerary booked successfully!");
        } else {
          await axios.put(`/api/Tourist/updateWallet/${id}`, {
            // amount: +itinerary.priceOfTour,
            amount: total,
          });
          alert("Insufficient wallet balance.");
        }
      } else if (paymentMethod === "creditCard") {
        alert("Proceeding with credit card payment (Stripe)...");

        await axios.post("/api/TouristItinerary/createChildItinerary", {
          itinerary: tripid,
          buyer: id,
          chosenDates: [selectedDate],
          chosenTimes: [selectedTime],
          // totalPrice: itinerary.priceOfTour,
          totalPrice: total,
          status: "pending",
        });

        await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
          // amountPaid: itinerary.priceOfTour,
          amountPaid: total,
        });

        alert("Itinerary booked successfully!");
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

  const handleShareLink = () => {
    const itineraryUrl = `${window.location.origin}/ItineraryDetails/${tripid}/${id}`;
    navigator.clipboard
      .writeText(itineraryUrl)
      .then(() => alert("Itinerary link copied to clipboard!"))
      .catch((err) => alert("Failed to copy link: " + err));
  };

  const handleShareEmail = () => {
    const itineraryUrl = `${window.location.origin}/ItineraryDetails/${tripid}/${id}`;
    const subject = encodeURIComponent("Check out this itinerary!");
    const body = encodeURIComponent(
      `I thought you might be interested in this itinerary: ${itineraryUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.put(`/api/Tourist/removeBookmarkItinerary/${id}/${tripid}`);
      } else {
        await axios.put(`/api/Tourist/bookmarkItinerary/${id}/${tripid}`);
      }
      setIsBookmarked(!isBookmarked);
      alert(
        isBookmarked
          ? "Itinerary removed from bookmarks"
          : "Itinerary added to bookmarks"
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      alert("Error toggling bookmark. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="text-red-500 text-center text-xl mt-10">
  //       Error: {error}
  //     </div>
  //   );
  // }

  if (!itinerary) return null;

  return (
    <div className="min-h-screen bg-background p-8" style={{ margin: "-20px" }}>
      <TouristNavbar id={id} />
      <p>hello</p>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary p-5 relative">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2">
                <FaMapMarkerAlt className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {itinerary.name}
                </h2>
                <p className="text-white opacity-75">
                  {itinerary.locations.join(", ")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Activities
              </h3>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-4">
                {itinerary.activities.map((activity, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-white p-3 rounded shadow"
                  >
                    <span className="text-gray-800 font-medium">
                      {activity.activityName}
                    </span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {activity.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Timeline
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {itinerary.timeline}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                  <FaLanguage className="mr-2" /> Language of Tour
                </h3>
                <p className="text-gray-600">{itinerary.languageOfTour}</p>
              </div>
              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                  <FaDollarSign className="mr-2" /> Price
                </h3>

                <p className="text-gray-600 text-2xl font-bold">
                  {/* ${itinerary.priceOfTour} */}${total}
                </p>
              </div>

              <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center">
                  <FaWheelchair className="mr-2" /> Accessibility
                </h3>
                <p className="text-gray-600">
                  {itinerary.accessibility ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-2 flex items-center">
                <FaStar className="mr-2" /> Average Rating
              </h3>
              <p className="text-lg font-medium text-gray-800">
                {itinerary.rating} / 5
              </p>
            </div>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h2 className="text-xl font-semibold text-secondary mb-4">
                Apply Promo
              </h2>

              {/* Promo code input */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="promoCode"
                  className="text-lg font-semibold mb-2"
                >
                  Enter Promo Code
                </label>
                <input
                  type="text"
                  id="promoCode"
                  placeholder="Enter promo code"
                  className="p-2 border border-gray-300 rounded-lg"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)} // Assuming you have a state for promoCode
                />
              </div>

              {/* Apply button */}
              <button
                onClick={handleApplyPromo} // Function to handle promo code application
                className="w-full bg-primary text-white p-2 rounded-lg font-semibold hover:bg-primary-dark transition duration-300"
              >
                Apply Promo
              </button>

              {/* Optionally, show a message if the promo code is successfully applied */}
              {promoApplied && (
                <Alert severity="success" style={{ marginTop: "12px" }}>
                  Promo Code applied successfully
                </Alert>
              )}
            </div>

            {/* Show error message if promo code is invalid */}
            {invalidPromo && (
              <Alert severity="error" style={{ marginTop: "12px" }}>
                Invalid Promo Code
              </Alert>
            )}

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Payment Options
              </h3>
              <PaymentOptions2
                paymentMethod={paymentMethod}
                onPaymentMethodSelection={setPaymentMethod}
              />
            </div>

            <form
              onSubmit={handleBooking}
              className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Book Your Itinerary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <FaCalendar className="mr-2" /> Choose Date
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
                    {itinerary.availableDates.map((date, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="date"
                          value={date}
                          checked={selectedDate === date}
                          onChange={() => setSelectedDate(date)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">
                          {new Date(date).toLocaleDateString()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                    <FaClock className="mr-2" /> Choose Time
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-4">
                    {itinerary.availableTimes.map((time, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={selectedTime === time}
                          onChange={() => setSelectedTime(time)}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-hover transition-colors"
                  disabled={bookingInProgress}
                >
                  {bookingInProgress ? "Booking..." : "Book Now"}
                </button>
                {bookingMessage && (
                  <p className="text-lg text-gray-600">{bookingMessage}</p>
                )}
              </div>
            </form>

            <div className="bg-cardBackground shadow-md rounded-lg p-4 hover:shadow-lg transition-transform duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-secondary mb-4">
                Actions
              </h3>
              <div className="space-y-4">
                <button
                  onClick={handleBookmark}
                  className={`flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-lg ${
                    isBookmarked
                      ? "bg-primary hover:bg-hover"
                      : "bg-secondary hover:bg-secondaryHover "
                  }`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                  <FaBookmark className="mr-2" />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
                <div className="flex justify-between">
                  <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-secondaryHover focus:outline-none"
                    onClick={handleShareLink}
                  >
                    <FaShare className="mr-2 inline" />
                    Share Link
                  </button>
                  <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-secondary rounded-lg hover:bg-secondaryHover focus:outline-none"
                    onClick={handleShareEmail}
                  >
                    <FaEnvelope className="mr-2 inline" />
                    Share via Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary text-white"
            disabled={bookingInProgress}
          >
            {bookingInProgress ? "Booking..." : "Book Now"}
          </button>
          {bookingMessage && (
            <p className="text-lg text-gray-600">{bookingMessage}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-8">
        <button
          onClick={handleBookmark}
          className={`flex items-center justify-center px-4 py-2 rounded-md ${
            isBookmarked
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Bookmark className="mr-2" size={20} />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
        <div className="flex justify-between">
          <button
            className="flex-1 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={handleShareLink}
          >
            <span>Share Link</span>
          </button>
          <button
            className="flex-1 ml-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            onClick={handleShareEmail}
          >
            <span>Share via Email</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
