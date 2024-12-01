const { buildMaps } = require('../services/buildMap');
require('dotenv').config();

/**
 * Test the buildMaps function.
 */
(async () => {
    const accessToken = process.env.EPIC_ACCESS_TOKEN; // Ensure this is set in your .env file
    const accountId = process.env.ACCOUNT_ID; // Your Epic Games account ID

    try {
        console.log('Starting buildMaps test...');
        await buildMaps(accessToken, accountId);
        console.log('buildMaps test completed successfully.');
    } catch (error) {
        console.error('Error testing buildMaps:', error.message);
        console.error(error.stack);
    }
})();
