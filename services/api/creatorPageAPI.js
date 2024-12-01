const axios = require('axios');

/**
 * Fetches maps published by the creator.
 * @param {string} creatorAccountId - The creator's account ID.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} playerId - Your Epic Games account ID.
 * @returns {Promise<Array>} - Array of maps with details like `globalCCU`.
 */
async function getCreatorMaps(creatorAccountId, accessToken, playerId) {
    const url = `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v1/creator/page/${creatorAccountId}`;
    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { playerId },
        });
        return response.data.links || [];
    } catch (error) {
        console.error('Error fetching creator maps:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { getCreatorMaps };
