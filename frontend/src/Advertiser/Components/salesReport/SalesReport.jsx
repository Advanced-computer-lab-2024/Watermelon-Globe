// SalesReportPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SalesReport.css";

const SalesReportPage = ({ advertiserId }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesReport = async () => {
      try {
        const response = await axios.get(
          `/api/advertiser/sales-report/${advertiserId}`
        );
        setReport(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching report");
        setLoading(false);
      }
    };

    fetchSalesReport();
  }, [advertiserId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="sales-report">
      <h1>Sales Report</h1>
      <div className="report-summary">
        <h2>Summary</h2>
        <p><strong>Total Revenue:</strong> ${report.totalRevenue}</p>
        <p><strong>Total Bookings:</strong> {report.totalBookings}</p>
      </div>
      <div className="report-details">
        <h2>Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Total Revenue</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            {report.breakdown.map((activity, index) => (
              <tr key={index}>
                <td>{activity.activityName}</td>
                <td>${activity.totalRevenue}</td>
                <td>{activity.bookingCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReportPage;
