import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native-web';
import { useNavigate, useLocation } from 'react-router-dom';
import { equipment } from '../data/mockData';

const MaintenanceReportScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [issueDescription, setIssueDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'nurse') {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // If equipment was pre-selected (coming from equipment details)
    if (location.state?.equipmentId) {
      const found = equipment.find(eq => eq.id === location.state.equipmentId);
      if (found) setSelectedEquipment(found);
    }
  }, [navigate, location]);

  const handleSubmit = () => {
    if (!selectedEquipment || !issueDescription) return;
    
    // In a real app, this would make an API call
    // For demo, we'll just show a success message
    setSubmitted(true);
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <View className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <View className="flex flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigate('/home')} className="mr-4">
          <i className="fas fa-arrow-left text-2xl text-gray-600"></i>
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Report Equipment Issue</Text>
      </View>

      {submitted ? (
        <View className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <Text className="font-bold">Success!</Text>
          <Text>Your maintenance report has been submitted. Redirecting...</Text>
        </View>
      ) : (
        <View className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Equipment Selection */}
          {!selectedEquipment && (
            <View>
              <Text className="text-lg font-semibold mb-4">Select Equipment</Text>
              <View className="space-y-3">
                {equipment.map((eq) => (
                  <TouchableOpacity
                    key={eq.id}
                    className={`p-4 rounded-lg border-2 ${
                      selectedEquipment?.id === eq.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                    onPress={() => setSelectedEquipment(eq)}
                  >
                    <Text className="font-semibold">{eq.name}</Text>
                    <Text className="text-gray-600">ID: {eq.id}</Text>
                    <Text className="text-gray-600">Location: {eq.location}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Selected Equipment Info */}
          {selectedEquipment && (
            <View className="bg-gray-50 p-4 rounded-lg">
              <View className="flex flex-row justify-between items-start">
                <View>
                  <Text className="font-semibold">{selectedEquipment.name}</Text>
                  <Text className="text-gray-600">ID: {selectedEquipment.id}</Text>
                  <Text className="text-gray-600">Location: {selectedEquipment.location}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setSelectedEquipment(null)}
                  className="text-blue-500"
                >
                  <Text>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Issue Description */}
          <View>
            <Text className="text-lg font-semibold mb-2">Issue Description</Text>
            <TextInput
              multiline
              numberOfLines={4}
              className="border-2 border-gray-200 rounded-lg p-3"
              placeholder="Describe the issue in detail..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
            />
          </View>

          {/* Priority Selection */}
          <View>
            <Text className="text-lg font-semibold mb-2">Priority Level</Text>
            <View className="flex flex-row space-x-4">
              {['low', 'medium', 'high'].map((level) => (
                <TouchableOpacity
                  key={level}
                  className={`flex-1 p-3 rounded-lg ${
                    priority === level
                      ? priorityColors[level]
                      : 'bg-gray-100'
                  }`}
                  onPress={() => setPriority(level)}
                >
                  <Text className="text-center capitalize font-semibold">
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            className={`p-4 rounded-lg ${
              selectedEquipment && issueDescription
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
            onPress={handleSubmit}
            disabled={!selectedEquipment || !issueDescription}
          >
            <Text className="text-white text-center font-semibold">
              Submit Report
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MaintenanceReportScreen;
