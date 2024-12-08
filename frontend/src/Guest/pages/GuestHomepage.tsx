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
import { Calendar, MapPin, Hotel, Plane, Search, Star } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa"; // Import icons from react-icons
import profileIcon from "../../Assets/Profile.png";
import ExploreTrips from "../Components/ExploreTrips";
import ExploreActivities from "../Components/ExploreActivities.jsx";
import ExploreHistoricalSites from "../Components/ExploreHistoricalSites.jsx";
import ForYou from "../Components/ForYou.jsx";
import ExploreTransportations from "../Components/ExploreTransportations.jsx";
import Modal from "../Components/Modal"; // Import a reusable modal component

export default function DraftHomePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "1- Use the 'Discover' button to find amazing destinations.",
    "2- Search for hotels, flights, or guides using the top navigation.",
    "3- Click 'Explore' to dive deeper into your favorite spots.",
    "4- Sign up to create personalized travel plans and access special offers.",
    "5- Stay connected through our social media channels for updates!",
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", { destination, dates, guests });
  };

  const handleSignUpRedirect = () => {
    navigate(`/tourist-signup`);
  };

  const handleButtonClick = () => {
    setCurrentStep(0); // Ensure the steps array starts from the first step
    setShowModal(true); // Show the modal
  };

  const openHowToUse = () => {
    setShowModal(true); // Show the "How to Use" modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1); // Go to the next step
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Go back to the previous step
    }
  };

  const handleFinish = () => {
    setShowModal(false); // Close the modal
    setCurrentStep(0); // Reset to the first step for the next time the modal is opened
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      style={{ margin: "-20px" }}
    >
      <header className="bg-sectionBackground shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center ">
          {/* Logo Section */}
          <div className="text-3xl font-bold text-secondary">
            <Link
              to="/Homepage"
              className="homeButton hover:text-secondaryHover"
            >
              WaterMelon Globe
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={handleButtonClick}
              className="text-secondary hover:text-secondaryHover relative group no-underline"
            >
              Hotel
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full group-hover:mb--1"></span>
            </button>
            <button
              onClick={handleButtonClick}
              className="text-secondary hover:text-secondaryHover relative group no-underline"
            >
              Flight
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full group-hover:mb--1"></span>
            </button>
            <button
              onClick={handleButtonClick}
              className="text-secondary hover:text-secondaryHover relative group no-underline"
            >
              Products
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full group-hover:mb--1"></span>
            </button>
            <button
              onClick={openHowToUse}
              className="text-secondary hover:text-secondaryHover relative group no-underline"
            >
              How to Use
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* Actions Section */}
          <div className="flex items-center space-x-2">
            <button className="px-4 py-1 border border-lightGray rounded text-secondary hover:bg-secondaryHover hover:text-white transition-colors">
              EN
            </button>
            <button
              onClick={() => navigate("/AllLogin")} // Redirect to AllLogin page
              className="px-4 py-1 border border-lightGray rounded text-secondary hover:bg-secondaryHover hover:text-white transition-colors"
            >
              Login
            </button>
            <button
              // onClick={handleButtonClick}
              onClick={() => navigate("/tourist-signup")}
              className="px-4 py-1 border border-lightGray rounded text-secondary hover:bg-secondaryHover hover:text-white transition-colors"
            >
              Sign Up
            </button>
            {/* Profile Button */}
            {/* <button
              onClick={handleViewDetails}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-white hover:border-secondary transition-colors"
            >
              <img
                src={profileIcon}
                alt="Profile Icon"
                className="w-6 h-6 rounded-full object-cover"
              />
            </button> */}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section
          className="py-20 shadow-lg"
          style={{
            backgroundImage:
              "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUQExMVFRUVFhUXFxYXFhcXFRgWGBkYFxcYFRgYHSggGBomHRYYITEiJykvLi4uGh8zODUtNygtLisBCgoKDg0OGxAQGyshICYtLS0tLSstLSsrLS8tLy0tLy0tLS0tLS0tLS0tLS0tLS0tLSstLSstLS0tLS0tLS0tLf/AABEIAJ0BQgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EAEAQAAEDAgQDBgQDBwIFBQAAAAEAAgMEEQUSITFBUWEGEyJxgZEyobHBQlLwFCMzYnLR4bLSFUPC4vEkVJKTov/EABkBAAMBAQEAAAAAAAAAAAAAAAABAwQCBf/EAC8RAAICAQMDAwIFBAMAAAAAAAABAgMRBCExEkFhEyJRBXEUMpGh0UKxweEzU4H/2gAMAwEAAhEDEQA/AP1BERRPWM72kjxGSWGOkfHFCdZpSGueNfha1wPD57kDe+nkyNLuQXRQ8VdaM9SB9/shvCHCOZJHamqWyC434jiF2WSnrhCx0xJDWAkkC5sNzYbhT8Sx50dPJJHGZJWtuyNoJznQCwGpte5A1sCuIzzyVtpcN1wXyKt7Oy1D6aJ9SA2ZzbvaBYAkkgW4ENsD1VkuyAWdwzCqyGtmlNR3tLKC4RvJzxPuLBgtYNtcaEcNOK0SIDAREQMzGOkmU8gAPv8AdVwC009SbkPpMwubOadSOBJa6+y4iZnCik9XOt8yFKVLbzkpX9Zrrj0OEtvBnjQiRzXFjS5l8hIBc2++U7hWcODv+J4yN5uu0fPU+gVtHU1O0cUUA56X+V15GF5zmmkdKeR0Z7bn1K6VMVyyc/ql9m1VfT5ZwhlL2mKm0YdHzEb9Gjj5D1KsqOlbE3K3zJOpJ4kniV2a0AWAsBsBsvqp4M1VHTJzm8yfL/gIiJGkIiIAIiiVmJwwvjikka18xLY2ndxHAf5QIloiIGZ7E4K9tbDLC9rqUgMmhOUFupvI0kXJ1HHhaxurypnZG0ueQAOf0HMrxW1TYmF7vIAbk8AOqr4YgSKiqOu8cQ4Dh5f1cU15Ml1zjLorWZPt/lntkk9RcsHcxjeR1s1vXRvzK4ZaWI3IdM7i5xsCfM3cVGxPF3Sm2gaNmj4R5DieqrCVKV2Pym3T/Ruv36l9T+OxqKHE2SOyNY1mhOl7nbcndWCyeESZZmdTb3FlrE4SclllL9PCiSjBYWAiIuyJXVLQyQk6MmAY48GvHwOP09Oqz1XTmNxa4WIK108Qe0tcLgixVXURAgQzGzhpFKdnDgx/I/rZc2Q6l5ONPqPwlr6vyS58P+GZekxmA1BpWlzpgCXWacrbC+rtuI9SAplT3ofcFvd5LWt4zJfe/wCXKLeq9GmML3eCxPxGwBPIk8V7jPeSMbzcB89Vn8HtrL9zeVyaqljysa3k0D5KjxntDJDWU1FFCZXTeKR1yBHFe2a9rcCdeVtytCvllqPGeWEX1EAEREDCqe0T7MA5n/H3Vss/2jl8QZyF1xY8RL6WObURIHXaFxr6lkYbne1hc4BpJtd3AAniq7D6V7KmSUyEskaxoZwaW319b/NWWI4fFUM7uVge24NjfcbEEagqCPQlldi1wvGPwSaHg7/dy81dgrIzQC1wpGGYqY/C7Vnzb5dOipGzGzM92lyuqv8AQ0yLzHIHAOBuDxXpWMARFncGrsRdUyRVNNE2ABxjmjfe+oygguJJIvwFrIFk0SIiACIiAC4z1LI/jc1t9rkC/lzXZQcUqjE0PDGu1t4mh1r8r7bIzjkTjOW0OfJQOqJhiYmbO00j4Mr2lxs2RpNi1pG5uNRwvfYLUQzsf8Lmu/pIP0VA/GZna2bb+htv9K+RV0T/AOLEL8Hs8Dx5Eafrdc+pEb0msgs4i/Ce5pUVZDM5ozRv7+Mbg6TNHP8AnH6up9PO2Roc03B/VjyPRdkoWqT6Wmn8Pk6KpxTAIqmop6l981MXOYB8JLrfF5FoIVsiRUIUVdjkxDBG34pCGC29t3H209U0idtirg5PsRonCZzql4vFHpG07OcePr9B1VTWVLpHEkk3OvX/AB0Vzj5ELGU7fwi7rfmd/YKmowNTxUbpZfSjZ9J0/RU7pr3S3MvieNSwV0MBYDFLlGxzXcbFwN/wkjTldaOWPKbKTPSseWlzGuLDmaSLlp5g8F9nZmHXgpNLB6NcpRk23sRI3WII4EH2W1BX55g8s5Z/6hgbI17gbfCQDo4anQhb2hfmjaen00VKtsoza33KMkd0RFYwBeJYmvBa4Ag7g7L2iBNJ7MrnUb2aMLZG8I5dbf0v3H61SnhYXgmndG4a3zBzOXU8VYomRjT0P2SaXxnb9AiIkXCIiACKnjp3Zi9taCSALPuGacmkAA9RqrZgNhfe2vnxTI12uTw4uP3PSyeMPvM/pYewC1hWLqHXe483E+5UbuD09Ave34PDTY3VFjOOyx4jT07f4bmguH5s5cL+mUeqvF7bSlxByi4uGkjUX3y8QoxeDdfDqS3wd31I4L7h1C6Z4aBufTzPRSIcGfu8ZG83eEfPU+QClx1BcDDTDQ6PmIsPIf7R6qsK3Lng87WfUq6F0Ve6b7IlSVDWPZTQAPI1keeXE3Hy/V7BRqGibC2w1J1c47uPM/2UlXfg83TwsSbseW9wiIkaAiIgAiIgAoOMx5oXdLH2N1E7URVzo2/sL4mSB13d4LgttsNDbW3BTqRkroQ2fJ3pZZ/d3yZjvlza2Q1lDhLpkmZ2meCMtxcC5F9bXOtuWh9lT4fhT4XzSyzGR8z7gahjGi9g0etr9ArWmo2td3uXxloYXccoJcB7uKit710jw5otmAjsSXEW1LuA14LK+D11hzyztT1DoyHNNiOS09HGCRMAWF7fGywDS7g8DgbKHhWEZfHINeDeXn1VyrVRcUefrXVbNNLddwiIqGcL45t/19F9RAms8mepcAl8ff1TpiXkscWNa4M4B9vjPXRcZ8HlZqLO8t/ZadFzKCZevUTrWFwYXEo3yRuizvicbWezwvbY309rKXh7XNja17+8cAAX2ylxHEgbFauaBrxZwBHUXUCTBmbsJb03Hz1U/TaNC1MG8tYf7FPUNu09Fd4K793bkVVxYKYA5rG+Euc42JIu43dYHa51sNNSp2DmznN6X9v/ACiCxILpKdWxbIiKxhCz2CYrUzVtXFJEWQQ5GxOLSM7tczg4/EDpttpzWhRMWAiLy+QNBJIAG5OgHmkDeD0s7i3aSSnqo6c0kz4pA39/GC8NcSRYta3YaXN+OyshiBkNoI3SfzfCz3tc+y+SMqB8c0MX8o8Tvv8ARdYMr1cG8QzL7LJYoqnX/wB4P/q/7ES2+R+vZ/1T/RfyUVM0l7W83AfNbNZTB2Xmb0ufYH72WrUaeD19c/el4PMr8oJsTYE2G5twCqH1tMfip5WHpn+7Vcorbdzy7IWNpwm4/YpGVdMPhgmf08f2apUdfPtBTtiB/E6wPre5PsrFELC4RKWmsn/yWSf7FWMMdIc08hk/lFw314keyso4w0BoAAGwAsB5L0iMlqqK6l7UEREiwXy651VQ2Npe42A/QA6qBSZheqnJbcFscYPDl/cp4IWXqM1BLLfZf3JddXxQND5ZGxtLg0FxABcdhc8VJVBj+Ew4rTdy5xAzNdcbtc36ggkeqvmttpySLNNPDPqIiBhERAjNVFJaV+UeJxAvxIFy0emY+6tsOw0ReI6uPHl5KYIgCXW1PFQaPG4JZ5aVjrywhpeLEAZuR2O491yoJPJad7celbIsURF0RCIiBhERABEWd7O9oZKioqaWaEwyQOBbqSHxOJDXC46cNNUCyaJERAwvmUb8V9RAgiLm+drXBpc0OdfK0kAutvlHGyAOiIiBkesq2xNzO8gBu48gqyqbYCSo1cdWQgnK0cC/mfn5KzfA0P7/ACl7mtsxpPhBve9v1sFlqud0jy55Nydb79VzOfStuTijSS1Nr9T8i7fP3O9TjUlj4srACSAcrQBvoLBV8FWJWCRjw5jrkOB0NjY7dQpVXRNkjfEdA9rm3G4uLXHVQMHwkUlMyDNmy3JdtcuJJsOA1UHlrLZ7VajCSjCKSO6Iimai57OM8TjyFlfrJYlS1JoZxSOLZ/CWlpAccpBcGk7Ei4C0mG953Mfe/wATu2d5b8+UZvnda617TxNTPqtZJREXREIiIAIqCs7WQQ1jKGVsjHyBvdvLR3Ty7QBpBve+m26v0CyFQ9oe08dDNTxysdknLm96PhY4ZbBw65ufDYq+UPFSwROe5rXZPE0OAIzj4SL8b21TFNqKbZGc0VExDj+5guXdXDf22HUlVWK1xleTsNgOAA2aFZSN/Z6RrfxSkvdzIHPzcbrPhRvl/Siv0ajqT1E+ZcfY70dU6J2ZvqOBHIrVUdU2VuZvqOIPIrHKTh9WYn3Gx0I4FTrn07M9TU6ZWLqXJr0XOCYPGYbLotJ5AREQAVfQ4NDDNNUMbaSctMhvf4RYAchx8yrBECCIiBmdx+vxFk8cdLSskiOXPK+QC2viGW4IsNb6+XPRIiYgiIkMIiIAIiIAIiIAKh7Tdloa8xPe58ckLs0cjCMwNwbaixFwCr5ECAREQAVfiWGNl8Q0fz4HzVgiGk9mdRk4vMTEYj+0RscyPKJRbL3gOTfY24EX1UyRhewtOhcLGx2JGtj0WjraNsos4a8DxCoKumljcweEtucxN7kW8Jb1va4PA9NYODRvrvjPnZlHS4M9jGs7x7srWtzX3sLX9V8V2XHkiWWaML4NDRQGNuU8yVIRFoWx47eXlhERABERAHh8LXEEtBLTdpIBIPME7Fe0RAgqvHjdrGfmkb7C7vsFaFVmK/xKfl3jvoulyZda8USK/tBPeQs4M8A8m6fW5WJxenxBlQ2op3Oki8IdFmGUAWzeFxAN9dRqFsceZlmeP53/AFv90ZsPJZW/e2e9CuP4eEY7bLg8OiDhcixVZT4TKyZ8nfl0b9o3D4HfyOvoLcLLvjFXNGG9zE2VxdZwMgYGjnc7qcx9xwvxsb2KWCibzj4PVBUOhdbcHhwWkhlDxmGyylO57i4PYG2cQ2zs2Zo2doBY9Fb0EUrTcN0O4Oi7g2tjLqYxl7uGWz3AAkkAAXJOgAG5JXChrY52CWJ7ZGG9nNIc02NjqOoXLGMPbVQSU7nOa2RpaS2wdY72uDw09UwfC4qSFlPC3KxgNhe5JJuSTxJJJVzCTUREhhERABERABZ7BqKuiq5zLKJaWS747nxxOvowC3w2JHoNje+hRAgiIgYRF5e8NBJIAG5OgCBN4OOI1XcxPmLXPyMc7KwXe7KL2aOJVb2WxmWsiM0lM6nBdZjXOu5zfzWsLDh+tZAxF8py08ZefzG4Z6cSPZeZ6Z4/j1WQ/kj3HQ5dfmusGR6tOXTWnJ+P5LRFRCGj/E6d3UkfdxVrQMjawCLNlubZt78VzldmVhK7Pvg4okIiILGd7HSV2WWOtb4mSuEcnh/eR7g+Hlz00PMFaJEQCCz+Ndk4qqeOqMs8b47C0clmuAN7FpBAvsbWvfVaBEAVxwkfmKKxRLpRX1Z/IXJlQ0vLAbloBNr2F+Z2v0XGumcMrGaySHK3pzd6fUhVNbWiJvcRHQG7n/ie7i4nlfb3Tk1FZZnh123enX25fx/s0KKuwnERKMrtHjfr1CsUJ5WUWnBwfSwiKm7V09XLAY6N7Y5HOAL3EjIzXMW2B8Ww9Sg4LlFFwunfFDHG+QyvYxrXSHd7gLFx8ypSACq8dFhG/wDLIP8A9Aj6kK0XiWJrxlcARpodtDcfNNMlfX6lbh8lT2qhvLmaCc7WuFhzFvsq2HC5nfhsOuny3WqH0X1TdabybadVOutQ+O5Qw4AfxP8AQD7n+ynQ4PC38ObzP22VgiahFdjmd9kuWeWRhugAHkLL0iLokEREAEReJZWttmIFyAL8zsmJtJZZ7XOokytJFr2NrmwJ4AngFU4rir43mNrbEEgk6+wVJNM55u5xPn9uSlK1LY2U6SViy3hErB+0NU4P/aYImG9mCN5eTvfNwttbX0Cnx1b5HtBJAuNNgqXD4ZA973ubkNhG0NsQPxFxJ1JKs8OjHfh2tyNdTYBuYiw2Bu7fjpyXKk2ykqYQi8LfyaNEVZ2ixf8AY4HT91JKGkeGMXdqbX8grHnlmigYHirKyFlQwPa134XtyuBGhBH3GinlAZOFXUtiaXuOnDmTwAHEqqmBeBLUaNOrIQdx+Zx+/sF3pQJi6qlH7qPSNn5j5cz9PVU9fVOmeSeJ9PToEpy6F5Iaah66bztWv3/0SqjHHluRlmN5N8I9TufdVsjyd1Hx3DHS00sbD43MIbwBO9vW1vVR+zVFJFRRMlvnaDcHcAuJDT5Ageizyy1ls96qNdUlCEcImrT4EP3LfN3+orMLVYKP3LPX6lOnkWv/ACL7k5Fna3BZziUFYyUiFsT45Y7nXR2WzdjckE8fCPTRLQeSEREDCIiACIiAKaGpJbLUuaWmwiY0kEtNryajS4OYXHRURBNyp1W4iCEfmBefNzjf/SFSM7PNFU2tZI5jyLPaNWSNtYA8uHso27yx8Gj6XF16dW4y5vLJrHlpDgbEbFarDa4St/mG4WZr8PinGR4vZzXaEtIcNQQWm4KkRNMbg5pO65g+k23wVq+H2NUij0dUJB14j9cFIWhPJ5TTTwwiIgAs7jXZl09TFVR1U0LmFuZrSSx7Qb2ykgNJ2vqOi0SIEEREDCIo1NWNeS3Ygn1HMIBJskoiIAKBjcNQ+F7aaVsUp+F7m5wPT72Pkp6IEVfZuGqZAG1kjJJrm7mCzcvAbC562H3U2spxIwsPEaHkdwfQgFd0TFKKksMoa2F07S6372MBsg5gbPHMEW+R5rO4lVmCN0gjdK5trRt3cSQBwOmtz0C2tVTEuEsZyyN2PAj8run0VXWQNmPhb3co+KI7HrGdiOntyUrK8+5Hej1joXoWvC/pl/h+SqwqaSWFrpo+6e4G7AbloO2vO2vRTeytI2JwjbfLHHlBJubCwFzxOijlkkfhII6Eaqz7Ns+Nx/lH1U4/mR6VqUam852wXiIi0HlhERAEevpu9ZkzEWuRyueYWYqaR8LvEPIjYrXrzIwOFiAQeB2XE4KRoovdWy4MhUV7I43SvNmsBc7QmwG5sNSutNOyZgkY4OY8XBGxBU+vwTd0X/xP2P2KrQ5kMZJAjbGCXC1g0DUmwGnNSaa2ZtjZGe8Xt8dyroo52ulE1iO8PdEW/h2BF7dbjXXRbvDhaNvks1LZwaRqDYgjYgi9/Ky01F/Db5BdV8sjq37Io7oiKxhCIiACr8er5KeB8scLp3ttaNpsXXIG9joL32OysEKBGLj7XVxAP/CKjUD/AJjfu0FFrnVDQbIgn1r5KKtZelgdyDmnzDr/APUVFhbK7RrCetjb32WpZC1osALXJtwudyvUbw4XBBHMG4XEoZlk06S6VFEamk8GYouzzmvfIGRsdJYvdYZnW2vb+6s4cDYHF5PiIAJAsSBewO+mp91bImoJDlfN+PscIKVjNWjXncruiLok23uwigUGMwTyywRyBz4CBIAD4Sb21IsdiNNrKegQREQMIiIA8TOs0nkCVmRJvbhy59FfYm+0bvZZmlnbfISMxuQL6kC1yB0uPcKVj3SNulj7Wy5wjFxIxheHNzgEZhldqPheODlcLGYxXRwRGSUkMu0F1ibEmwJtwv8AVWOF4vlsx5u3g7ew4eYRGzszmzT94f8AqNEi+NcCLjUL6qmQIomK4lFSxOnmcWxstmIa51rmw0aCeK84TisNXGJoHh7CSLi+hG4IOoPRAiauNTTMkFntB5cx5Eaj0XZEClFSWGQmwTMFmS3b+SVoePQ8PZd6bNbxtjab/wDLFgep0Gq7InklDTwg8xyvGdv0CIiRcIiIAzuL12ICqihpqZhgu0yzyOFrE+INaHAggcbG5O1gtEiIFgKPVUjZNxrzG6kLlJUsa5rHPaHPvlaXAOdbfKDqfRA08bopaihdHwu0bECwHpwVzSfA3+kfRdiF8AskopFJ2uaSZ9UbEK+KnjdNM8MY3dzjoOA8yTpYKSomKYbDVRmKZgkYSDlN7XBuDomSGFYlFVRNnhdmjdfK6xF7Eg6OAO4KlrnBC2NoYxoa1oAa0CwAGgAA2C6IAIiIAivpLkm+5RSkQcenEEKg7N9lY6CSd8UkmSYh3dEjIw3JOX3t5Dir9EHeAiIgYREQBWYNgMFIZXRNIdNI6SRxN3OcSTa/BozGw6lWaIgQREQMIiIAqe0U1mNb+Y/ID/KyrqJhmZUG+eMOaNdLOte49Ff9pHeNo/lv7n/CqFmsfuPX0kF6Kz9yfIGnwusb30Nteeh3XmaEOHUbLFdqqh//ABChAcQNDYbXLiD7jTyuta+oJ02RLgVbcpNLsSsMxJ0Ry/E3ly8lp43hwBGx2VD2coGyyAO2sSRztwU6krHzTv1ysjDWhg211Htb5+itUn05Z5n1DUVwvjXFbvksJIw4FrgCCLEEXBB3BB3C40NDFAzu4Y2RsuTlY0Nbc7mw4qQi7JhERAwiIgClxHtLDT1cNHIHNdO28b7DIXXtkOtwdvcK6UeooopCxz42PdG7MwuaCWO5tJ2PkpCYkEREhhEVdjGJ/s4By5r9bfZM4nNQXUyxVH2n7LQ1/dmQvY+I5o5IyA9puDxBB1aPZSsDxB07XOcGixFgL9d7nVWSDmuyNseqPB8C+oiRQL4SotVUkMlc3Qxlo11vmF1mJ6p8nxOJ6cPbZcTn0l9PQ78tPbg0s+KRM/ED0bqoD8Yc/wCFuUc+Kz1TC6RuRrzGSR4gASBcXsHaajRWUkIcwsN7EWOpBttuFP1GzZ+GhDbll1Qvd3Tn2L3eIgXtcgaNudrnRQey1fXTh7qynZTi47tocXPI45hcgcNdL66c7XDB+6b1F/clSlaPB5095MIiJiP/2Q==')",
          }}
        >
          <div className="container bg-gradient-to-r from-primary/10 to-secondary/10 mx-auto  border border-lightGray rounded-lg shadow-lg p-10">
            <h2 className="text-4xl font-bold mb-8 text-center text-secondary">
              Discover Your Perfect Getaway
            </h2>
            <p className="text-lg leading-relaxed text-grayText mb-6 text-center">
              Welcome to your ultimate travel companion. Whether you're dreaming
              of serene beaches, bustling cityscapes, or breathtaking mountain
              views, we’re here to make your journey unforgettable.
            </p>
            <p className="text-lg leading-relaxed text-grayText mb-6 text-center">
              With a wide selection of hotels, tours, and flights, your next
              adventure is just a few clicks away. Connect with local guides,
              explore hidden gems, and create stories that last a lifetime.
            </p>
            <p className="text-lg font-medium text-grayText italic mb-8 text-center">
              Let your wanderlust guide you as you uncover the wonders of the
              world.
            </p>
            <p className="text-xl font-semibold text-center text-secondary mt-6">
              "Slice through the world, one sweet adventure at a time."
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container bg-gradient-to-r from-primary/10 to-secondary/10 mx-auto  border border-lightGray rounded-lg shadow-lg p-10">
            <h3 className="text-3xl font-bold text-center mb-12 text-secondary">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Bali, Indonesia",
                  image:
                    "https://www.outlooktravelmag.com/media/bali-1-1582544096.profileImage.2x-1536x884.webp",
                },
                {
                  name: "Paris, France",
                  image:
                    "https://media.timeout.com/images/106181719/750/562/image.jpg",
                },
                {
                  name: "Santorini, Greece",
                  image:
                    "https://lp-cms-production.imgix.net/2024-06/iStock-166471469.jpg",
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

      {/* How to Use Modal */}
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-lg relative">
            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-center text-primary mb-4">
              How to Use WaterMelon Globe
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Learn how to navigate and explore our features with this simple
              guide.
            </p>

            {/* Step Content */}
            <div className="text-gray-600 text-center mb-6">
              <p>{steps[currentStep]}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
              <Button
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className={`py-2 px-4 rounded-lg font-semibold transition ${
                  currentStep === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-secondary text-white hover:bg-primary"
                }`}
              >
                Back
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleFinish}
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
