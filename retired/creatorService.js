const axios = require('axios');
require('dotenv').config();

/**
 * Searches for creators using the Epic Games Discovery Search Service.
 * @param {string} creatorTerm - The term to search for creators.
 * @param {string} accountId - Your Epic Games Account ID.
 * @returns {Promise<object>} The response from the Creator Search API.
 */
async function searchCreators(creatorTerm, accountId) {
    const url = `https://fn-service-discovery-search-live-public.ogs.live.on.epicgames.com/api/v1/creators/search`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Your valid access token

    const body = JSON.stringify({
        creatorTerm,
    });

    try {
        const response = await axios.post(`${url}?accountId=${accountId}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Creator Search Response:', response.data);
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

module.exports = { searchCreators };
