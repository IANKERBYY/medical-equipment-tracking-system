import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RepairTrackingScreen = () => {
  const navigate = useNavigate();

  // Sample active repairs data
  const [repairs, setRepairs] = useState([
    {
      id: 'R001',
      equipmentName: 'Ventilator X100',
      status: 'In Progress',
      technicianNotes: 'Diagnosed issue with power supply.',
      completion: 50,
      estimatedCompletionDate: '2023-08-30',
    },
    {
      id: 'R002',
      equipmentName: 'Patient Monitor PM2000',
      status: 'Not Started',
      technicianNotes: '',
      completion: 0,
      estimatedCompletionDate: '2023-09-05',
    },
  ]);

  const updateRepair = (id, updates) => {
    setRepairs((prevRepairs) =>
      prevRepairs.map((repair) =>
        repair.id === id ? { ...repair, ...updates } : repair
      )
    );
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
        <h1 className="text-4xl font-bold text-primary-700">Active Repairs</h1>
      </header>

      <section className="space-y-6">
        {repairs.map((repair) => (
          <div
            key={repair.id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-2">{repair.equipmentName}</h2>
            <p className="mb-2">
              <strong>Status:</strong> {repair.status}
            </p>
            <p className="mb-2">
              <strong>Technician Notes:</strong> {repair.technicianNotes || 'No notes yet.'}
            </p>
            <p className="mb-2">
              <strong>Completion:</strong> {repair.completion}%
            </p>
            <p className="mb-4">
              <strong>Estimated Completion Date:</strong> {repair.estimatedCompletionDate}
            </p>

            {/* Update form */}
            <div className="space-y-2">
              <label className="block font-semibold">Update Status</label>
              <select
                className="border border-gray-300 rounded p-2 w-full"
                value={repair.status}
                onChange={(e) =>
                  updateRepair(repair.id, { status: e.target.value })
                }
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <label className="block font-semibold">Technician Notes</label>
              <textarea
                className="border border-gray-300 rounded p-2 w-full"
                rows="3"
                value={repair.technicianNotes}
                onChange={(e) =>
                  updateRepair(repair.id, { technicianNotes: e.target.value })
                }
              ></textarea>

              <label className="block font-semibold">Completion Percentage</label>
              <input
                type="number"
                min="0"
                max="100"
                className="border border-gray-300 rounded p-2 w-full"
                value={repair.completion}
                onChange={(e) =>
                  updateRepair(repair.id, { completion: Number(e.target.value) })
                }
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RepairTrackingScreen;
