const { executeMcpOperation } = require('../services/mcpService');
require('dotenv').config();

(async () => {
    try {
        const accountId = process.env.ACCOUNT_ID; // Replace with your actual account ID
        const route = 'client'; // Example route
        const operation = 'QueryProfile'; // Example operation
        const profileId = 'common_core'; // Try a public profile to debug
        const body = {}; // Request body specific to the operation

        const mcpResponse = await executeMcpOperation(accountId, route, operation, profileId, body);
        console.log('MCP Operation Result:', mcpResponse);
    } catch (error) {
        if (error.response) {
            console.error('Error Response Body:', JSON.stringify(error.response.data, null, 2));
        }
        console.error('MCP Operation Test Failed:', error.message);
    }
})();
