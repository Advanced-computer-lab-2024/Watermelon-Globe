import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

import "./navTabsPending.scss"; // Make sure the path is correct

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

function LinkTab(props) {
  return (
    <Tab
      component={Link} // Use Link component from react-router-dom
      to={props.href} // Use `to` instead of `href` for navigation
      aria-current={props.selected && "page"}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

function NavTabsPending({ onTabChange }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(newValue); // Notify the parent component
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <Tab label="View Pending Sellers" />
        <Tab label="View Pending Advertisers" />
        <Tab label="View Pending Tour Guides" />
      </Tabs>
    </Box>
  );
}

export default NavTabsPending;

// export default function NavTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="nav tabs example"
//         role="navigation"
//       >
//         <LinkTab label="View Tourists" href="/tourists" />
//         <LinkTab label="View Sellers" href="/sellers" />
//         <LinkTab label="View Advertisers" href="/advertisers" />
//         <LinkTab label="View Tour Guides" href="/tour-guides" />
//       </Tabs>
//     </Box>
//   );
// }
