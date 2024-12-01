const { updateAllCreators } = require('../updates/updateCreators');
require('dotenv').config();

(async () => {
    const accessToken = process.env.EPIC_ACCESS_TOKEN; // Ensure this is set in your .env file
    const accountId = process.env.ACCOUNT_ID;

    try {
        console.log('Starting update for all creators.');
        await updateAllCreators(accessToken, accountId);
        console.log('All creators updated successfully.');
    } catch (error) {
        console.error('Error during update:', error.message);
    }
})();
