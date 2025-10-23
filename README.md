# Counseling Clinic Dashboard

A comprehensive web application designed for psychologists to manage their daily operations, client profiles, schedules, and clinical documents. Built with React, TypeScript, and Tailwind CSS.

## Features

### 📊 Dashboard Overview
- **Daily Statistics**: View today's appointments, pending reports, active clients, and tasks
- **Quick Actions**: Easy access to common tasks like adding clients, scheduling appointments, and creating reports
- **Recent Activity**: Track recent sessions, reports, and follow-up reminders
- **Task Management**: Monitor daily tasks with priority indicators

### 👥 Client Management
- **Client Listing**: Grid view of all clients with quick information including:
  - Name, age, and gender
  - Primary diagnosis and symptoms
  - Treatment plan and status
  - Session count and last visit date
- **Client Profiles**: Detailed client information with:
  - Complete medical history and diagnosis
  - Session history and progress tracking
  - Document management per client
  - Clinical notes and observations
- **Search & Filter**: Find clients quickly by name, diagnosis, or status

### 📅 Schedule Management
- **Calendar View**: Monthly calendar showing all appointments and events
- **Team Schedule**: Overview of the entire psychology team's schedule
- **Event Management**: Add personal events like leave days or urgent duties
- **Appointment Details**: View appointment information including client, time, location, and notes

### 📄 Document Management
- **Document Organization**: Categorize documents by type (Session Reports, Assessments, Test Results, etc.)
- **PDF Export**: Export any document as a PDF for printing or sharing
- **Client Linking**: Associate documents with specific clients and appointments
- **Search & Filter**: Find documents by title, client, content, or type
- **Document Viewer**: Full-screen document viewing with export options

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/counseling-clinic-dashboard.git
   cd counseling-clinic-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Page components
│   ├── Dashboard.tsx   # Overview dashboard
│   ├── Clients.tsx     # Client listing page
│   ├── ClientDetail.tsx # Individual client page
│   ├── Schedule.tsx    # Calendar and schedule
│   └── Documents.tsx   # Document management
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── data/               # Mock data and utilities
│   └── mockData.ts     # Sample data for development
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Features in Detail

### Dashboard Overview
The dashboard provides a comprehensive overview of daily operations:
- **Statistics Cards**: Visual representation of key metrics
- **Today's Appointments**: List of scheduled sessions with client details
- **Task Management**: Priority-based task list with due dates
- **Quick Actions**: One-click access to common operations
- **Activity Feed**: Recent actions and updates

### Client Management System
- **Comprehensive Profiles**: Store detailed client information including medical history, diagnosis, and treatment plans
- **Progress Tracking**: Monitor client progress through session history and notes
- **Document Association**: Link all client-related documents and reports
- **Status Management**: Track client status (Active, Inactive, Completed)

### Calendar & Scheduling
- **Monthly View**: Google Calendar-style interface for easy schedule visualization
- **Team Overview**: See all team members' schedules in one place
- **Event Management**: Add personal events that don't require admin approval
- **Appointment Details**: Comprehensive appointment information with client context

### Document Management
- **Multiple Document Types**: Support for various clinical document types
- **PDF Export**: Professional PDF generation with proper formatting
- **Client Integration**: Seamless linking between documents, clients, and appointments
- **Search & Organization**: Advanced filtering and search capabilities

## Deployment

### GitHub Pages
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Push your code to GitHub
   - Enable GitHub Pages in repository settings
   - Set source to "GitHub Actions" or "Deploy from a branch"

### Netlify
1. **Connect your GitHub repository to Netlify**
2. **Set build command**: `npm run build`
3. **Set publish directory**: `dist`
4. **Deploy automatically on every push**

### Vercel
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email your-email@example.com or create an issue in the GitHub repository.

## Roadmap

- [ ] User authentication and role management
- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Integration with external calendar systems
- [ ] Advanced document templates
- [ ] Client portal for self-scheduling
- [ ] Billing and payment integration

---

Built with ❤️ for mental health professionals
