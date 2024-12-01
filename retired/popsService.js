const axios = require('axios');
require('dotenv').config();

/**
 * Fetches POPS API data for a specified pagePlayerId and accountId.
 * @param {string} pagePlayerId - The player ID whose page data you want to fetch.
 * @param {string} accountId - Your account ID to include in the query.
 * @returns {Promise<object>} The response from the POPS API.
 */
async function fetchPopsPage(pagePlayerId, accountId) {
    const url = `https://pops-api-live-public.ogs.live.on.epicgames.com/page/v1/${pagePlayerId}`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Fortnite access token

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: {
                playerId: accountId,
            },
        });

        console.log('POPS API Response:', response.data);
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

module.exports = { fetchPopsPage };
