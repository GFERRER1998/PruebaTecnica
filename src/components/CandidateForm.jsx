import React, { useState } from 'react';

const CandidateForm = ({ onCandidateFound }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
        await onCandidateFound(email);
    } catch (err) {
      console.error(err);
      setError('Could not find candidate with that email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="candidate-form-container">
      <h2>Enter your email to start</h2>
      <form onSubmit={handleSubmit} className="candidate-form">
        <input
          type="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Loading...' : 'Start'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CandidateForm;
