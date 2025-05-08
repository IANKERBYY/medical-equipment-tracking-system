import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native-web';

const AdminDashboardScreen = () => {
  // Dummy data for dashboard cards
  const totalEquipment = 120;
  const activeRepairs = 8;
  const pendingReports = 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary-700">Admin Dashboard</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Total Equipment</h2>
          <p className="text-5xl font-bold text-primary-600">{totalEquipment}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Active Repairs</h2>
          <p className="text-5xl font-bold text-primary-600">{activeRepairs}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">Pending Reports</h2>
          <p className="text-5xl font-bold text-primary-600">{pendingReports}</p>
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4">Maintenance Trends</h2>
        <img
          src="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300"
          alt="Maintenance Trends Chart"
          className="w-full rounded-xl"
        />
      </section>

      <section className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4">Asset Management</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-primary-100 text-primary-700">
              <th className="border border-gray-300 px-4 py-2 text-left">Equipment ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Last Maintenance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-primary-50 cursor-pointer">
              <td className="border border-gray-300 px-4 py-2">EQ001</td>
              <td className="border border-gray-300 px-4 py-2">Ventilator X100</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600">Active</td>
              <td className="border border-gray-300 px-4 py-2">ICU Room 201</td>
              <td className="border border-gray-300 px-4 py-2">2023-09-01</td>
            </tr>
            <tr className="hover:bg-primary-50 cursor-pointer">
              <td className="border border-gray-300 px-4 py-2">EQ002</td>
              <td className="border border-gray-300 px-4 py-2">Patient Monitor PM2000</td>
              <td className="border border-gray-300 px-4 py-2 text-red-600">Under Repair</td>
              <td className="border border-gray-300 px-4 py-2">Emergency</td>
              <td className="border border-gray-300 px-4 py-2">2023-08-15</td>
            </tr>
            <tr className="hover:bg-primary-50 cursor-pointer">
              <td className="border border-gray-300 px-4 py-2">EQ003</td>
              <td className="border border-gray-300 px-4 py-2">MRI Scanner Pro</td>
              <td className="border border-gray-300 px-4 py-2 text-yellow-600">Pending Maintenance</td>
              <td className="border border-gray-300 px-4 py-2">Radiology</td>
              <td className="border border-gray-300 px-4 py-2">2023-07-20</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboardScreen;
