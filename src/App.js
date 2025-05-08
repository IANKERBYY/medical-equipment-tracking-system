import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import EquipmentDetailsScreen from './screens/EquipmentDetailsScreen';
import MaintenanceReportScreen from './screens/MaintenanceReportScreen';
import RepairTrackingScreen from './screens/RepairTrackingScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const App = () => {
  // Simple auth check
  const isAuthenticated = () => {
    return localStorage.getItem('currentUser') !== null;
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        } />
        
        <Route path="/scanner" element={
          <ProtectedRoute>
            <ScannerScreen />
          </ProtectedRoute>
        } />
        
        <Route path="/equipment/:id" element={
          <ProtectedRoute>
            <EquipmentDetailsScreen />
          </ProtectedRoute>
        } />
        
        <Route path="/maintenance/report" element={
          <ProtectedRoute>
            <MaintenanceReportScreen />
          </ProtectedRoute>
        } />
        
        <Route path="/repair/tracking" element={
          <ProtectedRoute>
            <RepairTrackingScreen />
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboardScreen />
          </ProtectedRoute>
        } />
        
        <Route path="/notifications" element={
          <ProtectedRoute>
            <NotificationsScreen />
          </ProtectedRoute>
        } />

        {/* Catch all route - redirect to home if authenticated, login if not */}
        <Route path="*" element={
          isAuthenticated() ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
        } />
      </Routes>
    </Router>
  );
};

export default App;
