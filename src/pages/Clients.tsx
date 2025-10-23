import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Filter,
  Eye,
  Edit,
  MoreVertical,
  User,
  Calendar,
  FileText
} from 'lucide-react';
import { mockClients } from '../data/mockData';
import { Client } from '../types';

const Clients: React.FC = () => {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client profiles and track their progress</p>
        </div>
        <Link to="/clients/new" className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Link>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name or diagnosis..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="input-field"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <div key={client.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-full mr-3">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.age} years old, {client.sex}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                  {client.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Diagnosis</p>
                <p className="text-sm text-gray-600">{client.diagnosis}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Symptoms</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {client.symptoms.map((symptom, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {client.totalSessions} sessions
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Last: {new Date(client.lastSession).toLocaleDateString()}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 line-clamp-2">{client.notes}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <Link
                to={`/clients/${client.id}`}
                className="btn-primary text-sm flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
              <button className="btn-secondary text-sm flex items-center">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || statusFilter !== 'All' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first client.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Clients;
