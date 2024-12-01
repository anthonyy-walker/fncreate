//const { getAuthorizationCode } = require('../services/authService');
const { exchangeAuthorizationCode } = require('../services/exchangeService');

(async () => {
    try {
        console.log('Exchanging authorization code for access token...');
        const tokenResponse = await exchangeAuthorizationCode('3d7c8281e29f40d38053c13bccc95387');
        console.log('Access Token:', tokenResponse.access_token);
    } catch (error) {
        console.error('Account Authentication Test Failed:', error.message);
    }
})();