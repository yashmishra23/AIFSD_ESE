import React from 'react';
import api from '../api';

const EmployeeList = ({ employees, refreshList }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      refreshList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid">
      {employees.map(emp => (
        <div key={emp._id} className="card">
          <div className="flex-between">
            <h3>{emp.name}</h3>
            <span style={{ background: 'var(--primary-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
              Score: {emp.performanceScore}
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{emp.email}</p>
          <p><strong>Dept:</strong> {emp.department}</p>
          <p><strong>Exp:</strong> {emp.experience} years</p>
          <p><strong>Skills:</strong> {emp.skills.join(', ')}</p>
          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <button className="btn-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
          </div>
        </div>
      ))}
      {employees.length === 0 && <p>No employees found.</p>}
    </div>
  );
};

export default EmployeeList;
