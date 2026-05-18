import React, { useState } from 'react';
import api from '../api';

const AIRecommendation = ({ employees }) => {
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    if (employees.length === 0) return alert("No employees to analyze");
    setLoading(true);
    try {
      const res = await api.post('/ai/recommend', { employees });
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error(err);
      alert('Error fetching AI insights');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="glass-container">
        <h2>AI Insights & Recommendations</h2>
        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          Generate AI-powered performance analysis, promotion suggestions, and training paths for all your employees.
        </p>
        <button onClick={getRecommendation} className="btn-primary" style={{ width: 'auto' }} disabled={loading}>
          {loading ? 'Analyzing...' : 'Generate AI Report'}
        </button>

        {recommendation && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6' }}>
              {recommendation}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendation;
