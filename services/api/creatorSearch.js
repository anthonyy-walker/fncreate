const axios = require('axios');

/**
 * Searches for creators by display name.
 * @param {string} creatorTerm - The creator's display name.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} accountId - Your Epic Games account ID.
 * @returns {Promise<Array>} - Array of creators with account IDs.
 */
async function searchCreator(creatorTerm, accessToken, accountId) {
    const url = 'https://fn-service-discovery-search-live-public.ogs.live.on.epicgames.com/api/v1/creators/search';  
    const body = JSON.stringify({
        creatorTerm,
    });
    try {
        const response = await axios.post(`${url}?accountId=${accountId}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Error searching for creators:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { searchCreator };
