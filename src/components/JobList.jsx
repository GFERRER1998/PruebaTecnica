import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs, candidate }) => {
  if (!jobs || jobs.length === 0) {
    return <p className="no-jobs">No jobs available at the moment.</p>;
  }

  return (
    <div className="job-list">
      <h2>Available Positions</h2>
      <div className="job-grid">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} candidate={candidate} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
