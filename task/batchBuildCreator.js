const { buildCreator } = require('../services/buildCreator');
require('dotenv').config();

(async () => {
    const displayNames = ['epic', 'theboydilly', 'bullseye', 'prettyboy']; // Replace with the list of creator names
    const accessToken = process.env.EPIC_ACCESS_TOKEN; // Fortnite API access token
    const accountId = process.env.ACCOUNT_ID; // Your Epic Games account ID

    try {
        console.log('Starting batch build for creators...');

        // Create an array of promises for each display name
        const buildPromises = displayNames.map(displayName =>
            buildCreator(displayName, accessToken, accountId)
        );

        // Execute all buildCreator calls in parallel
        const results = await Promise.all(buildPromises);

        console.log('Batch build completed successfully.');
        results.forEach((result, index) => {
            console.log(`Result for "${displayNames[index]}":`, result);
        });
    } catch (error) {
        console.error('Error during batch build:', error.message);
    }
})();
