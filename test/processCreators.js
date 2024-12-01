const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { buildCreator } = require('../services/buildCreator');
const { connectDB } = require('../db/connect');
require('dotenv').config();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function processCreatorsFromCSV(filePath, accessToken, accountId, concurrencyLimit = 1, delayBetweenBatches = 2000) {
    try {
        console.log(`Reading CSV file: ${filePath}`);
        await connectDB();

        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

        const displayNames = [];
        for await (const line of rl) {
            const displayName = line.trim();
            if (displayName) displayNames.push(displayName);
        }

        console.log(`Found ${displayNames.length} creators in the file.`);

        for (let i = 0; i < displayNames.length; i += concurrencyLimit) {
            const batch = displayNames.slice(i, i + concurrencyLimit);
            console.log(`Processing batch ${Math.ceil(i / concurrencyLimit) + 1}: ${batch.join(', ')}`);
            
            await Promise.all(
                batch.map(displayName =>
                    buildCreator(displayName, accessToken, accountId)
                        .then(() => console.log(`Creator processed: ${displayName}`))
                        .catch(err => console.error(`Error processing creator "${displayName}":`, err.message))
                )
            );

            if (i + concurrencyLimit < displayNames.length) {
                console.log(`Waiting ${delayBetweenBatches}ms before next batch...`);
                await delay(delayBetweenBatches);
            }
        }

        console.log('All creators processed successfully.');
    } catch (error) {
        console.error('Error processing creators from CSV:', error.message);
        console.error(error.stack);
    }
}

// Example usage
(async () => {
    const filePath = path.resolve(__dirname, '../creatorList.csv');
    const accessToken = process.env.EPIC_ACCESS_TOKEN;
    const accountId = process.env.ACCOUNT_ID;
    const concurrencyLimit = 1; // Sequential processing
    const delayBetweenBatches = 0; // Delay between batches

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }

    if (!accessToken || !accountId) {
        console.error('Access token or account ID is missing. Ensure they are set in the .env file.');
        return;
    }

    console.log('Starting to process creators...');
    await processCreatorsFromCSV(filePath, accessToken, accountId, concurrencyLimit, delayBetweenBatches);
})();