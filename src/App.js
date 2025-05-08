import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { View } from 'react-native-web';

// Import screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import EquipmentDetailsScreen from './screens/EquipmentDetailsScreen';
import MaintenanceReportScreen from './screens/MaintenanceReportScreen';
import RepairTrackingScreen from './screens/RepairTrackingScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import NotificationsScreen from './screens/NotificationsScreen';

function App() {
  return (
    <>
      <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" 
      />
      
      <Router>
        <View style={{ height: '100vh', backgroundColor: '#f3f4f6' }}>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/scanner" element={<ScannerScreen />} />
            <Route path="/equipment/:id" element={<EquipmentDetailsScreen />} />
            <Route path="/maintenance/report" element={<MaintenanceReportScreen />} />
            <Route path="/repair/tracking" element={<RepairTrackingScreen />} />
            <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
          </Routes>
        </View>
      </Router>
    </>
  );
}

export default App;
