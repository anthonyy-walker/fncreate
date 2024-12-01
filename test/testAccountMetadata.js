const { getAccountMetadata } = require('../services/accountService');
require('dotenv').config();

(async () => {
    try {
        const accountId = '433af04018bb46c1879ef48452b88137'; // Replace with the target account ID
        const metadata = await getAccountMetadata(accountId);
        console.log('Account Metadata:', metadata);
    } catch (error) {
        console.error('Account Metadata Test Failed:', error.message);
    }
})();
