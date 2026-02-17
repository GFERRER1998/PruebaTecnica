import React, { useState } from 'react';
import { applyToJob } from '../services/api';

const ApplicationForm = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    if (!job.title.toLowerCase().includes('fullstack')) {
      const isConfirmed = window.confirm(
        "⚠️ Atención: Esta no es la posición del desafío (Fullstack Developer). ¿Estás seguro de que deseas aplicar aquí?"
      );
      if (!isConfirmed) return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    const applicationData = {
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      applicationId: candidate.applicationId,
      repoUrl: repoUrl,
    };

    try {
      await applyToJob(applicationData);
      setStatus('success');
      setRepoUrl('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      const msg = error.response?.data?.error || error.response?.data?.message || error.message || 'Error submitting application.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-form-container">
       <form onSubmit={handleSubmit} className="job-application-form">
        <label className="input-label">GitHub / Web / Portfolio Personal</label>
        <input
          type="url"
          placeholder=""
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          className="input-field"
        />
        
        <button 
          type="submit" 
          disabled={loading} 
          className="submit-button"
        >
          {loading ? 'Applying...' : 'Apply'}
        </button>
      </form>
      {status === 'success' && <p className="success-message">Application submitted successfully!</p>}
      {status === 'error' && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default ApplicationForm;
