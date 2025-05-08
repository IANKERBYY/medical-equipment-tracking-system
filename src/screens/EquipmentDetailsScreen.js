import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native-web';
import { useNavigate, useParams } from 'react-router-dom';
import { equipment } from '../data/mockData';

const EquipmentDetailsScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipmentData, setEquipmentData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    const found = equipment.find(eq => eq.id === id);
    if (!found) {
      navigate('/scanner');
      return;
    }
    setEquipmentData(found);
  }, [id, navigate]);

  if (!equipmentData) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'under repair':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getConditionIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'good':
        return 'fas fa-check-circle text-green-500';
      case 'needs repair':
        return 'fas fa-exclamation-circle text-red-500';
      default:
        return 'fas fa-question-circle text-yellow-500';
    }
  };

  return (
    <ScrollView className="min-h-screen bg-gray-100">
      {/* Header */}
      <View className="bg-white shadow-md p-4">
        <View className="flex flex-row items-center mb-4">
          <TouchableOpacity onPress={() => navigate('/scanner')} className="mr-4">
            <i className="fas fa-arrow-left text-2xl text-gray-600"></i>
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Equipment Details</Text>
        </View>
        
        <View className="flex flex-row justify-between items-start">
          <View>
            <Text className="text-xl font-bold">{equipmentData.name}</Text>
            <Text className="text-gray-600">ID: {equipmentData.id}</Text>
          </View>
          <View className={`px-4 py-2 rounded-full ${getStatusColor(equipmentData.status)}`}>
            <Text className="font-semibold">{equipmentData.status}</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View className="p-4 space-y-6">
        {/* Quick Actions */}
        <View className="bg-white rounded-lg shadow p-4">
          <Text className="text-lg font-semibold mb-4">Quick Actions</Text>
          <View className="grid grid-cols-2 gap-4">
            {currentUser?.role === 'nurse' && (
              <TouchableOpacity
                className="bg-red-500 p-4 rounded-lg"
                onPress={() => navigate('/maintenance/report', { state: { equipmentId: id } })}
              >
                <Text className="text-white text-center">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  Report Issue
                </Text>
              </TouchableOpacity>
            )}
            {currentUser?.role === 'technician' && (
              <TouchableOpacity
                className="bg-blue-500 p-4 rounded-lg"
                onPress={() => navigate('/repair/tracking', { state: { equipmentId: id } })}
              >
                <Text className="text-white text-center">
                  <i className="fas fa-tools mr-2"></i>
                  Update Status
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Equipment Info */}
        <View className="bg-white rounded-lg shadow p-4">
          <Text className="text-lg font-semibold mb-4">Equipment Information</Text>
          <View className="space-y-4">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-600">Type</Text>
              <Text className="font-semibold">{equipmentData.type}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-600">Location</Text>
              <Text className="font-semibold">{equipmentData.location}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-600">Condition</Text>
              <View className="flex flex-row items-center">
                <i className={`${getConditionIcon(equipmentData.condition)} mr-2`}></i>
                <Text className="font-semibold">{equipmentData.condition}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Maintenance Info */}
        <View className="bg-white rounded-lg shadow p-4">
          <Text className="text-lg font-semibold mb-4">Maintenance Information</Text>
          <View className="space-y-4">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-600">Last Maintenance</Text>
              <Text className="font-semibold">{equipmentData.lastMaintenance}</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-gray-600">Next Maintenance</Text>
              <Text className="font-semibold">{equipmentData.nextMaintenance}</Text>
            </View>
          </View>
        </View>

        {/* History */}
        <View className="bg-white rounded-lg shadow p-4">
          <Text className="text-lg font-semibold mb-4">History</Text>
          <View className="space-y-4">
            {equipmentData.history.map((event, index) => (
              <View key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <Text className="font-semibold">{event.type}</Text>
                <Text className="text-gray-600">{event.description}</Text>
                <Text className="text-sm text-gray-500">
                  {event.date} - By {event.technician || event.reportedBy}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EquipmentDetailsScreen;
