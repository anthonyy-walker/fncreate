const axios = require('axios');
require('dotenv').config();

/**
 * Fetches published islands for a specified creator account.
 * @param {string} creatorAccountId - The account ID of the creator.
 * @param {string} playerId - Your Epic Games account ID.
 * @param {number} limit - The maximum number of results to return (default: 100).
 * @returns {Promise<object>} The response from the Creator Islands API.
 */
async function getCreatorIslands(creatorAccountId, playerId, limit = 100) {
    const url = `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v1/creator/page/${creatorAccountId}`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Your valid access token

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                playerId,
                limit,
            },
        });

        console.log('Creator Islands Response:', response.data);
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

module.exports = { getCreatorIslands };
