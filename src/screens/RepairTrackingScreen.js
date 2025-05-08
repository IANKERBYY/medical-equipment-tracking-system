import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native-web';
import { useNavigate, useLocation } from 'react-router-dom';
import { equipment } from '../data/mockData';

const RepairTrackingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [updateNote, setUpdateNote] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'technician') {
      navigate('/');
      return;
    }
    setCurrentUser(user);

    // Filter equipment that needs repair
    const activeRepairs = equipment.filter(eq => 
      eq.status === 'Under Repair' || 
      eq.condition === 'Needs Repair'
    ).map(eq => ({
      ...eq,
      assignedTo: 'John Smith', // Hardcoded for demo
      reportDate: '2023-09-15',
      priority: eq.id === 'EQ002' ? 'high' : 'medium'
    }));

    setRepairs(activeRepairs);

    // If coming from equipment details, select that equipment
    if (location.state?.equipmentId) {
      const found = activeRepairs.find(eq => eq.id === location.state.equipmentId);
      if (found) setSelectedRepair(found);
    }
  }, [navigate, location]);

  const handleStatusUpdate = () => {
    if (!selectedRepair || !updateNote) return;

    // In a real app, this would make an API call
    // For demo, we'll just show a success message and redirect
    alert('Status updated successfully!');
    navigate('/home');
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return (
      <View className={`px-3 py-1 rounded-full ${colors[priority]}`}>
        <Text className="capitalize font-semibold">{priority}</Text>
      </View>
    );
  };

  return (
    <ScrollView className="min-h-screen bg-gray-100">
      {/* Header */}
      <View className="bg-white shadow-md p-4">
        <View className="flex flex-row items-center mb-4">
          <TouchableOpacity onPress={() => navigate('/home')} className="mr-4">
            <i className="fas fa-arrow-left text-2xl text-gray-600"></i>
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Repair Tracking</Text>
        </View>
      </View>

      <View className="p-4">
        {/* Active Repairs List */}
        {!selectedRepair && (
          <View className="bg-white rounded-lg shadow p-4">
            <Text className="text-xl font-bold mb-4">Active Repairs</Text>
            <View className="space-y-4">
              {repairs.map((repair) => (
                <TouchableOpacity
                  key={repair.id}
                  className="border border-gray-200 rounded-lg p-4"
                  onPress={() => setSelectedRepair(repair)}
                >
                  <View className="flex flex-row justify-between items-start mb-2">
                    <View>
                      <Text className="font-semibold text-lg">{repair.name}</Text>
                      <Text className="text-gray-600">ID: {repair.id}</Text>
                    </View>
                    {getPriorityBadge(repair.priority)}
                  </View>
                  <View className="space-y-2">
                    <Text className="text-gray-600">Location: {repair.location}</Text>
                    <Text className="text-gray-600">Reported: {repair.reportDate}</Text>
                    <Text className="text-gray-600">Assigned to: {repair.assignedTo}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Repair Details and Update Form */}
        {selectedRepair && (
          <View className="space-y-4">
            {/* Equipment Details */}
            <View className="bg-white rounded-lg shadow p-4">
              <View className="flex flex-row justify-between items-start mb-4">
                <TouchableOpacity
                  onPress={() => setSelectedRepair(null)}
                  className="text-blue-500"
                >
                  <Text><i className="fas fa-arrow-left mr-2"></i>Back to list</Text>
                </TouchableOpacity>
                {getPriorityBadge(selectedRepair.priority)}
              </View>

              <Text className="text-xl font-bold mb-2">{selectedRepair.name}</Text>
              <View className="space-y-2">
                <Text className="text-gray-600">ID: {selectedRepair.id}</Text>
                <Text className="text-gray-600">Location: {selectedRepair.location}</Text>
                <Text className="text-gray-600">Reported: {selectedRepair.reportDate}</Text>
                <Text className="text-gray-600">Assigned to: {selectedRepair.assignedTo}</Text>
              </View>
            </View>

            {/* Update Form */}
            <View className="bg-white rounded-lg shadow p-4">
              <Text className="text-lg font-semibold mb-4">Update Repair Status</Text>
              
              <View className="space-y-4">
                <View>
                  <Text className="font-semibold mb-2">Status Update</Text>
                  <TextInput
                    multiline
                    numberOfLines={4}
                    className="border-2 border-gray-200 rounded-lg p-3"
                    placeholder="Enter repair notes and current status..."
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                  />
                </View>

                <View>
                  <Text className="font-semibold mb-2">Estimated Completion Time</Text>
                  <TextInput
                    className="border-2 border-gray-200 rounded-lg p-3"
                    placeholder="e.g., 2 hours, 1 day..."
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                  />
                </View>

                <TouchableOpacity
                  className={`p-4 rounded-lg ${
                    updateNote ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onPress={handleStatusUpdate}
                  disabled={!updateNote}
                >
                  <Text className="text-white text-center font-semibold">
                    Update Status
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Repair History */}
            <View className="bg-white rounded-lg shadow p-4">
              <Text className="text-lg font-semibold mb-4">Repair History</Text>
              <View className="space-y-4">
                {selectedRepair.history.map((event, index) => (
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
        )}
      </View>
    </ScrollView>
  );
};

export default RepairTrackingScreen;
