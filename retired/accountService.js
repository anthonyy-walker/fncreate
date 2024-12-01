const axios = require('axios');
require('dotenv').config();

/**
 * Fetches the metadata of a given account.
 * @param {string} accountId - The account ID for which to retrieve metadata.
 * @returns {Promise<object>} The metadata of the account.
 */
async function getAccountMetadata(accountId) {
    const url = `https://account-public-service-prod.ol.epicgames.com/account/api/public/account/${accountId}`;
    const token = process.env.EPIC_ACCESS_TOKEN; // Your valid access token

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('Account Metadata Response:', response.data);
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

module.exports = { getAccountMetadata };
