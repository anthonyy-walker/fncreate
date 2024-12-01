const { getCreatorMaps } = require('../services/api/creatorPageAPI');
const { fetchDiscoveryPanels } = require('./api/fetchDiscoveryPanels');
const { fetchDiscoveryPanelPages } = require('./api/fetchDiscoveryPanelPages');
const { getMnemonicInfo } = require('../services/api/mnemonicInfoAPI');
const { connectDB, getDB } = require('../db/connect');
const Map = require('../db/mapSchema');
const Creator = require('../db/creatorSchema');

/**
 * Builds or updates maps for all creators in the database, including discovery data.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} accountId - Your Epic Games account ID.
 */
async function buildMaps(accessToken, accountId) {
    try {
        console.log('Starting map building process...');

        // Step 1: Connect to MongoDB
        await connectDB();
        const db = getDB('FNStats');
        const creatorsCollection = db.collection('creators');
        const mapsCollection = db.collection('maps');

        // Step 2: Fetch all creators from the database
        const creators = await creatorsCollection.find({}).toArray();

        if (creators.length === 0) {
            console.warn('No creators found in the database.');
            return;
        }

        // Step 3: Fetch discovery panels for all surfaces
        const surfaces = [
            'CreativeDiscoverySurface_Frontend',
            'CreativeDiscoverySurface_Browse',
            'CreativeDiscoverySurface_Library',
            'CreativeDiscoverySurface_DelMar_TrackAndExperience',
            'CreativeDiscoverySurface_EpicPage',
            'CreativeDiscoverySurface_CreatorPage',
        ];

        const discoveryData = [];

        for (const surface of surfaces) {
            console.log(`Fetching panels for surface: ${surface}`);
            const panels = await fetchDiscoveryPanels(surface, accessToken);

            for (const panel of panels) {
                console.log(`Fetching pages for panel: ${panel.panelName} under surface: ${surface}`);
                const results = await fetchDiscoveryPanelPages(surface, panel.panelName, panel.testVariantName, accessToken, accountId);
                discoveryData.push(
                    ...results.map(result => ({
                        ...result,
                        surface,
                        panelName: panel.panelName,
                    }))
                );
            }
        }

        // Step 4: Process each creator and their maps
        for (const creator of creators) {
            console.log(`Processing maps for creator: ${creator.displayName} (${creator.creatorId})`);

            const creatorMaps = await getCreatorMaps(creator.creatorId, accessToken, accountId);

            if (!creatorMaps || creatorMaps.length === 0) {
                console.warn(`No maps found for creator: ${creator.displayName}`);
                continue;
            }

            for (const map of creatorMaps) {
                console.log(`Processing map: ${map.linkCode}`);

                // Step 5: Fetch map details from Mnemonic Info API
                const mapDetails = await getMnemonicInfo(map.linkCode, accessToken);

                // Step 6: Check if the map is in discovery across all panels and surfaces
                const mapDiscoveryEntries = discoveryData.filter(entry => entry.linkCode === map.linkCode);
                const discoverySurfaces = [
                    ...new Set(mapDiscoveryEntries.map(entry => entry.surface)), // Deduplicate surfaces
                ];
                const discoveryPanels = [
                    ...new Set(mapDiscoveryEntries.map(entry => entry.panelName)), // Deduplicate panel names
                ];

                const discoveryTimestamp = {
                    timestamp: new Date(),
                    inDiscovery: mapDiscoveryEntries.length > 0,
                    surfaces: discoverySurfaces,
                    panels: discoveryPanels,
                };

                // Step 7: Check if map already exists in the database
                const existingMap = await mapsCollection.findOne({ mapId: map.linkCode });

                if (existingMap) {
                    console.log(`Map ${map.linkCode} already exists. Updating details...`);
                    const updatedAllTimeHigh = Math.max(existingMap.allTimeHigh || 0, map.globalCCU);

                    await mapsCollection.updateOne(
                        { mapId: map.linkCode },
                        {
                            $set: {
                                creatorId: creator.creatorId,
                                name: mapDetails.metadata?.title || existingMap.name,
                                description: mapDetails.metadata?.tagline || existingMap.description,
                                genre: mapDetails.linkType || existingMap.genre,
                                globalCCU: map.globalCCU,
                                allTimeHigh: updatedAllTimeHigh,
                                metadata: {
                                    parentSet: mapDetails.metadata?.parent_set || existingMap.metadata?.parentSet,
                                    imageUrl: mapDetails.metadata?.image_url || existingMap.metadata?.imageUrl,
                                    imageUrls: {
                                        small: mapDetails.metadata?.image_urls?.url_s || existingMap.metadata?.imageUrls?.small,
                                        medium: mapDetails.metadata?.image_urls?.url_m || existingMap.metadata?.imageUrls?.medium,
                                        large: mapDetails.metadata?.image_urls?.url || existingMap.metadata?.imageUrls?.large,
                                    },
                                    matchmaking: {
                                        overridePlaylist: mapDetails.metadata?.matchmaking?.override_playlist || existingMap.metadata?.matchmaking?.overridePlaylist,
                                    },
                                    videoVuid: mapDetails.metadata?.video_vuid || existingMap.metadata?.videoVuid,
                                },
                                lastUpdatedDate: new Date(),
                            },
                            $push: {
                                discoveryTimestamps: discoveryTimestamp,
                                playerHistory: {
                                    timestamp: new Date(),
                                    playerCount: map.globalCCU,
                                },
                            },
                        }
                    );
                    console.log(`Map ${map.linkCode} updated successfully.`);
                    continue;
                }

                // Step 8: Insert new map
                const newMap = {
                    mapId: map.linkCode,
                    creatorId: creator.creatorId,
                    linkCode: map.linkCode,
                    name: mapDetails.metadata?.title || 'Unknown',
                    description: mapDetails.metadata?.tagline || 'No description available',
                    genre: mapDetails.linkType || 'Unknown',
                    globalCCU: map.globalCCU,
                    allTimeHigh: map.globalCCU,
                    totalPlayers: map.globalCCU, // Start with current players as total
                    discoveryTimestamps: [discoveryTimestamp],
                    metadata: {
                        parentSet: mapDetails.metadata?.parent_set,
                        imageUrl: mapDetails.metadata?.image_url,
                        imageUrls: {
                            small: mapDetails.metadata?.image_urls?.url_s,
                            medium: mapDetails.metadata?.image_urls?.url_m,
                            large: mapDetails.metadata?.image_urls?.url,
                        },
                        matchmaking: {
                            overridePlaylist: mapDetails.metadata?.matchmaking?.override_playlist,
                        },
                        videoVuid: mapDetails.metadata?.video_vuid,
                    },
                    creationDate: new Date(mapDetails.created),
                    lastUpdatedDate: new Date(mapDetails.published),
                    changelog: [],
                };

                await mapsCollection.insertOne(newMap);
                console.log(`Map ${map.linkCode} saved successfully.`);
            }
        }

        console.log('Map building process completed.');
    } catch (error) {
        console.error('Error building maps:', error.message);
        console.error(error.stack);
    }
}

module.exports = { buildMaps };