import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    motivation: '',
    availability: '',
    education: '',
    skills: ''
  });
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      
      // Add form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add resume file
      if (resume) {
        formDataToSend.append('resume', resume);
      }

      const response = await axios.post('/api/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          role: '',
          experience: '',
          motivation: '',
          availability: '',
          education: '',
          skills: ''
        });
        setResume(null);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="container">
        <div className="registration-header">
          <h1>Join Our Team</h1>
          <p>Apply to become an intern or volunteer with Basti Ki Pathshala Foundation</p>
        </div>

        <div className="registration-form-container">
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">Position Applied For *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select a position</option>
                <option value="intern">Intern</option>
                <option value="volunteer">Volunteer</option>
                <option value="teacher">Teaching Assistant</option>
                <option value="coordinator">Program Coordinator</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="education" className="form-label">Education Background *</label>
              <textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
                placeholder="Please describe your educational background, current studies, or qualifications..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience" className="form-label">Relevant Experience</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
                placeholder="Describe any relevant experience in teaching, volunteering, or community work..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills" className="form-label">Skills & Strengths</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
                placeholder="List your skills, languages, or special abilities that could benefit our programs..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivation" className="form-label">Motivation *</label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                className="form-control"
                rows="4"
                placeholder="Why do you want to join Basti Ki Pathshala Foundation? What drives you to work with underserved communities?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability" className="form-label">Availability *</label>
              <textarea
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="form-control"
                rows="3"
                placeholder="Please describe your availability (days, hours, duration of commitment)..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume" className="form-label">Resume/CV (Optional)</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
                className="form-control"
                accept=".pdf,.doc,.docx"
              />
              <small className="form-text">Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
            </div>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                <h4>Application Submitted Successfully!</h4>
                <p>Thank you for your interest in joining Basti Ki Pathshala Foundation. We will review your application and get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="alert alert-error">
                <h4>Submission Failed</h4>
                <p>There was an error submitting your application. Please try again or contact us directly.</p>
              </div>
            )}

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration; 