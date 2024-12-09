import "./featured.scss";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const Featured = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [filteredRevenue, setFilteredRevenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const {id} = useParams();

  useEffect(() => {
    fetchTotalRevenue();
  }, []);

  const fetchTotalRevenue = async () => {
    try {
      const [productRes, itineraryRes, activityRes] = await Promise.all([
        fetch(`/api/Seller/totalProductRevenueForSeller/${id}`),
      ]);

      const productData = await productRes.json();

      const productRevenue = parseFloat(productData.totalRevenue) || 0;

      const total = productRevenue;

      setTotalRevenue(total);
      setFilteredRevenue(null);
      setSelectedDate(null);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const fetchFilteredRevenue = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await fetch(`/api/Seller/filterRevenueByDateSeller/${id}?date=${formattedDate}`);
      const data = await response.json();
      setFilteredRevenue(data.totalRevenue);
      setSelectedDate(date);
    } catch (error) {
      console.error("Error fetching filtered revenue:", error);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      fetchFilteredRevenue(date);
    }
    setIsDatePickerOpen(false);
  };

  const resetToTotal = () => {
    setFilteredRevenue(null);
    setSelectedDate(null);
  };

  const displayRevenue = filteredRevenue !== null ? filteredRevenue : totalRevenue;
  const displayDate = selectedDate
    ? `Total sales made on ${selectedDate.toLocaleDateString()}`
    : "Total sales made today";

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={70}
            text={"70%"}
            strokeWidth={5}
            styles={{
              path: { stroke: "#91c297" },
              text: { fill: "#d32e65", fontSize: "22px" },
              trail: { stroke: "#e6e6e6" },
            }}
          />
        </div>
        <p className="title">{displayDate}</p>
        <p className="amount">${displayRevenue.toFixed(2)}</p>
        <p className="desc">Choose a date to filter the Revenue.</p>
        <div className="summary">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="date-picker-container">
              <Button
                variant="outlined"
                startIcon={<CalendarTodayIcon />}
                onClick={() => setIsDatePickerOpen(true)}
                className="calendar-button"
              >
                Select Date
              </Button>
              {isDatePickerOpen && (
                <DatePicker
                  open={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            </div>
          </LocalizationProvider>
          {selectedDate && (
            <Button
              variant="outlined"
              onClick={resetToTotal}
              className="reset-button"
            >
              Back to Total
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Featured;

