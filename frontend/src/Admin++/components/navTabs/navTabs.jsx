import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

import "./navTabs.scss"; // Make sure the path is correct

// Function to check if the click is on the same page link
function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

// Custom Tab component to handle navigation and prevent default behavior for same-page links
function LinkTab(props) {
  return (
    <Tab
      component={Link} // Use Link component from react-router-dom
      to={props.href} // Use `to` instead of `href` for navigation
      onClick={(event) => {
        // Prevent the default action if it's a same-page navigation
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // Only change the tab on click or when it’s the same page link
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="View Tourists" to="/tourists" />
        <LinkTab label="View Sellers" to="/sellers" />
        <LinkTab label="View Advertisers" to="/advertisers" />
        <LinkTab label="View Tour Guides" to="/tour-guides" />
      </Tabs>
    </Box>
  );
}
