import React from 'react';
import ApplicationForm from './ApplicationForm';

const JobItem = ({ job, candidate, description }) => {
  return (
    <div className="job-item">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-description">{description}</p>
      <ApplicationForm job={job} candidate={candidate} />
    </div>
  );
};

export default JobItem;
