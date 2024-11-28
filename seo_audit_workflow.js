const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = process.env.SEOPTIMER_BASE_URL;
const API_KEY = process.env.SEOPTIMER_API_KEY;

// Function to submit a website for SEO auditing
async function submitWebsiteForAudit(websiteUrl) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/audit`,
      { url: websiteUrl },
      {
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Audit Submission Response:', response.data);
    return response.data; // Assuming this includes the audit ID or result link
  } catch (error) {
    console.error('Error submitting website for audit:', error.response?.data || error.message);
    throw error;
  }
}

// Function to fetch the SEO audit report
async function fetchAuditReport(auditId) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/audit/${auditId}`,
      {
        headers: {
          'X-Api-Key': API_KEY,
        },
      }
    );

    console.log('Audit Report:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching audit report:', error.response?.data || error.message);
    throw error;
  }
}

// Workflow to integrate with GHL
async function seoAuditWorkflow(websiteUrl) {
  try {
    console.log(`Starting SEO audit for: ${websiteUrl}`);

    // Step 1: Submit the website URL for SEO audit
    const auditSubmissionResponse = await submitWebsiteForAudit(websiteUrl);

    const auditId = auditSubmissionResponse.audit_id; // Replace with actual field from response
    console.log(`Audit initiated. Audit ID: ${auditId}`);

    // Step 2: Wait for the report to be generated
    console.log('Waiting for the report to be ready...');
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds (adjust as needed)

    // Step 3: Fetch the audit report
    const auditReport = await fetchAuditReport(auditId);

    // Step 4: Process and display the report
    console.log('Final Audit Report:', auditReport);
    return auditReport;
  } catch (error) {
    console.error('Workflow failed:', error.message);
  }
}

// Example usage
const websiteUrl = 'https://example.com';
seoAuditWorkflow(websiteUrl);
