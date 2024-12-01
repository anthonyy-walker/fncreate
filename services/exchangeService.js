const axios = require('axios');
require('dotenv').config();

/**
 * Exchanges an authorization code for an access token.
 * @param {string} authorizationCode - The authorization code to exchange.
 * @returns {Promise<object>} The authentication response.
 */
async function exchangeAuthorizationCode(authorizationCode) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  //  const scope = 'discovery:7e2addef050245a5a41c06d177ff2676:creator:page READ:links:fn READ:account:public:account READ:fortnite:discovery:fortnite READ:discovery:surface:query READ:fortnite:play fortnite:discovery:query fortnite:discovery:search:client fortnite:stats:read';

    const body = `grant_type=authorization_code&code=${authorizationCode}`;
    //&scope=${encodeURIComponent(scope)}`;

    try {
        const response = await axios.post(
            'https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token',
            body,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`,
                },
            }
        );

        console.log('Access Token Response:', response.data);
        return response.data; // Returns access token and other session details
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

module.exports = { exchangeAuthorizationCode };
