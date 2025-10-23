import React, { useState } from 'react';
import { 
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  User,
  Tag
} from 'lucide-react';
import { mockDocuments, mockClients } from '../data/mockData';
import { Document } from '../types';
import jsPDF from 'jspdf';

const Documents: React.FC = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const exportToPDF = (document: Document) => {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(18);
    pdf.text(document.title, 20, 30);
    
    // Add document info
    pdf.setFontSize(12);
    pdf.text(`Client: ${document.clientName}`, 20, 50);
    pdf.text(`Type: ${document.type}`, 20, 60);
    pdf.text(`Created: ${new Date(document.createdAt).toLocaleDateString()}`, 20, 70);
    
    // Add content
    pdf.setFontSize(10);
    const contentLines = pdf.splitTextToSize(document.content, 170);
    pdf.text(contentLines, 20, 90);
    
    // Add tags
    if (document.tags.length > 0) {
      pdf.text(`Tags: ${document.tags.join(', ')}`, 20, pdf.internal.pageSize.height - 20);
    }
    
    pdf.save(`${document.title}.pdf`);
  };

  const documentTypes = [
    'Session Report',
    'Assessment',
    'Test Result',
    'Treatment Plan',
    'Progress Note'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage reports, assessments, and clinical documents</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Document
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents by title, client, or content..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="input-field"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              {documentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 rounded-full mr-3">
                  <FileText className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{document.title}</h3>
                  <p className="text-sm text-gray-600">{document.clientName}</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                {document.type}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-700 line-clamp-3">{document.content}</p>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {document.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(document.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedDocument(document)}
                className="btn-secondary text-sm flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => exportToPDF(document)}
                  className="btn-primary text-sm flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || typeFilter !== 'All' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by creating your first document.'
            }
          </p>
        </div>
      )}

      {/* Create Document Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Document</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                    <select className="input-field">
                      {documentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <select className="input-field">
                      {mockClients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" className="input-field" placeholder="Enter document title" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea 
                    className="input-field h-32" 
                    placeholder="Enter document content..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                  <input type="text" className="input-field" placeholder="anxiety, progress, assessment" />
                </div>
                
                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{selectedDocument.title}</h3>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Client</p>
                    <p className="text-gray-900">{selectedDocument.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type</p>
                    <p className="text-gray-900">{selectedDocument.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Created</p>
                    <p className="text-gray-900">{new Date(selectedDocument.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Content</h4>
                  <div className="p-4 bg-white border rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedDocument.content}</p>
                  </div>
                </div>
                
                {selectedDocument.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDocument.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 text-sm bg-primary-100 text-primary-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setSelectedDocument(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => exportToPDF(selectedDocument)}
                    className="btn-primary flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
