import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
      component="a"
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
  const [value, setValue] = React.useState(0); // State to manage the selected tab

  // Handle tab change and set the new selected tab value
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
        onChange={handleChange} // Handler to change the selected tab
        aria-label="nav tabs example" // Accessibility label for the tabs
        role="navigation" // Role for the navigation
      >
        <LinkTab label="Page One" href="/drafts" />
        <LinkTab label="Page Two" href="/trash" />
        <LinkTab label="Page Three" href="/spam" />
      </Tabs>
    </Box>
  );
}
