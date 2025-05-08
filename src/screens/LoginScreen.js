import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native-web';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/mockData';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedUser(null);
  };

  const handleLogin = () => {
    if (selectedUser) {
      localStorage.setItem('currentUser', JSON.stringify(selectedUser));
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-primary-100">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-primary-600 mb-8 text-center">
            Medical Equipment Tracker
          </h1>

          {!selectedRole ? (
            <div className="w-full space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                Select Your Role
              </h2>
              <button
                className="hover-scale w-full bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl shadow-md transition-all duration-200"
                onClick={() => handleRoleSelect('nurse')}
              >
                <span className="text-white text-lg font-medium inline-flex items-center justify-center w-full">
                  <i className="fas fa-user-nurse mr-3"></i> Nurse
                </span>
              </button>
              <button
                className="hover-scale w-full bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl shadow-md transition-all duration-200"
                onClick={() => handleRoleSelect('technician')}
              >
                <span className="text-white text-lg font-medium inline-flex items-center justify-center w-full">
                  <i className="fas fa-tools mr-3"></i> Technician
                </span>
              </button>
              <button
                className="hover-scale w-full bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl shadow-md transition-all duration-200"
                onClick={() => handleRoleSelect('admin')}
              >
                <span className="text-white text-lg font-medium inline-flex items-center justify-center w-full">
                  <i className="fas fa-user-shield mr-3"></i> Administrator
                </span>
              </button>
            </div>
          ) : (
            <div className="w-full space-y-6">
              <button
                className="flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200 mb-6"
                onClick={() => setSelectedRole(null)}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span className="text-lg font-medium">Back to roles</span>
              </button>

              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
                Select Your Account
              </h2>

              <div className="space-y-4">
                {Object.entries(users).map(([role, userList]) => {
                  if (role.includes(selectedRole)) {
                    return userList.map((user) => (
                      <button
                        key={user.id}
                        className={`hover-scale w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedUser?.id === user.id
                            ? 'border-primary-500 bg-primary-50 shadow-md'
                            : 'border-gray-200 hover:border-primary-300 hover:shadow-sm'
                        }`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className={`flex flex-col items-start ${selectedUser?.id === user.id ? 'text-primary-700' : 'text-gray-700'}`}>
                          <div className="flex items-center text-lg">
                            <i className="fas fa-user-circle mr-2"></i>
                            <span>{user.name}</span>
                          </div>
                          {user.department && (
                            <div className="flex items-center text-gray-500 text-base mt-1">
                              <i className="fas fa-hospital mr-2"></i>
                              <span>{user.department}</span>
                            </div>
                          )}
                          {user.specialization && (
                            <div className="flex items-center text-gray-500 text-base mt-1">
                              <i className="fas fa-stethoscope mr-2"></i>
                              <span>{user.specialization}</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ));
                  }
                  return null;
                })}
              </div>

              {selectedUser && (
                <button
                  className="hover-scale w-full bg-gradient-to-r from-primary-500 to-primary-600 p-4 rounded-xl shadow-md transition-all duration-200 mt-8"
                  onClick={handleLogin}
                >
                  <span className="text-white text-lg font-semibold inline-flex items-center justify-center w-full">
                    <i className="fas fa-sign-in-alt mr-2"></i> Login
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
