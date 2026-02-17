import { useState } from 'react';
import './App.css';
import CandidateForm from './components/CandidateForm';
import JobList from './components/JobList';
import { getCandidateByEmail, getJobs } from './services/api';

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCandidateFound = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const candidateData = await getCandidateByEmail(email);
      setCandidate(candidateData);
      
      // Once we have the candidate, fetch jobs
      const jobsList = await getJobs();
      setJobs(jobsList);
    } catch (err) {
      console.error('Candidate fetch error:', err);
      setError('Error fetching data. Please check the email and try again.');
      // Reset candidate if fetch fails
      setCandidate(null); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Nimble Gravity Challenge</h1>
      </header>

      {error && <p className="error-message">{error}</p>}
      {loading && !candidate && <p>Loading data...</p>}

      {!candidate ? (
        <CandidateForm onCandidateFound={handleCandidateFound} />
      ) : (
        <>
          <div className="user-info">
            <p>Welcome, <strong>{candidate.firstName} {candidate.lastName}</strong></p>
          </div>
          <JobList jobs={jobs} candidate={candidate} />
        </>
      )}
    </div>
  );
}

export default App;
