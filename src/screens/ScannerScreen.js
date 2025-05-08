import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { equipment } from '../data/mockData';

const ScannerScreen = () => {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [error, setError] = useState('');

  const handleScan = () => {
    const found = equipment.find(eq => eq.id.toLowerCase() === searchId.toLowerCase());
    if (found) {
      navigate(`/equipment/${found.id}`);
    } else {
      setError('Equipment not found. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      {/* Header */}
      <div className="flex flex-row items-center mb-8">
        <button 
          onClick={() => navigate('/home')} 
          className="mr-4 text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          <i className="fas fa-arrow-left text-2xl"></i>
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Scan Equipment</h1>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Scanner UI */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 mb-8 bg-gray-50">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-full shadow-md mb-6">
              <i className="fas fa-qrcode text-6xl text-primary-500"></i>
            </div>
            <p className="text-gray-600 text-center mb-6 text-lg">
              For demo purposes, please enter an equipment ID or select from the list below
            </p>
            <div className="w-full max-w-md">
              <div className="relative mb-4">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors duration-200"
                  placeholder="Enter Equipment ID (e.g., EQ001)"
                  value={searchId}
                  onChange={(e) => {
                    setSearchId(e.target.value);
                    setError('');
                  }}
                />
              </div>
              <button
                className="hover-scale w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200"
                onClick={handleScan}
              >
                Search Equipment
              </button>
              {error && (
                <p className="text-red-500 text-center mt-3 font-medium">{error}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Select List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Select Equipment</h2>
          <div className="space-y-4">
            {equipment.map((eq) => (
              <button
                key={eq.id}
                className="hover-scale w-full flex flex-row items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-primary-300 transition-all duration-200"
                onClick={() => navigate(`/equipment/${eq.id}`)}
              >
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <i className="fas fa-microscope text-xl text-primary-600"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-gray-800">{eq.name}</h3>
                    <p className="text-gray-500">ID: {eq.id}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-lg font-medium ${
                  eq.status === 'Active' ? 'bg-green-100 text-green-700' :
                  eq.status === 'Under Repair' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {eq.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerScreen;
