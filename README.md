# Medical Equipment Tracking System

A cross-platform application for hospitals to track, monitor, and maintain medical equipment using QR codes.

## Features

- QR Code scanning (mocked for demo)
- Equipment tracking and management
- Maintenance reporting
- Repair tracking
- Admin dashboard with analytics
- Cross-platform support (Web/Mobile)

## Demo Users

### Nurse Access
- Sarah Johnson (Emergency Department)
- Mike Chen (ICU)

### Technician Access
- John Smith (Respiratory Equipment)
- Lisa Brown (Diagnostic Equipment)

### Admin Access
- David Wilson

## Setup and Running

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open http://localhost:8000 in your browser

## Usage

1. Select a role (Nurse, Technician, or Admin) from the login screen
2. Choose a demo user
3. Navigate through different features based on your role:
   - Nurses can scan equipment and report issues
   - Technicians can track and update repairs
   - Admins can view analytics and manage equipment

## Note

This is a mockup version with hardcoded data for demonstration purposes. In a production environment, this would be connected to a backend server with real data and QR code scanning functionality.

## Features by Role

### Nurses
- Scan equipment QR codes
- View equipment details
- Report maintenance issues
- Set priority levels for repairs
- View equipment history

### Technicians
- View assigned repairs
- Update repair status
- Add repair notes
- Set estimated completion times
- View equipment maintenance history

### Administrators
- View dashboard analytics
- Monitor equipment status
- Track maintenance schedules
- View all equipment details
- Access maintenance history

## Technologies Used

- React Native Web
- React Router DOM
- Tailwind CSS
- Font Awesome Icons
