import React from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-color: ${(props) => props.color || "#ddd"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: 0.9em;
  color: #666;
`;

const Timestamp = styled.div`
  font-size: 0.8em;
  color: #999;
  margin-top: 4px;
`;

const NotificationDropdown = ({ notifications }) => {
  return (
    <DropdownContainer>
      {notifications.map((notification, index) => (
        <NotificationItem key={index}>
          <Icon color={getIconColor(notification.type)}>
            {getIconContent(notification.type)}
          </Icon>
          <Content>
            <Title>{notification.title}</Title>
            <Description>{notification.description}</Description>
            <Timestamp>{notification.timestamp}</Timestamp>
          </Content>
        </NotificationItem>
      ))}
    </DropdownContainer>
  );
};

const getIconColor = (type) => {
  switch (type) {
    case "custom":
      return "#FFD700";
    case "task":
      return "#4CAF50";
    case "notification":
      return "#2196F3";
    default:
      return "#ddd";
  }
};

const getIconContent = (type) => {
  switch (type) {
    case "custom":
      return "⚡";
    case "task":
      return "📄";
    case "notification":
      return "🔔";
    default:
      return "";
  }
};

export default NotificationDropdown;
