import { Client, Appointment, Document, Task, DashboardStats } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    sex: 'Female',
    symptoms: ['Anxiety', 'Depression', 'Sleep Issues'],
    diagnosis: 'Generalized Anxiety Disorder',
    treatmentPlan: 'Cognitive Behavioral Therapy, Mindfulness techniques',
    status: 'Active',
    joinDate: '2024-01-15',
    lastSession: '2024-01-20',
    totalSessions: 8,
    notes: 'Responding well to treatment, showing improvement in sleep patterns'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 35,
    sex: 'Male',
    symptoms: ['PTSD', 'Anger Management'],
    diagnosis: 'Post-Traumatic Stress Disorder',
    treatmentPlan: 'EMDR Therapy, Trauma-focused CBT',
    status: 'Active',
    joinDate: '2024-01-10',
    lastSession: '2024-01-22',
    totalSessions: 12,
    notes: 'Making steady progress with EMDR sessions'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 24,
    sex: 'Female',
    symptoms: ['Social Anxiety', 'Low Self-esteem'],
    diagnosis: 'Social Anxiety Disorder',
    treatmentPlan: 'Exposure therapy, Social skills training',
    status: 'Active',
    joinDate: '2024-01-05',
    lastSession: '2024-01-21',
    totalSessions: 6,
    notes: 'Gradually building confidence in social situations'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Sarah Johnson',
    date: '2024-01-25',
    time: '10:00',
    duration: 60,
    type: 'Session',
    status: 'Scheduled',
    notes: 'Regular therapy session',
    location: 'Room A'
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Michael Chen',
    date: '2024-01-25',
    time: '14:00',
    duration: 90,
    type: 'Assessment',
    status: 'Scheduled',
    notes: 'Progress assessment',
    location: 'Room B'
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Emily Rodriguez',
    date: '2024-01-26',
    time: '11:00',
    duration: 60,
    type: 'Session',
    status: 'Scheduled',
    notes: 'Social skills practice',
    location: 'Room A'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Sarah Johnson - Session Report #8',
    type: 'Session Report',
    clientId: '1',
    clientName: 'Sarah Johnson',
    appointmentId: '1',
    createdAt: '2024-01-20',
    content: 'Client showed significant improvement in managing anxiety symptoms. Discussed coping strategies for work-related stress.',
    tags: ['anxiety', 'coping-strategies', 'progress']
  },
  {
    id: '2',
    title: 'Michael Chen - PTSD Assessment',
    type: 'Assessment',
    clientId: '2',
    clientName: 'Michael Chen',
    createdAt: '2024-01-15',
    content: 'Comprehensive PTSD assessment completed. Client reports reduced flashback frequency.',
    tags: ['PTSD', 'assessment', 'trauma']
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Sarah Johnson progress report',
    description: 'Write detailed progress report for Sarah\'s 8th session',
    priority: 'High',
    dueDate: '2024-01-26',
    status: 'Pending',
    type: 'Report'
  },
  {
    id: '2',
    title: 'Follow up with Michael Chen',
    description: 'Check in on EMDR therapy progress',
    priority: 'Medium',
    dueDate: '2024-01-27',
    status: 'Pending',
    type: 'Follow-up'
  },
  {
    id: '3',
    title: 'Prepare Emily Rodriguez assessment',
    description: 'Prepare materials for social anxiety assessment',
    priority: 'Low',
    dueDate: '2024-01-28',
    status: 'Pending',
    type: 'Assessment'
  }
];

export const mockDashboardStats: DashboardStats = {
  todayAppointments: 2,
  pendingReports: 3,
  activeClients: 3,
  todayTasks: 2
};
