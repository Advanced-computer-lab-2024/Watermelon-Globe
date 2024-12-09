import React, { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";

interface Notification {
  _id: string;
  message: string;
  date: string;
  read: boolean;
}

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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/tourist/notifications/${id}`);
        const data = await response.json();
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const checkUpcomingEvents = async () => {
      try {
        const response = await fetch("/api/Tourist/checkUpcomingEvents", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to check upcoming events");
        }
        // After checking events, fetch notifications again to get any new ones
        await fetchNotifications();
      } catch (error) {
        console.error("Error checking upcoming events:", error);
      }
    };

    if (isOpen) {
      checkUpcomingEvents();
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

  const removeNotification = async (notificationId: string) => {
    try {
      const response = await fetch(
        `/api/Tourist/removeNotification/${id}/${notificationId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setNotifications(
          notifications.filter(
            (notification) => notification._id !== notificationId
          )
        );
      } else {
        console.error("Failed to remove notification");
      }
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  };

  const removeAllNotifications = async () => {
    try {
      const response = await fetch(
        `/api/Tourist/removeAllNotifications/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setNotifications([]);
      } else {
        console.error("Failed to remove all notifications");
      }
    } catch (error) {
      console.error("Error removing all notifications:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={boxRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 border border-gray-200"
      style={{ top: "100%" }}
    >
      <div className="py-3 px-4 bg-[#d688a2] text-white font-semibold rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-[#E62E5C] p-1 rounded flex items-center justify-center"
          style={{ width: "auto", height: "auto" }}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="px-4 py-3 border-b border-gray-200 hover:bg-[#FFF0F5] transition-colors duration-150 ease-in-out flex justify-between items-start"
            >
              <div>
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification._id)}
                className="text-gray-500 hover:text-red-500 transition-colors duration-150 ease-in-out"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">
            No new notifications
          </div>
        )}
      </div>
      {notifications.length > 0 && (
        <div className="py-2 px-4 bg-gray-50 rounded-b-lg flex justify-between items-center">
          <button
            className="text-sm text-green-600 hover:text-green-800 font-medium"
            onClick={() => removeAllNotifications()}
          >
            Mark all as read
          </button>
          <button
            className="text-sm text-red-600 hover:text-red-800 font-medium"
            onClick={() => removeAllNotifications()}
          >
            Remove all
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsBox;
