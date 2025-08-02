import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const Admin = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/applicants');
      setApplicants(response.data);
    } catch (err) {
      setError('Failed to fetch applicants');
      console.error('Error fetching applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/applicants/${id}/status`, { status });
      setApplicants(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredApplicants = applicants.filter(applicant => {
    const matchesFilter = filter === 'all' || applicant.status === filter;
    const matchesSearch = 
      applicant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'badge-warning', text: 'Pending' },
      approved: { class: 'badge-success', text: 'Approved' },
      rejected: { class: 'badge-danger', text: 'Rejected' },
      contacted: { class: 'badge-info', text: 'Contacted' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="loading">Loading applicants...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage intern and volunteer applications</p>
        </div>

        <div className="admin-controls">
          <div className="search-filter">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="contacted">Contacted</option>
            </select>
          </div>
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">{applicants.length}</div>
              <div className="stat-label">Total Applications</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {applicants.filter(app => app.status === 'pending').length}
              </div>
              <div className="stat-label">Pending Review</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {applicants.filter(app => app.status === 'approved').length}
              </div>
              <div className="stat-label">Approved</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {applicants.filter(app => app.status === 'rejected').length}
              </div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>
        </div>

        <div className="applicants-grid">
          {filteredApplicants.length === 0 ? (
            <div className="no-applicants">
              <p>No applications found matching your criteria.</p>
            </div>
          ) : (
            filteredApplicants.map(applicant => (
              <div key={applicant.id} className="applicant-card">
                <div className="applicant-header">
                  <div>
                    <div className="applicant-name">{applicant.firstName} {applicant.lastName}</div>
                    <div className="applicant-email">{applicant.email}</div>
                  </div>
                  {getStatusBadge(applicant.status)}
                </div>
                
                <div className="applicant-details">
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{applicant.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Position:</span>
                    <span className="detail-value">{applicant.role}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Applied:</span>
                    <span className="detail-value">{formatDate(applicant.appliedAt)}</span>
                  </div>
                </div>

                <div className="applicant-actions">
                  <button
                    className="action-btn view-btn"
                    onClick={() => setSelectedApplicant(applicant)}
                  >
                    View Details
                  </button>
                  <button
                    className="action-btn approve-btn"
                    onClick={() => updateStatus(applicant.id, 'approved')}
                    disabled={applicant.status === 'approved'}
                  >
                    Approve
                  </button>
                  <button
                    className="action-btn reject-btn"
                    onClick={() => updateStatus(applicant.id, 'rejected')}
                    disabled={applicant.status === 'rejected'}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Applicant Detail Modal */}
        {selectedApplicant && (
          <div className="modal-overlay" onClick={() => setSelectedApplicant(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">{selectedApplicant.firstName} {selectedApplicant.lastName}</div>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedApplicant(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-detail">
                  <h4>Contact Information</h4>
                  <p><strong>Email:</strong> {selectedApplicant.email}</p>
                  <p><strong>Phone:</strong> {selectedApplicant.phone}</p>
                  <p><strong>Position:</strong> {selectedApplicant.role}</p>
                  <p><strong>Applied:</strong> {formatDate(selectedApplicant.appliedAt)}</p>
                </div>

                <div className="modal-detail">
                  <h4>Education Background</h4>
                  <p>{selectedApplicant.education}</p>
                </div>

                {selectedApplicant.experience && (
                  <div className="modal-detail">
                    <h4>Experience</h4>
                    <p>{selectedApplicant.experience}</p>
                  </div>
                )}

                {selectedApplicant.skills && (
                  <div className="modal-detail">
                    <h4>Skills & Strengths</h4>
                    <p>{selectedApplicant.skills}</p>
                  </div>
                )}

                <div className="modal-detail">
                  <h4>Motivation</h4>
                  <p>{selectedApplicant.motivation}</p>
                </div>

                <div className="modal-detail">
                  <h4>Availability</h4>
                  <p>{selectedApplicant.availability}</p>
                </div>

                {selectedApplicant.resume && (
                  <div className="modal-detail">
                    <h4>Resume</h4>
                    <a 
                      href={selectedApplicant.resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="action-btn view-btn"
                    >
                      View Resume
                    </a>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button 
                  className="action-btn approve-btn"
                  onClick={() => {
                    updateStatus(selectedApplicant.id, 'approved');
                    setSelectedApplicant({
                      ...selectedApplicant,
                      status: 'approved'
                    });
                  }}
                  disabled={selectedApplicant.status === 'approved'}
                >
                  Approve
                </button>
                <button 
                  className="action-btn reject-btn"
                  onClick={() => {
                    updateStatus(selectedApplicant.id, 'rejected');
                    setSelectedApplicant({
                      ...selectedApplicant,
                      status: 'rejected'
                    });
                  }}
                  disabled={selectedApplicant.status === 'rejected'}
                >
                  Reject
                </button>
                <button 
                  className="action-btn view-btn"
                  onClick={() => setSelectedApplicant(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 