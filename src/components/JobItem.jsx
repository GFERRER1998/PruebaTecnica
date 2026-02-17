import React, { useState } from 'react';
import { applyToJob } from '../services/api';

const JobItem = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl) return;

    setLoading(true);
    setStatus(null);

    const applicationData = {
      uuid: candidate.uuid,
      jobId: job.id,
      candidateId: candidate.candidateId,
      repoUrl: repoUrl,
    };

    try {
      await applyToJob(applicationData);
      setStatus('success');
      setRepoUrl(''); // Clear input on success
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-item">
      <h3 className="job-title">{job.title}</h3>
      <form onSubmit={handleSubmit} className="job-application-form">
        <input
          type="url"
          placeholder="GitHub Repo URL (https://github.com/...)"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Submitting...' : 'Submit API'}
        </button>
      </form>
      {status === 'success' && <p className="success-message">Application submitted successfully!</p>}
      {status === 'error' && <p className="error-message">Error submitting application. Please try again.</p>}
    </div>
  );
};

export default JobItem;
