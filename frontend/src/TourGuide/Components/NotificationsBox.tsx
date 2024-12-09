
import React, { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";

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
        const response = await fetch(`/api/tourGuide/getNotificationsGuide/${id}`);
        const data = await response.json();

        if (Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        } else {
          console.warn("Invalid notifications data:", data.notifications);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]); // Fallback to empty array in case of error
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
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 border border-gray-200"
      style={{ top: "100%" }}
    >
      <div className="py-3 px-4 bg-[#d688a2] text-white font-semibold rounded-t-lg flex justify-between items-center">
        <div className="flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </div>
        {/* <button
          onClick={onClose}
          className="text-white hover:bg-[#E62E5C] p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button> */}

<button
  onClick={onClose}
  className="text-white hover:bg-[#E62E5C] p-1 rounded flex items-center justify-center"
  style={{ width: 'auto', height: 'auto' }}
>
  <X className="w-5 h-5" />
</button>

      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications?.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="px-4 py-3 border-b border-gray-200 hover:bg-[#FFF0F5] transition-colors duration-150 ease-in-out"
            >
              <p className="text-sm text-gray-800">{notification}</p>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-sm text-gray-500">
            No new notifications
          </div>
        )}
      </div>
      {notifications?.length > 0 && (
        <div className="py-2 px-4 bg-gray-50 rounded-b-lg">
          <button className="text-sm text-green-600 hover:text-green-800 font-medium">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsBox;
