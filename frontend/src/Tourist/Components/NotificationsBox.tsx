import React, { useState, useEffect, useRef } from "react";

interface NotificationsBoxProps {
  id: string | undefined;
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsBox: React.FC<NotificationsBoxProps> = ({
  id,
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch(`/api/tourist/notifications/${id}`);
        const data = await response.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [id, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={boxRef}
      className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-20"
      style={{ top: "100%" }}
    >
      <div className="py-2 px-4 bg-gray-100 font-semibold border-b">
        Notifications
      </div>
      <ul className="py-2 max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-100">
              {notification}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">No new notifications</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationsBox;
