const { getCreatorDetails } = require('../services/api/popsAPI');
const { getCreatorMaps } = require('../services/api/creatorPageAPI');
const { calculateTotalPlayers } = require('../services/metrics');
const Creator = require('../db/creatorSchema');
const { connectDB, getDB } = require('../db/connect');

/**
 * Updates all creators in the database.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} accountId - Your Epic Games account ID.
 */
async function updateAllCreators(accessToken, accountId) {
    try {
        console.log('Starting update for all creators in the database.');

        // Step 1: Connect to MongoDB
        await connectDB();
        const db = getDB('FNStats');
        const creatorsCollection = db.collection('creators');

        // Step 2: Fetch all creators from the database
        const allCreators = await creatorsCollection.find({}).toArray();
        console.log(`Found ${allCreators.length} creators to update.`);

        // Step 3: Iterate through each creator and update their information
        for (const existingCreator of allCreators) {
            const { creatorId, displayName } = existingCreator;

            console.log(`Updating creator: ${displayName} (${creatorId})`);

            try {
                // Fetch latest details and maps from APIs
                const details = await getCreatorDetails(creatorId, accessToken, accountId);
                const maps = await getCreatorMaps(creatorId, accessToken, accountId);

                // Calculate metrics
                const totalPlayers = calculateTotalPlayers(maps);

                // Detect changes and log them
                const changeLog = [];
                const fieldsToCompare = ['bio', 'images', 'displayName', 'social.instagram', 'social.twitter', 'social.youtube', 'social.tiktok', 'social.discord'];
                fieldsToCompare.forEach(field => {
                    if (JSON.stringify(existingCreator[field]) !== JSON.stringify(details[field])) {
                        changeLog.push({
                            fieldChanged: field,
                            oldValue: existingCreator[field],
                            newValue: details[field],
                            timestamp: new Date(),
                        });
                    }
                });

                // Update creator in the database
                await creatorsCollection.updateOne(
                    { creatorId },
                    {
                        $set: {
                            bio: details.bio,
                            images: details.images,
                            social: details.social,
                            totalPlayers,
                        },
                        $push: {
                            changeLog: { $each: changeLog },
                            playerHistory: {
                                timestamp: new Date(),
                                totalPlayers,
                            },
                        },
                    }
                );

                console.log(`Creator "${displayName}" updated successfully.`);
            } catch (error) {
                console.error(`Error updating creator ${displayName} (${creatorId}):`, error.message);
                continue;
            }
        }

        console.log('All creators updated successfully.');
    } catch (error) {
        console.error('Error updating all creators:', error.message);
        console.error(error.stack);
    }
}

module.exports = { updateAllCreators };
