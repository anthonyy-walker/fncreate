const axios = require('axios');
require('dotenv').config();

/**
 * Fetches a discovery surface page using the Discovery Service V2.
 * @param {string} surfaceName - The name of the surface to query.
 * @param {object} requestBody - The request body for the API call.
 * @param {string} appId - The app ID (e.g., Fortnite).
 * @param {string} stream - The branch (URL encoded).
 * @returns {Promise<object>} The response from the Discovery Surface API.
 */
async function getDiscoverySurfacePage(surfaceName, requestBody, appId = 'Fortnite', stream = '%2B%2BFortnite%2BRelease-32.10') {
    const url = `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v2/discovery/surface/${surfaceName}/page?appId=Fortnite&stream=${stream}`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Your valid access token

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Epic-Access-Token': '6liJ9OTYJpwtx0+jApUc/OYtq2eHDXFHTIp4nfJgduc=',
            },
        });

        console.log('Discovery Surface Page Response:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.statusText);
            console.error('Response Body:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
        throw error;
    }
}

module.exports = { getDiscoverySurfacePage };
