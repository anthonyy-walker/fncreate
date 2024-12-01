const { fetchPopsPage } = require('../retired/popsService');
require('dotenv').config();

(async () => {
    try {
        const pagePlayerId = '7e2addef050245a5a41c06d177ff2676'; // Replace with the player ID whose page you want to fetch
        const accountId = process.env.ACCOUNT_ID; // Your account ID

        const popsData = await fetchPopsPage(pagePlayerId, accountId);
        console.log('POPS Page Data:', popsData);
    } catch (error) {
        console.error('POPS Service Test Failed:', error.message);
    }
})();
