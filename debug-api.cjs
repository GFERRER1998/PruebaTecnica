const axios = require('axios');

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';
// Use a random email or a test one to see if we can perform the flow
const EMAIL = 'test_candidate_' + Date.now() + '@example.com'; 

async function testFlow() {
  try {
    console.log(`1. Fetching candidate for ${EMAIL}...`);
    // NOTE: The API documentation says "GET {BASE_URL}/api/candidate/get-by-email?email=TU_EMAIL"
    // It implies we might need a valid email that already applied? 
    // Or maybe it creates one? The prompt said: "Recibimos tu postulación... En este mail te adjuntamos un pequeño challenge"
    // So the user MUST use the email they presumably applied with initially.
    // Testing with a random email might fail if the API checks against a whitelist.
    
    // Let's try with the example email from the prompt to see if that works as a 'demo' user: 'jane.doe@example.com'
    // But the prompt says "Respuesta (200): ... jane.doe@example.com". 
    
    const emailToUse = 'jane.doe@example.com';
    
    const candidateRes = await axios.get(`${BASE_URL}/api/candidate/get-by-email`, {
      params: { email: emailToUse }
    });
    
    console.log('Candidate Data:', candidateRes.data);
    const { uuid, candidateId } = candidateRes.data;

    console.log('2. Fetching jobs...');
    const jobsRes = await axios.get(`${BASE_URL}/api/jobs/get-list`);
    const job = jobsRes.data.find(j => j.title === 'Fullstack developer');
    
    if (!job) {
      console.error('Job not found');
      return;
    }
    console.log('Job found:', job.id);

    console.log('3. Submitting application...');
    const payload = {
      uuid,
      jobId: job.id,
      candidateId,
      repoUrl: 'https://github.com/GFERRER1998/PruebaTecnica'
    };
    
    console.log('Payload:', payload);

    try {
        const applyRes = await axios.post(`${BASE_URL}/api/candidate/apply-to-job`, payload, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Success:', applyRes.data);
    } catch (applyErr) {
        if (applyErr.response) {
            console.error('Apply Error Status:', applyErr.response.status);
            console.error('Apply Error Data:', applyErr.response.data);
        } else {
            console.error('Apply Error:', applyErr.message);
        }
    }

  } catch (err) {
    if (err.response) {
        console.error('General Error Status:', err.response.status);
        console.error('General Error Data:', err.response.data);
    } else {
        console.error('General Error:', err.message);
    }
  }
}

testFlow();
