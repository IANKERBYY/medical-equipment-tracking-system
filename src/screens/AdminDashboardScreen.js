import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native-web';
import { useNavigate } from 'react-router-dom';
import { equipment, notifications } from '../data/mockData';

const AdminDashboardScreen = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    setCurrentUser(user);
  }, [navigate]);

  // Calculate statistics
  const stats = {
    total: equipment.length,
    active: equipment.filter(eq => eq.status === 'Active').length,
    underRepair: equipment.filter(eq => eq.status === 'Under Repair').length,
    maintenanceDue: equipment.filter(eq => {
      const nextMaintenance = new Date(eq.nextMaintenance);
      const today = new Date();
      return nextMaintenance <= today;
    }).length
  };

  const renderOverviewTab = () => (
    <View className="space-y-6">
      {/* Statistics Cards */}
      <View className="grid grid-cols-2 gap-4">
        <View className="bg-blue-100 p-4 rounded-lg">
          <Text className="text-3xl font-bold text-blue-700">{stats.total}</Text>
          <Text className="text-blue-600">Total Equipment</Text>
        </View>
        <View className="bg-green-100 p-4 rounded-lg">
          <Text className="text-3xl font-bold text-green-700">{stats.active}</Text>
          <Text className="text-green-600">Active Equipment</Text>
        </View>
        <View className="bg-red-100 p-4 rounded-lg">
          <Text className="text-3xl font-bold text-red-700">{stats.underRepair}</Text>
          <Text className="text-red-600">Under Repair</Text>
        </View>
        <View className="bg-yellow-100 p-4 rounded-lg">
          <Text className="text-3xl font-bold text-yellow-700">{stats.maintenanceDue}</Text>
          <Text className="text-yellow-600">Maintenance Due</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="bg-white rounded-lg shadow p-4">
        <Text className="text-lg font-semibold mb-4">Recent Activity</Text>
        <View className="space-y-4">
          {notifications.map((notification) => (
            <View
              key={notification.id}
              className="border-l-4 border-blue-500 pl-4 py-2"
            >
              <Text className="font-semibold">{notification.message}</Text>
              <Text className="text-gray-600 text-sm">{notification.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderEquipmentTab = () => (
    <View className="space-y-4">
      {/* Equipment List */}
      {equipment.map((eq) => (
        <TouchableOpacity
          key={eq.id}
          className="bg-white rounded-lg shadow p-4"
          onPress={() => navigate(`/equipment/${eq.id}`)}
        >
          <View className="flex flex-row justify-between items-start">
            <View>
              <Text className="font-semibold text-lg">{eq.name}</Text>
              <Text className="text-gray-600">ID: {eq.id}</Text>
              <Text className="text-gray-600">Location: {eq.location}</Text>
            </View>
            <View className={`px-3 py-1 rounded ${
              eq.status === 'Active' ? 'bg-green-100 text-green-800' :
              eq.status === 'Under Repair' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              <Text>{eq.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMaintenanceTab = () => (
    <View className="space-y-4">
      {/* Maintenance Schedule */}
      {equipment.map((eq) => (
        <View key={eq.id} className="bg-white rounded-lg shadow p-4">
          <View className="flex flex-row justify-between items-start mb-2">
            <View>
              <Text className="font-semibold text-lg">{eq.name}</Text>
              <Text className="text-gray-600">ID: {eq.id}</Text>
            </View>
            <TouchableOpacity
              className="bg-blue-500 px-3 py-1 rounded"
              onPress={() => navigate(`/equipment/${eq.id}`)}
            >
              <Text className="text-white">View Details</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-2">
            <View className="flex flex-row justify-between">
              <Text className="text-gray-600">Last Maintenance:</Text>
              <Text>{eq.lastMaintenance}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-600">Next Maintenance:</Text>
              <Text className={
                new Date(eq.nextMaintenance) <= new Date()
                  ? 'text-red-600 font-semibold'
                  : ''
              }>{eq.nextMaintenance}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View className="min-h-screen bg-gray-100">
      {/* Header */}
      <View className="bg-white shadow-md p-4">
        <View className="flex flex-row items-center justify-between mb-4">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => navigate('/home')} className="mr-4">
              <i className="fas fa-arrow-left text-2xl text-gray-600"></i>
            </TouchableOpacity>
            <Text className="text-2xl font-bold">Admin Dashboard</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate('/scanner')}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            <Text className="text-white">
              <i className="fas fa-qrcode mr-2"></i>
              Scan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View className="flex flex-row space-x-4">
          {['overview', 'equipment', 'maintenance'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`px-4 py-2 rounded-lg ${
                selectedTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
              onPress={() => setSelectedTab(tab)}
            >
              <Text className={selectedTab === tab ? 'text-white' : 'text-gray-600'}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Content */}
      <ScrollView className="p-4">
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'equipment' && renderEquipmentTab()}
        {selectedTab === 'maintenance' && renderMaintenanceTab()}
      </ScrollView>
    </View>
  );
};

export default AdminDashboardScreen;
