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

export default function DraftHomePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ margin: "-20px" }}
    >
      <TouristNavbar id={id} />


      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center text-secondary">
              Discover Your Perfect Getaway
            </h2>
            <Card className="w-full max-w-3xl mx-auto">
              <CardContent className="p-6">
                <Tabs defaultValue="hotels" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="hotels">Hotels</TabsTrigger>
                    <TabsTrigger value="tours">Tours</TabsTrigger>
                    <TabsTrigger value="flights">Flights</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hotels">
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Where are you going?"
                        className="flex-grow"
                      />
                      <Input type="date" className="w-40" />
                      <Button className="bg-primary hover:bg-hover text-white">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="tours">
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Tour destination"
                        className="flex-grow"
                      />
                      <Input type="date" className="w-40" />
                      <Button className="bg-primary hover:bg-hover text-white">
                        <Search className="w-4 h-4 mr-2" />
                        Find Tours
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="flights">
                    <div className="flex space-x-4">
                      <Input placeholder="From" className="flex-grow" />
                      <Input placeholder="To" className="flex-grow" />
                      <Input type="date" className="w-40" />
                      <Button className="bg-primary hover:bg-hover text-white">
                        <Search className="w-4 h-4 mr-2" />
                        Search Flights
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-secondary">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Bali, Indonesia",
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  name: "Paris, France",
                  image: "/placeholder.svg?height=200&width=300",
                },
                {
                  name: "Santorini, Greece",
                  image: "/placeholder.svg?height=200&width=300",
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
        <ExploreHistoricalSites />
        <ExploreTransportations />

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
            <div className="flex justify-center">
              <Input
                className="w-64 mr-2"
                placeholder="Enter your email"
                type="email"
              />
              <Button className="bg-primary hover:bg-hover text-white">
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
    </div>
  );
}
