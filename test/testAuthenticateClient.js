const { authenticateClient } = require('../services/authService'); // Adjust the path as needed

(async () => {
    try {
        const authResponse = await authenticateClient();
        console.log('Access Token:', authResponse.access_token);
    } catch (error) {
        console.error('Failed to authenticate:', error.message);
    }
})();