const { searchCreators } = require('../retired/creatorService');
require('dotenv').config();

(async () => {
    try {
        const creatorTerm = 'geerzy'; // Replace with your desired search term
        const accountId = process.env.ACCOUNT_ID; // Your Epic Games Account ID
        const searchResponse = await searchCreators(creatorTerm, accountId);
        console.log('Search Results:', searchResponse);
    } catch (error) {
        console.error('Creator Search Test Failed:', error.message);
    }
})();
