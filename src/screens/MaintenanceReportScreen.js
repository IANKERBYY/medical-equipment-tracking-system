import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MaintenanceReportScreen = () => {
  const navigate = useNavigate();
  const [equipmentId, setEquipmentId] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [urgency, setUrgency] = useState('Low');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!equipmentId || !reportDescription) {
      alert('Please fill in all required fields.');
      return;
    }
    // Simulate submission
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      <header className="mb-8 flex items-center">
        <button
          onClick={() => navigate('/home')}
          className="mr-4 text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          <i className="fas fa-arrow-left text-2xl"></i>
        </button>
        <h1 className="text-4xl font-bold text-primary-700">Report Maintenance Issue</h1>
      </header>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="equipmentId">Equipment ID *</label>
            <input
              id="equipmentId"
              type="text"
              className="w-full border border-gray-300 rounded p-3"
              placeholder="Enter Equipment ID (e.g., EQ001)"
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="reportDescription">Issue Description *</label>
            <textarea
              id="reportDescription"
              className="w-full border border-gray-300 rounded p-3"
              rows="5"
              placeholder="Describe the issue in detail"
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="urgency">Urgency Level</label>
            <select
              id="urgency"
              className="w-full border border-gray-300 rounded p-3"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="reportDate">Report Date</label>
            <input
              id="reportDate"
              type="date"
              className="w-full border border-gray-300 rounded p-3"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold py-3 rounded-xl shadow-md hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
          >
            Submit Report
          </button>
        </form>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-700 mb-4">Report Submitted</h2>
          <p className="mb-6">Thank you for submitting the maintenance report. Our team will review it shortly.</p>
          <button
            onClick={() => navigate('/home')}
            className="bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-primary-700 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default MaintenanceReportScreen;
