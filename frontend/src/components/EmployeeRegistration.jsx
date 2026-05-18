import React, { useState } from 'react';
import api from '../api';

const EmployeeRegistration = ({ refreshList }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', department: '', skills: '', performanceScore: '', experience: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim());
      await api.post('/employees', {
        ...formData,
        skills: skillsArray,
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      });
      alert('Employee stored successfully');
      setFormData({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
      refreshList();
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to add employee');
    }
  };

  return (
    <div className="glass-container" style={{ marginBottom: '2rem' }}>
      <h3>Add New Employee</h3>
      <form onSubmit={handleSubmit} className="grid">
        <input className="input-field" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input type="email" className="input-field" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input className="input-field" placeholder="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} required />
        <input className="input-field" placeholder="Skills (comma separated)" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} required />
        <input type="number" className="input-field" placeholder="Performance Score (0-100)" value={formData.performanceScore} onChange={e => setFormData({...formData, performanceScore: e.target.value})} required />
        <input type="number" className="input-field" placeholder="Years of Experience" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} required />
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" className="btn-primary">Register Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
