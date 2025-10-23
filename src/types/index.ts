export interface Client {
  id: string;
  name: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  symptoms: string[];
  diagnosis: string;
  treatmentPlan: string;
  status: 'Active' | 'Inactive' | 'Completed';
  joinDate: string;
  lastSession: string;
  totalSessions: number;
  notes: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  duration: number;
  type: 'Session' | 'Assessment' | 'Follow-up';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  notes: string;
  location: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'Session Report' | 'Assessment' | 'Test Result' | 'Treatment Plan' | 'Progress Note';
  clientId: string;
  clientName: string;
  appointmentId?: string;
  createdAt: string;
  content: string;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  type: 'Report' | 'Follow-up' | 'Assessment' | 'Other';
}

export interface DashboardStats {
  todayAppointments: number;
  pendingReports: number;
  activeClients: number;
  todayTasks: number;
}
