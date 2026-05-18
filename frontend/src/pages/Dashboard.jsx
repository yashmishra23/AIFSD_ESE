import React, { useState, useEffect } from 'react';
import EmployeeRegistration from '../components/EmployeeRegistration';
import EmployeeList from '../components/EmployeeList';
import api from '../api';

const Dashboard = ({ employees, setEmployees, fetchEmployees }) => {
  const [searchDept, setSearchDept] = useState('');

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/employees/search?department=${searchDept}`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setSearchDept('');
    fetchEmployees();
  };

  return (
    <div className="page-container">
      <EmployeeRegistration refreshList={fetchEmployees} />
      
      <div className="glass-container" style={{ marginBottom: '2rem' }}>
        <h3>Search & Filter</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            className="input-field" 
            style={{ marginBottom: 0 }}
            placeholder="Search by Department..." 
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ width: 'auto' }}>Search</button>
          <button type="button" className="btn-primary" style={{ width: 'auto', background: 'var(--text-muted)' }} onClick={handleReset}>Reset</button>
        </form>
      </div>

      <div className="glass-container">
        <h3 style={{ marginBottom: '1.5rem' }}>Employee Directory</h3>
        <EmployeeList employees={employees} refreshList={fetchEmployees} />
      </div>
    </div>
  );
};

export default Dashboard;
