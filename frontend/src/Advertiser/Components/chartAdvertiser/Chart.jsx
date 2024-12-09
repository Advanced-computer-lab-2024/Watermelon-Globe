import React, { useEffect, useState } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import axios from "axios";
import { useParams } from "react-router-dom";

const Chart = ({ aspect, title }) => {
  const [data, setData] = useState([]);
  const {id} = useParams();

  // Function to fetch yearly revenue data from the backend
  const fetchYearlyRevenue = async () => { 
    try {
      const response = await axios.get(`/api/Advertiser/advertiserMonthlyRevenue/${id}`);
      const revenueData = response.data.data;

      // The data is already formatted correctly from the backend, so we can use it directly
      setData(revenueData);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  // Use useEffect to call the function on component mount
  useEffect(() => {
    fetchYearlyRevenue();
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
            <linearGradient id="totalRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#91c297" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#91c297" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="monthName" stroke="gray" />
          <YAxis stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalRevenue"
            stroke="green"
            fillOpacity={1}
            fill="url(#totalRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

