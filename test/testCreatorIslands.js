const { getCreatorIslands } = require('../services/creatorIslandsService');
require('dotenv').config();

(async () => {
    try {
        const creatorAccountId = '2b5ee21d4edb46d0a5e381722d82aa24'; // Replace with the creator's account ID
        const playerId = process.env.ACCOUNT_ID; // Your Epic Games account ID
        const limit = 50; // Set a limit (default: 100)

        const islandsResponse = await getCreatorIslands(creatorAccountId, playerId, limit);
        console.log('Creator Islands:', islandsResponse);
    } catch (error) {
        console.error('Creator Islands Test Failed:', error.message);
    }
})();
