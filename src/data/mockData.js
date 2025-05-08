export const users = {
  nurse: [
    { id: 1, name: 'Sarah Johnson', role: 'nurse', department: 'Emergency' },
    { id: 2, name: 'Mike Chen', role: 'nurse', department: 'ICU' },
  ],
  technician: [
    { id: 3, name: 'John Smith', role: 'technician', specialization: 'Medical Equipment' },
    { id: 4, name: 'Lisa Brown', role: 'technician', specialization: 'Electronics' },
  ],
  admin: [
    { id: 5, name: 'David Wilson', role: 'admin', department: 'Facility Management' },
  ],
};

export const equipment = [
  {
    id: 'EQ001',
    name: 'Ventilator X100',
    status: 'Active',
    location: 'ICU Room 201',
    department: 'ICU',
    lastMaintenance: '2023-09-01',
    nextMaintenance: '2023-12-01',
    maintenanceHistory: [
      {
        type: 'Regular Checkup',
        description: 'Routine maintenance and calibration',
        date: '2023-09-01',
        technician: 'John Smith',
      },
      {
        type: 'Issue Reported',
        description: 'Unusual noise during operation',
        date: '2023-08-15',
        technician: 'Sarah Johnson',
      },
    ],
  },
  {
    id: 'EQ002',
    name: 'Patient Monitor PM2000',
    status: 'Under Repair',
    location: 'Emergency',
    department: 'Emergency',
    lastMaintenance: '2023-08-15',
    nextMaintenance: '2023-11-15',
    maintenanceHistory: [
      {
        type: 'Repair',
        description: 'Display malfunction - replacing LCD panel',
        date: '2023-08-16',
        technician: 'Lisa Brown',
      },
    ],
  },
  {
    id: 'EQ003',
    name: 'MRI Scanner Pro',
    status: 'Active',
    location: 'Radiology',
    department: 'Radiology',
    lastMaintenance: '2023-07-20',
    nextMaintenance: '2023-10-20',
    maintenanceHistory: [
      {
        type: 'Calibration',
        description: 'Annual calibration and system update',
        date: '2023-07-20',
        technician: 'John Smith',
      },
    ],
  },
];

export const notifications = [
  {
    id: 1,
    message: 'Scheduled maintenance due in 5 days',
    date: '2023-11-26',
    read: false,
    type: 'maintenance',
  },
  {
    id: 2,
    message: 'Repair request assigned to Lisa Brown',
    date: '2023-08-16',
    read: false,
    type: 'repair',
  },
  {
    id: 3,
    message: 'Calibration check required',
    date: '2023-10-25',
    read: true,
    type: 'maintenance',
  },
];

export const repairs = [
  {
    id: 'R001',
    equipmentId: 'EQ002',
    equipmentName: 'Patient Monitor PM2000',
    reportDate: '2023-08-16',
    description: 'Display showing artifacts and flickering',
    status: 'In Progress',
    assignedTo: 'Lisa Brown',
    estimatedCompletion: '2023-08-30',
    progress: 60,
    notes: [
      {
        date: '2023-08-16',
        text: 'Initial diagnosis complete - LCD panel needs replacement',
        author: 'Lisa Brown',
      },
      {
        date: '2023-08-17',
        text: 'Replacement part ordered',
        author: 'Lisa Brown',
      },
    ],
  },
  {
    id: 'R002',
    equipmentId: 'EQ001',
    equipmentName: 'Ventilator X100',
    reportDate: '2023-08-15',
    description: 'Unusual noise during operation',
    status: 'Completed',
    assignedTo: 'John Smith',
    estimatedCompletion: '2023-08-20',
    progress: 100,
    notes: [
      {
        date: '2023-08-15',
        text: 'Identified loose component in cooling fan',
        author: 'John Smith',
      },
      {
        date: '2023-08-16',
        text: 'Replaced fan assembly and tested operation',
        author: 'John Smith',
      },
    ],
  },
];

export const maintenanceSchedule = [
  {
    id: 'M001',
    equipmentId: 'EQ001',
    equipmentName: 'Ventilator X100',
    type: 'Regular Maintenance',
    scheduledDate: '2023-12-01',
    assignedTo: 'John Smith',
    status: 'Scheduled',
  },
  {
    id: 'M002',
    equipmentId: 'EQ003',
    equipmentName: 'MRI Scanner Pro',
    type: 'Calibration',
    scheduledDate: '2023-10-20',
    assignedTo: 'Lisa Brown',
    status: 'Scheduled',
  },
];

export const departments = [
  'Emergency',
  'ICU',
  'Radiology',
  'Surgery',
  'General Ward',
];

export const equipmentTypes = [
  'Ventilator',
  'Patient Monitor',
  'MRI Scanner',
  'X-Ray Machine',
  'Ultrasound',
  'ECG Machine',
  'Defibrillator',
];
