import "./featured.scss";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const [productRes, itineraryRes, activityRes] = await Promise.all([
          fetch("/api/Admin/productrevenue/"),
          fetch("/api/Admin/itineraryrevenue/"),
          fetch("/api/Admin/activityrevenue/"),
        ]);

        const productData = await productRes.json();
        const itineraryData = await itineraryRes.json();
        const activityData = await activityRes.json();

        // Make sure to parse the revenues as numbers, in case they come as strings
        const productRevenue = parseFloat(productData.totalRevenue) || 0;
        const itineraryRevenue = parseFloat(itineraryData.totalRevenue) || 0;
        const activityRevenue = parseFloat(activityData.totalRevenue) || 0;

        // Calculate the total revenue by summing the individual revenues
        const total = productRevenue + itineraryRevenue + activityRevenue;

        setTotalRevenue(total); // Update state with the total revenue
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${totalRevenue.toFixed(2)}</p> {/* Display the real total revenue here */}
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
