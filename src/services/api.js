import axios from 'axios';

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/candidate/get-by-email`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate:', error);
    throw error;
  }
};

export const getJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/jobs/get-list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export const applyToJob = async (applicationData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/candidate/apply-to-job`, applicationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};
