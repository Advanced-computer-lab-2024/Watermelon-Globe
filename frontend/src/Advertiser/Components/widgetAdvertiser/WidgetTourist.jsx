import "./widget.scss";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useParams } from "react-router-dom";



const Widget = ({ type }) => {
  const [productRevenue, setProductRevenue] = useState(0); // State for product revenue
  const [itineraryRevenue, setItineraryRevenue] = useState(0); // State for itinerary revenue
  const [activityRevenue, setActivityRevenue] = useState(0); // State for activity revenue
  const [totalUsers, setTotalUsers] = useState(0); // State for total users
  
  const {id} = useParams();

  // Fetch product revenue from the backend API
  useEffect(() => {
    if (type === "product") {
      const fetchProductRevenue = async () => {
        try {
          const response = await fetch("/api/Admin/productrevenue/");
          const data = await response.json();
          setProductRevenue(data.totalRevenue); // Update the state with the fetched revenue
        } catch (error) {
          console.error("Error fetching product revenue:", error);
        }
      };

      fetchProductRevenue();
    }
  }, [type]);

  // Fetch itinerary revenue from the backend API
  useEffect(() => {
    if (type === "itinerary") {
      const fetchItineraryRevenue = async () => {
        try {
          const response = await fetch("/api/Admin/itineraryrevenue/");
          const data = await response.json();
          setItineraryRevenue(data.totalRevenue); // Update the state with the fetched revenue
        } catch (error) {
          console.error("Error fetching itinerary revenue:", error);
        }
      };

      fetchItineraryRevenue();
    }
  }, [type]);

  // Fetch itinerary revenue from the backend API
  useEffect(() => {
    if (type === "activity") {
      const fetchActivityRevenue = async () => {
        try {
          const response = await fetch("/api/Admin/activityrevenue/");
          const data = await response.json();
          setActivityRevenue(data.totalRevenue); // Update the state with the fetched revenue
        } catch (error) {
          console.error("Error fetching activity revenue:", error);
        }
      };

      fetchActivityRevenue();
    }
  }, [type]);

  // Fetch itinerary revenue from the backend API
  useEffect(() => {
    if (type === "user") {
      const fetchTotalUsers = async () => {
        try {
          const response = await fetch(`/api/Advertiser/getTotalTouristsForActivity/${id}`);
          const data = await response.json();
          setTotalUsers(data.uniqueTouristsCount); // Update the state with the fetched users
        } catch (error) {
          console.error("Error fetching total users:", error);
        }
      };

      fetchTotalUsers();
    }
  }, [type]);

  let data;
  const diff = 20; // Placeholder for the difference (adjust as needed)

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCT REVENUE",
        isMoney: true,
        link: "View all orders",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "itinerary":
      data = {
        title: "ITINERARY REVENUE",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "activity":
      data = {
        title: "ACTIVITY REVENUE",
        isMoney: true,
        link: "See details",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}{" "}
          {type === "product"
            ? productRevenue //Show fetched product revenue
            : type === "itinerary"
              ? itineraryRevenue //Show fetched activity revenue
              : type === "activity"
                ? activityRevenue
                : ""}{" "}
          {/* Show fetched itinerary revenue */}
          {!data.isMoney} {type === "user" ? totalUsers : ""}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
