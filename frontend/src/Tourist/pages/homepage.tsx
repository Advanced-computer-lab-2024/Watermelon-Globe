import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../Components/ui/tabs";
import {
  Calendar,
  MapPin,
  Hotel,
  Plane,
  Search,
  Star,
  Bell,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import profileIcon from "../../Assets/Profile.png";
import ExploreTrips from "../Components/ExploreTrips.jsx";
import ExploreActivities from "../Components/ExploreActivities.jsx";
import ExploreHistoricalSites from "../Components/ExploreHistoricalSites.jsx";
import ForYou from "../Components/ForYou.jsx";
import ExploreTransportations from "../Components/ExploreTransportations.jsx";
import NotificationsBox from "../Components/NotificationsBox";
import WalletComponent from '../Components/Wallet';
import TouristNavbar from "../Components/TouristNavBar";
import Modal from "../Components/Modal";

export default function DraftHomePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>('hotels');
  const [showHowToUseModal, setShowHowToUseModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Use the 'Discover' button to find amazing destinations.",
    "Search for hotels, flights, or guides using the top navigation.",
    "Click 'Explore' to dive deeper into your favorite spots.",
    "Sign up to create personalized travel plans and access special offers.",
    "Stay connected through our social media channels for updates!",
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", { destination, dates, guests });
  };

  const handleSignOut = () => {
    setIsSignedUp(false);
    navigate(`/`);
    // Clear user data or perform sign-out logic if necessary.
  };

  const handleViewDetails = () => {
    navigate(`/TouristDetails/${id}`);
  };

  const handleViewPurchasedDetails = () => {
    navigate(`/PurchasedProducts/${id}`);
  };

  const handleViewProductsDetails = () => {
    navigate(`/ProductTourist/${id}`);
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleOpenHowToUse = () => {
    setCurrentStep(0); // Reset to the first step
    setShowHowToUseModal(true);
  };

  const closeHowToUseModal = () => {
    setShowHowToUseModal(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ margin: "-20px" }}
    >
      <TouristNavbar id={id} />


      <main className="flex-grow">
        <div
          className="mt-18 flex items-center justify-center w-full h-screen p-4 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://www.outlooktravelmag.com/media/bali-1-1582544096.profileImage.2x-1536x884.webp')",
          }}
        >
          <div className="bg-white bg-opacity-80 p-6 ml-auto rounded-lg shadow-lg max-w-md w-full">
            {/* Steps Section */}
            <h2 className="text-2xl mb-10 font-bold text-center text-primary mb-4">
              How to Use WaterMelon Globe
            </h2>
            <div className="text-gray-700 text-center mb-6">
              <p className="text-lg font-medium">{steps[currentStep]}</p>
            </div>

            <div className="flex justify-between items-center mt-10 space-x-4">
              <Button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className={`py-2 px-6 rounded-lg font-semibold transition duration-300 ${currentStep === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-secondary text-white hover:bg-secondaryHover hover:shadow-lg"
                  }`}
              >
                Back
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  className="py-2 px-6 rounded-lg bg-darkPink text-white font-semibold transition duration-300 hover:bg-darkPinkHover hover:shadow-lg"
                >
                  Enjoy
                </Button>
              ) : (
                <Button
                  onClick={handleNextStep}
                  className="py-2 px-6 rounded-lg bg-primary text-white font-semibold transition duration-300 hover:bg-hover hover:shadow-lg"
                >
                  Next
                </Button>
              )}
            </div>
          </div>


        </div>


        <section className="py-20">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-secondary">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Bali, Indonesia",
                  image: "https://www.outlooktravelmag.com/media/bali-1-1582544096.profileImage.2x-1536x884.webp",
                },
                {
                  name: "Paris, France",
                  image: "https://media.timeout.com/images/106181719/750/562/image.jpg",
                },
                {
                  name: "Santorini, Greece",
                  image: "https://lp-cms-production.imgix.net/2024-06/iStock-166471469.jpg",
                },
              ].map((destination, index) => (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <CardTitle className="text-secondary mb-2">
                      {destination.name}
                    </CardTitle>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-primary mr-1" />
                      <Star className="w-4 h-4 text-primary mr-1" />
                      <Star className="w-4 h-4 text-primary mr-1" />
                      <Star className="w-4 h-4 text-primary mr-1" />
                      <Star className="w-4 h-4 text-primary mr-1" />
                    </div>
                    <Button className="mt-4 bg-secondary hover:bg-secondaryHover text-white w-full">
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ForYou />
        <ExploreTrips />
        <ExploreActivities />
        <ExploreHistoricalSites touristId={id} />
        <ExploreTransportations touristId={id} />

        <section className="bg-sectionBackground py-20">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-secondary">
              Why Choose Watermelon Globe?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Best Price Guarantee",
                  icon: MapPin,
                  description:
                    "We offer competitive prices on our 100 million plus product range.",
                },
                {
                  title: "Easy Booking",
                  icon: Calendar,
                  description:
                    "Book your trip with ease using our intuitive booking platform.",
                },
                {
                  title: "24/7 Support",
                  icon: Hotel,
                  description:
                    "Round-the-clock assistance for a seamless travel experience.",
                },
              ].map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 mx-auto text-primary" />
                    <CardTitle className="mt-4 text-secondary">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grayText">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl font-bold mb-8 text-secondary">
              Ready for Your Next Adventure?
            </h3>
            <p className="mb-8 text-grayText">
              Sign up for our newsletter and get exclusive travel deals and
              tips!
            </p>
            <div className="flex justify-center mx-auto">
              <Input
                className="w-64 mr-2"
                placeholder="Enter your email"
                type="email"
              />
              <Button className="w-64 bg-primary hover:bg-hover text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-white py-12">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 sm:px-12">
          {/* About Us Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-hover transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hover transition">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hover transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-hover transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hover transition">
                  Safety Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-hover transition">
                  Cancellation Options
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <span className="block">support@watermelonglobe.com</span>
              </li>
              <li>
                <span className="block">+1 (555) 123-4567</span>
              </li>
              <li>
                <span className="block">123 Travel Street, Adventure City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Follow Us Section - Centered Bottom Middle */}
        <div className="flex justify-center items-center mt-8">
          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-hover transition">
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="hover:text-hover transition">
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="hover:text-hover transition">
                <FaLinkedinIn className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="hover:text-hover transition">
                <FaTwitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer copyright */}
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Watermelon Globe. All rights
            reserved.
          </p>
        </div>
      </footer>
      {/* How to Use Modal */}
      {showHowToUseModal && (
        <Modal onClose={closeHowToUseModal}>
          <div className="p-8 max-w-md mx-auto bg-white relative">
            <h2 className="text-2xl font-bold text-center text-primary mb-4">
              How to Use WaterMelon Globe
            </h2>
            <div className="text-gray-600 text-center mb-6">
              <p>{steps[currentStep]}</p>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className={`py-2 px-4 rounded-lg font-semibold transition ${currentStep === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-secondary text-white hover:bg-primary"
                  }`}
              >
                Back
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={closeHowToUseModal}
                  className="py-2 px-4 rounded-lg bg-primary text-white font-semibold transition hover:bg-secondary"
                >
                  Finish
                </Button>
              ) : (
                <Button
                  onClick={handleNextStep}
                  className="py-2 px-4 rounded-lg bg-primary text-white font-semibold transition hover:bg-secondary"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
