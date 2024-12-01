import React, { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);

  // Function to fetch user data per month from the backend
  const fetchUsersPerMonth = async () => {
    try {
      const response = await axios.get("/api/Admin/getUsersPerMonth");
      const usersData = response.data;

      // Map the response data to match the chart format
      const formattedData = usersData.map((monthData) => ({
        name: getMonthName(monthData.month), // Convert numeric month to month name
        Total: monthData.totalUsers, // Sum of tourists, sellers, advertisers, and tour guides
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Helper function to convert month number to month name
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return monthNames[monthNumber - 1]; // Since monthNumber is 1-based
  };

  // Use useEffect to call the function on component mount
  useEffect(() => {
    fetchUsersPerMonth();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7b7b" stopOpacity={0.8} /> {/* Green */}
              <stop offset="95%" stopColor="#ff7b7b" stopOpacity={0} /> {/* Green */}
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#ff545e" /* Green */
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
