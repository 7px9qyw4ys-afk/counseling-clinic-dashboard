import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Edit,
  Calendar,
  FileText,
  TrendingUp,
  User,
  Phone,
  Mail,
  MapPin,
  Plus,
  Download
} from 'lucide-react';
import { mockClients, mockAppointments, mockDocuments } from '../data/mockData';
import { Client } from '../types';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const client = mockClients.find(c => c.id === id);
  const clientAppointments = mockAppointments.filter(apt => apt.clientId === id);
  const clientDocuments = mockDocuments.filter(doc => doc.clientId === id);

  if (!client) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Client not found</h3>
        <p className="mt-1 text-sm text-gray-500">The client you're looking for doesn't exist.</p>
        <Link to="/clients" className="btn-primary mt-4">
          Back to Clients
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'sessions', name: 'Sessions', icon: Calendar },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'progress', name: 'Progress', icon: TrendingUp },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/clients" className="mr-4 text-gray-400 hover:text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600">Client Profile & Progress Tracking</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
          <button className="btn-primary flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Client Info Card */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-full mr-4">
              <User className="h-8 w-8 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">{client.age} years old, {client.sex}</p>
              <div className="flex items-center mt-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
                <span className="ml-3 text-sm text-gray-500">
                  Joined {new Date(client.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Sessions</p>
            <p className="text-2xl font-bold text-primary-600">{client.totalSessions}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Diagnosis & Treatment */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagnosis & Treatment</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Primary Diagnosis</p>
                <p className="text-gray-900">{client.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Treatment Plan</p>
                <p className="text-gray-900">{client.treatmentPlan}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Symptoms</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {client.symptoms.map((symptom, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Session History */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="space-y-3">
              {clientAppointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.type}</p>
                    <p className="text-sm text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.duration}min</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Notes</h3>
            <p className="text-gray-700">{client.notes}</p>
          </div>
        </div>
      )}

      {activeTab === 'sessions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Session History</h3>
            <button className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </button>
          </div>
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {appointment.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Documents & Reports</h3>
            <button className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientDocuments.map((document) => (
              <div key={document.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-8 w-8 text-primary-600" />
                  <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                    {document.type}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{document.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{document.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(document.createdAt).toLocaleDateString()}</span>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Progress Tracking</h3>
          <div className="card">
            <div className="text-center py-12">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Progress Charts</h3>
              <p className="mt-1 text-sm text-gray-500">
                Visual progress tracking will be available here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetail;
