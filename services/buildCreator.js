const { searchCreator } = require('./api/creatorSearch');
const { getCreatorDetails } = require('./api/popsAPI');
const { getCreatorMaps } = require('./api/creatorPageAPI');
const { calculateTotalPlayers } = require('./metrics');
const Creator = require('../db/creatorSchema');
const { connectDB, getDB } = require('../db/connect');

/**
 * Builds or updates a creator in the database using the provided display name.
 * @param {string} displayName - Creator's display name.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} accountId - Your Epic Games account ID.
 */
async function buildCreator(displayName, accessToken, accountId) {
    try {
        console.log(`Starting build for creator: ${displayName}`);

        // Step 1: Connect to MongoDB
        await connectDB();
        const db = getDB('FNStats');
        const creatorsCollection = db.collection('creators');

        // Step 2: Search for the creator by display name
        console.log(`Searching for creator: ${displayName}`);
        const creators = await searchCreator(displayName, accessToken, accountId);

        if (creators.length === 0) {
            console.error(`Creator "${displayName}" not found.`);
            return;
        }

        // Process only the first creator
        const creator = creators[0];
        console.log(`Found creator: ${creator.accountId}. Fetching details...`);

        // Step 3: Fetch creator details
        const details = await getCreatorDetails(creator.accountId, accessToken, accountId);
        if (!details) {
            console.error(`No details found for creator "${displayName}".`);
            return;
        }

        // Step 4: Fetch creator's published maps
        console.log(`Fetching maps for creator: ${details.displayName}`);
        const maps = await getCreatorMaps(creator.accountId, accessToken, accountId);

        if (!maps || maps.length === 0) {
            console.warn(`No maps found for creator "${details.displayName}".`);
        }

        // Step 5: Calculate total players
        const totalPlayers = calculateTotalPlayers(maps);

        // Prepare player history entry
        const playerHistoryEntry = {
            timestamp: new Date(),
            totalPlayers,
        };

        // Step 6: Check if creator already exists in the database
        const existingCreator = await creatorsCollection.findOne({ creatorId: creator.accountId });

        if (existingCreator) {
            console.log(`Creator "${details.displayName}" already exists. Updating details.`);

            // Update creator
            await creatorsCollection.updateOne(
                { creatorId: creator.accountId },
                {
                    $set: {
                        bio: details.bio || existingCreator.bio,
                        images: details.images || existingCreator.images,
                        social: details.social || existingCreator.social,
                        totalPlayers,
                    },
                    $push: {
                        playerHistory: playerHistoryEntry,
                    },
                }
            );

            console.log(`Creator "${details.displayName}" updated successfully.`);
            return;
        }

        // Step 7: Save new creator to database
        const newCreator = new Creator({
            creatorId: creator.accountId,
            displayName: details.displayName,
            bio: details.bio,
            images: details.images,
            social: details.social,
            totalPlayers,
            playerHistory: [playerHistoryEntry],
        });

        await creatorsCollection.insertOne(newCreator);
        console.log(`Creator "${details.displayName}" saved successfully.`);
    } catch (error) {
        console.error('Error building creator:', error.message);
        console.error(error.stack);
    }
}

module.exports = { buildCreator };
