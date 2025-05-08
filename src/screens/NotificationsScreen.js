import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native-web';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../data/mockData';

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return 'fas fa-tools text-blue-500';
      case 'repair':
        return 'fas fa-wrench text-orange-500';
      case 'alert':
        return 'fas fa-exclamation-triangle text-red-500';
      default:
        return 'fas fa-bell text-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(
    notification => filter === 'all' || notification.type === filter
  );

  return (
    <View className="min-h-screen bg-gray-100">
      {/* Header */}
      <View className="bg-white shadow-md p-4">
        <View className="flex flex-row items-center mb-4">
          <TouchableOpacity onPress={() => navigate('/home')} className="mr-4">
            <i className="fas fa-arrow-left text-2xl text-gray-600"></i>
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Notifications</Text>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row space-x-2">
            {['all', 'maintenance', 'repair', 'alert'].map((type) => (
              <TouchableOpacity
                key={type}
                className={`px-4 py-2 rounded-full ${
                  filter === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
                onPress={() => setFilter(type)}
              >
                <Text
                  className={`capitalize ${
                    filter === type ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView className="p-4">
        <View className="space-y-4">
          {filteredNotifications.map((notification) => (
            <View
              key={notification.id}
              className="bg-white rounded-lg shadow p-4 flex flex-row items-start"
            >
              <View className="mr-4">
                <i className={`${getNotificationIcon(notification.type)} text-xl`}></i>
              </View>
              <View className="flex-1">
                <Text className="font-semibold mb-1">{notification.message}</Text>
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-gray-500 text-sm">
                    Equipment ID: {notification.equipment}
                  </Text>
                  <Text className="text-gray-500 text-sm">{notification.date}</Text>
                </View>
                {notification.type === 'maintenance' && (
                  <TouchableOpacity
                    className="mt-2 text-blue-500"
                    onPress={() => navigate(`/equipment/${notification.equipment}`)}
                  >
                    <Text>View Equipment <i className="fas fa-arrow-right"></i></Text>
                  </TouchableOpacity>
                )}
                {notification.type === 'repair' && currentUser?.role === 'technician' && (
                  <TouchableOpacity
                    className="mt-2 text-blue-500"
                    onPress={() => navigate('/repair/tracking', { 
                      state: { equipmentId: notification.equipment } 
                    })}
                  >
                    <Text>View Repair Details <i className="fas fa-arrow-right"></i></Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
