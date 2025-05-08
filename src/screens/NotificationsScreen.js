import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications as mockNotifications } from '../data/mockData';

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      <header className="mb-8 flex items-center">
        <button
          onClick={() => navigate('/home')}
          className="mr-4 text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          <i className="fas fa-arrow-left text-2xl"></i>
        </button>
        <h1 className="text-4xl font-bold text-primary-700">Notifications</h1>
      </header>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No notifications available.</p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded-xl shadow-md cursor-pointer transition-all duration-200 ${
                notif.read ? 'bg-gray-100' : 'bg-white'
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{notif.message}</p>
                {!notif.read && (
                  <span className="inline-block bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1 flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i> {notif.date}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsScreen;
