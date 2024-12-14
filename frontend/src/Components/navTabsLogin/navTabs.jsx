import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import TourIcon from "@mui/icons-material/TravelExplore";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import "./navTabs.scss"; // Ensure this path is correct

// LinkTab Component for navigation
function LinkTab(props) {
  return (
    <Tab
      component={Link} // Use Link component from react-router-dom
      to={props.href} // Navigation path
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  href: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

function NavTabsLogin({ onTabChange }) {
  const [value, setValue] = React.useState(0);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Set the tab value based on the current URL
    if (location.pathname === "/tourist-signup") {
      setValue(0);
    } else if (location.pathname === "/sign-in/advertisers") {
      setValue(1);
    } else if (location.pathname === "/sign-in/tour-guides") {
      setValue(2);
    } else if (location.pathname === "/sign-in/sellers") {
      setValue(3);
    }
  }, [location.pathname]); // Update the tab value when the URL changes

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // if (onTabChange) {
    //   onTabChange(newValue); // Notify the parent component
    // }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab
          label="As Tourist"
          href="/tourist-signup"
          icon={<PersonIcon />} // Add Person icon
        />

        <LinkTab
          label="As Advertisers"
          href="/sign-in/advertisers"
          icon={<LocalActivityRoundedIcon />} // Add Campaign icon
        />
        <LinkTab
          label="As Tour Guides"
          href="/sign-in/tour-guides"
          icon={<TourIcon />} // Add Tour (TravelExplore) icon
        />

        <LinkTab
          label="As Seller"
          href="/sign-in/sellers"
          icon={<StoreIcon />} // Add Store icon
        />
      </Tabs>
    </Box>
  );
}

export default NavTabsLogin;
