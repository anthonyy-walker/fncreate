const axios = require('axios');
require('dotenv').config();

/**
 * Fetches Mnemonic information for a given namespace and mnemonic.
 * @param {string} namespace - The namespace (e.g., 'fn' for Fortnite).
 * @param {string} mnemonic - The mnemonic (e.g., '1111-1111-1111').
 * @param {object} queryParams - Additional query parameters (e.g., type, v, includeActivationHistory).
 * @returns {Promise<object>} The response from the Mnemonic Info API.
 */
async function getMnemonicInfo(namespace, mnemonic, queryParams = {}) {
    const url = `https://links-public-service-live.ol.epicgames.com/links/api/${namespace}/mnemonic/${mnemonic}`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Your valid access token

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: queryParams, // Pass additional query parameters
        });

        console.log('Mnemonic Info Response:', response.data);
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

module.exports = { getMnemonicInfo };
