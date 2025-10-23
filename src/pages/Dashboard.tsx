import React from 'react';
import { 
  Calendar, 
  FileText, 
  Users, 
  CheckSquare,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { mockDashboardStats, mockTasks, mockAppointments } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const todayTasks = mockTasks.filter(task => task.status === 'Pending');
  const todayAppointments = mockAppointments.filter(apt => apt.date === '2024-01-25');

  const statCards = [
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "bg-blue-500",
      change: "+2 from yesterday"
    },
    {
      title: "Pending Reports",
      value: stats.pendingReports,
      icon: FileText,
      color: "bg-orange-500",
      change: "3 reports due this week"
    },
    {
      title: "Active Clients",
      value: stats.activeClients,
      icon: Users,
      color: "bg-green-500",
      change: "All clients engaged"
    },
    {
      title: "Today's Tasks",
      value: stats.todayTasks,
      icon: CheckSquare,
      color: "bg-purple-500",
      change: "2 high priority tasks"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.clientName}</p>
                  <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{appointment.duration}min</p>
                  <p className="text-xs text-gray-500">{appointment.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
            <CheckSquare className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {todayTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    task.priority === 'High' ? 'bg-red-500' : 
                    task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="btn-primary flex items-center justify-center">
            <Users className="h-4 w-4 mr-2" />
            Add New Client
          </button>
          <button className="btn-secondary flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </button>
          <button className="btn-secondary flex items-center justify-center">
            <FileText className="h-4 w-4 mr-2" />
            Create Report
          </button>
          <button className="btn-secondary flex items-center justify-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <CheckSquare className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Session completed with Sarah Johnson</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Progress report created for Michael Chen</p>
              <p className="text-sm text-gray-600">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-full mr-3">
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Follow-up reminder for Emily Rodriguez</p>
              <p className="text-sm text-gray-600">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
