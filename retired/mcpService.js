const axios = require('axios');
require('dotenv').config();

/**
 * Executes a Fortnite MCP operation.
 * @param {string} accountId - The Epic Games account ID.
 * @param {string} route - The operation route (e.g., 'client').
 * @param {string} operation - The operation to perform (e.g., 'QueryProfile').
 * @param {string} profileId - The profile ID (e.g., 'common_core', 'athena').
 * @param {object} body - The request body for the operation.
 * @returns {Promise<object>} The response from the MCP API.
 */
async function executeMcpOperation(accountId, route, operation, profileId = 'common_core', body = {}) {
    const url = `https://fngw-mcp-gc-livefn.ol.epicgames.com/fortnite/api/game/v2/profile/${accountId}/${route}/${operation}`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Your valid access token

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: {
                profileId,
                rvn: -1, // Latest revision
            },
        });

        console.log('MCP Operation Response:', response.data);
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

module.exports = { executeMcpOperation };
