const axios = require('axios');

/**
 * Fetches all panels for a given discovery surface.
 * @param {string} surfaceName - The surface name to query (e.g., "CreativeDiscoverySurface_DelMar_TrackAndExperience").
 * @param {string} accessToken - Fortnite API access token.
 * @returns {Promise<object[]>} List of panels with `testVariantName` and `panelName`.
 */
async function fetchDiscoveryPanels(surfaceName, accessToken) {
    try {
        const branch = encodeURIComponent('++Fortnite+Release-32.10'); // Fortnite branch
        const url = `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v2/discovery/surface/${surfaceName}?appId=Fortnite&stream=${branch}`;

        const headers = {
            'Authorization' : `Bearer ${accessToken}`,
            'X-Epic-Access-Token': 'GX8HpwvNMPGxt+CGK09b2ltTnP8Yn4KJt7mb6RITTtQ=',
            'Content-Type': 'application/json',
        };

        const response = await axios.post(url, {}, { headers });

        if (response.data && response.data.panels) {
            return response.data.panels.map(panel => ({
                testVariantName: response.data.testVariantName,
                panelName: panel.panelName,
            }));
        }

        console.warn(`No panels found for surface: ${surfaceName}`);
        return [];
    } catch (error) {
        console.error('Error fetching panels:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { fetchDiscoveryPanels };





/*
const axios = require('axios');
const { access } = require('fs');
const querystring = require('querystring');


 * Fetches the Discovery Surface data from the API.
 * @param {string} surfaceName - The surface name to query (e.g., "DiscoverySurface").
 * @param {string} accessToken - Fortnite API access token.
 * @returns {Promise<object[]>} Discovery panels with map data.
 * 

async function fetchDiscoverySurface(surfaceName, accessToken) {

    try {
        const branch = encodeURIComponent('++Fortnite+Release-30.00'); // Use the provided branch name
        const url = `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v2/discovery/surface/CreativeDiscoverySurface_DelMar_TrackAndExperience?appId=Fortnite&stream=${encodeURIComponent('++Fortnite+Release-32.10')}`;

        const headers = {
            'Authorization' : `Bearer ${accessToken}`,
            'X-Epic-Access-Token': 'GX8HpwvNMPGxt+CGK09b2ltTnP8Yn4KJt7mb6RITTtQ=',
            'Content-Type': 'application/json',
        };

        const response = await axios.post(url, {}, { headers });

        if (response.data && response.data.panels) {
            return response.data.panels;
        } 
        console.warn('No panels found in Discovery Surface response.');
        return [];
    } catch (error) {
        console.error('Error fetching Discovery Surface data:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { fetchDiscoverySurface };
*/