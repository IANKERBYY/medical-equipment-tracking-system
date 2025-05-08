import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native-web';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/mockData';

const HomeScreen = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [recentNotifications, setRecentNotifications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);
    setRecentNotifications(notifications.slice(0, 3));
  }, [navigate]);

  const renderRoleSpecificOptions = () => {
    if (!currentUser) return null;

    const commonClasses = "hover-scale flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg transition-all duration-200";

    switch (currentUser.role) {
      case 'nurse':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              className={`${commonClasses} bg-gradient-to-r from-blue-500 to-blue-600`}
              onClick={() => navigate('/scanner')}
            >
              <i className="fas fa-qrcode text-4xl text-white mb-4"></i>
              <span className="text-white text-xl font-semibold">Scan Equipment</span>
            </button>
            <button
              className={`${commonClasses} bg-gradient-to-r from-green-500 to-green-600`}
              onClick={() => navigate('/maintenance/report')}
            >
              <i className="fas fa-clipboard-list text-4xl text-white mb-4"></i>
              <span className="text-white text-xl font-semibold">Report Issue</span>
            </button>
          </div>
        );

      case 'technician':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              className={`${commonClasses} bg-gradient-to-r from-orange-500 to-orange-600`}
              onClick={() => navigate('/repair/tracking')}
            >
              <i className="fas fa-tools text-4xl text-white mb-4"></i>
              <span className="text-white text-xl font-semibold">Active Repairs</span>
            </button>
            <button
              className={`${commonClasses} bg-gradient-to-r from-blue-500 to-blue-600`}
              onClick={() => navigate('/scanner')}
            >
              <i className="fas fa-qrcode text-4xl text-white mb-4"></i>
              <span className="text-white text-xl font-semibold">Scan Equipment</span>
            </button>
          </div>
        );

      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              className={`${commonClasses} bg-gradient-to-r from-purple-500 to-purple-600`}
              onClick={() => navigate('/admin/dashboard')}
            >
              <i className="fas fa-chart-line text-4xl text-white mb-4"></i>
              <span className="text-white text-xl font-semibold">Dashboard</span>
            </button>
            <button
              className={`${commonClasses} bg-gradient-to-r from-blue-500 to-blue-600`}
              onClick={() => navigate('/scanner')}
            >
              <i className="fas fa-qrcode text-4xl text-white mb-4"></i>
              <span className="text-white text-xl font-semibold">Scan Equipment</span>
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {currentUser?.name}
            </h1>
            <p className="text-lg text-gray-600 capitalize flex items-center">
              <i className={`fas fa-${currentUser?.role === 'admin' ? 'user-shield' : currentUser?.role === 'nurse' ? 'user-nurse' : 'tools'} mr-2`}></i>
              {currentUser?.role} {currentUser?.department && `- ${currentUser.department}`}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('currentUser');
              navigate('/');
            }}
            className="hover-scale bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 rounded-xl shadow-md transition-all duration-200"
          >
            <span className="text-white font-semibold flex items-center">
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </span>
          </button>
        </div>
      </div>

      {/* Role-specific options */}
      <div className="mb-8">
        {renderRoleSpecificOptions()}
      </div>

      {/* Recent Notifications */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Notifications</h2>
          <button 
            onClick={() => navigate('/notifications')}
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-200"
          >
            View All <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
        <div className="space-y-4">
          {recentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="hover-scale bg-primary-50 rounded-xl p-4 border-l-4 border-primary-500 transition-all duration-200"
            >
              <p className="text-gray-800 font-semibold mb-1">{notification.message}</p>
              <p className="text-gray-500 text-sm flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i> {notification.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
