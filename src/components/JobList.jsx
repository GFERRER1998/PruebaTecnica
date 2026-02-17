import React from 'react';
import JobItem from './JobItem';

const jobDescriptions = {
  "Fullstack developer": "Develop and maintain web applications using modern technologies.",
  "Head Chef": "Lead kitchen staff and create innovative menus.",
  "Veterinarian": "Diagnose and treat animals to ensure their health and well-being.",
  "Civil Engineer": "Design and supervise infrastructure projects.",
  "Interior Designer": "Plan and design functional and aesthetic interior spaces.",
  "Flight Attendant": "Ensure passenger safety and comfort during flights.",
  "Marine Biologist": "Study marine life and ecosystems.",
  "Landscape Architect": "Design outdoor spaces, parks, and gardens.",
  "Pastry Chef": "Create delicious pastries and desserts.",
  "Physical Therapist": "Help patients improve movement and manage pain."
};

const JobList = ({ jobs, candidate }) => {
  if (!jobs || jobs.length === 0) {
    return <p className="no-jobs">No jobs available at the moment.</p>;
  }

  return (
    <div className="job-list">
      <h2>Available Positions</h2>
      <div className="job-grid">
        {jobs.map((job) => (
          <JobItem 
            key={job.id} 
            job={job} 
            candidate={candidate} 
            description={jobDescriptions[job.title] || "Join our team in this exciting role."}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
