const axios = require('axios');

/**
 * Fetches creator data using the POPS API.
 * @param {string} creatorAccountId - The creator's account ID.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} accountId - Your Epic Games account ID.
 * @returns {Promise<Object>} - Creator data including bio, socials, and images.
 */
async function getCreatorDetails(creatorAccountId, accessToken, accountId) {
    const url = `https://pops-api-live-public.ogs.live.on.epicgames.com/page/v1/${creatorAccountId}`;
    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { playerId: accountId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching creator details:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { getCreatorDetails };
