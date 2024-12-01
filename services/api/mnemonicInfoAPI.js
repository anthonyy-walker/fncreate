const axios = require('axios');

/**
 * Fetches mnemonic information for a specific map or playlist.
 * @param {string} mnemonic - The unique mnemonic (e.g., linkCode) for the map or playlist.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} namespace - The namespace (e.g., 'fn' for Fortnite).
 * @returns {Promise<object>} - The mnemonic info data.
 */
async function getMnemonicInfo(mnemonic, accessToken, namespace = 'fn') {
    try {
        const url = `https://links-public-service-live.ol.epicgames.com/links/api/${namespace}/mnemonic/${mnemonic}`;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
        };

        // Determine the type based on some logic
        const isBR = mnemonic.startsWith('set_');
        let params = {};
        if (isBR) {
             params = {
                type: 'ModeSet',
                includeActivationHistory: true,
            } 
        } else {
             params = {
                type: 'Creative:Island',
                includeActivationHistory: true,
            }
        }
        const response = await axios.get(url, { headers, });
        if (response.data) {
            return response.data;
        }

        console.warn(`No data found for mnemonic: ${mnemonic}`);
        return null;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.log(error.response);
                console.error(`Bad request for mnemonic: ${mnemonic}. Please check the parameters.`);
            } else if (error.response.status === 404) {
                console.error(`Mnemonic not found: ${mnemonic}.`);
            } else {
                console.error(`API returned an error: ${error.response.status} - ${error.response.statusText}`);
            }
        } else {
            console.error(`An error occurred: ${error.message}`);
        }
        return null;
    }
}

module.exports = { getMnemonicInfo };
