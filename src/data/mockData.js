export const users = {
  nurses: [
    { id: 1, name: 'Sarah Johnson', role: 'nurse', department: 'Emergency' },
    { id: 2, name: 'Mike Chen', role: 'nurse', department: 'ICU' },
  ],
  technicians: [
    { id: 3, name: 'John Smith', role: 'technician', specialization: 'Respiratory Equipment' },
    { id: 4, name: 'Lisa Brown', role: 'technician', specialization: 'Diagnostic Equipment' },
  ],
  admins: [
    { id: 5, name: 'David Wilson', role: 'admin' },
  ]
};

export const equipment = [
  {
    id: 'EQ001',
    name: 'Ventilator X100',
    type: 'Respiratory',
    status: 'Active',
    location: 'ICU Room 201',
    lastMaintenance: '2023-09-01',
    nextMaintenance: '2023-12-01',
    condition: 'Good',
    history: [
      {
        date: '2023-09-01',
        type: 'Maintenance',
        description: 'Regular checkup',
        technician: 'John Smith'
      },
      {
        date: '2023-08-15',
        type: 'Issue Reported',
        description: 'Unusual noise during operation',
        reportedBy: 'Sarah Johnson'
      }
    ]
  },
  {
    id: 'EQ002',
    name: 'Patient Monitor PM2000',
    type: 'Monitoring',
    status: 'Under Repair',
    location: 'Emergency Room 102',
    lastMaintenance: '2023-08-15',
    nextMaintenance: '2023-11-15',
    condition: 'Needs Repair',
    history: [
      {
        date: '2023-08-15',
        type: 'Issue Reported',
        description: 'Display malfunction',
        reportedBy: 'Mike Chen'
      }
    ]
  },
  {
    id: 'EQ003',
    name: 'MRI Scanner Pro',
    type: 'Diagnostic',
    status: 'Active',
    location: 'Radiology Department',
    lastMaintenance: '2023-07-30',
    nextMaintenance: '2023-10-30',
    condition: 'Good',
    history: [
      {
        date: '2023-07-30',
        type: 'Maintenance',
        description: 'Annual calibration',
        technician: 'Lisa Brown'
      }
    ]
  }
];

export const notifications = [
  {
    id: 1,
    type: 'maintenance',
    equipment: 'EQ001',
    message: 'Scheduled maintenance due in 5 days',
    date: '2023-11-26'
  },
  {
    id: 2,
    type: 'repair',
    equipment: 'EQ002',
    message: 'Repair request assigned to Lisa Brown',
    date: '2023-08-16'
  },
  {
    id: 3,
    type: 'alert',
    equipment: 'EQ003',
    message: 'Calibration check required',
    date: '2023-10-25'
  }
];
