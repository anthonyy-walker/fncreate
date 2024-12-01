const axios = require('axios');

/**
 * Fetches all pages for a given panel in a discovery surface.
 * @param {string} surfaceName - The surface name to query.
 * @param {string} panelName - The panel name to query.
 * @param {string} testVariantName - The variant name from the main discovery response.
 * @param {string} accessToken - Fortnite API access token.
 * @param {string} playerId - Your Epic Games account ID.
 * @returns {Promise<object[]>} Aggregated data from all pages.
 */
async function fetchDiscoveryPanelPages(surfaceName, panelName, testVariantName, accessToken, playerId) {
    const branch = encodeURIComponent('++Fortnite+Release-32.10');
    const baseUrl = `https://fn-service-discovery-live-public.ogs.live.on.epicgames.com/api/v2/discovery/surface/${surfaceName}/page?appId=Fortnite&stream=${branch}`;

    const headers = {
        'Authorization' : `Bearer ${accessToken}`,
        'X-Epic-Access-Token': 'GX8HpwvNMPGxt+CGK09b2ltTnP8Yn4KJt7mb6RITTtQ=',
        'Content-Type': 'application/json',
    };

    let allResults = [];
    let hasMore = true;
    let pageIndex = 0;

    try {
        while (hasMore) {
            const body = {
                testVariantName,
                panelName,
                pageIndex,
                playerId,
                partyMemberIds: [playerId],
                matchmakingRegion: 'NAE',
                platform: 'Windows',
                isCabined: false,
                ratingAuthority: 'ESRB',
                rating: 'ESRB_T',
                numLocalPlayers: 1,
            };

            console.log(`Fetching page ${pageIndex} for panel "${panelName}"...`);
            const response = await axios.post(baseUrl, body, { headers });

            if (response.data && response.data.results) {
                allResults = allResults.concat(response.data.results);
                hasMore = response.data.hasMore || false;
                pageIndex += 1; // Fetch next page
            } else {
                console.warn('No results found for this page.');
                hasMore = false;
            }
        }

        console.log(`Fetched ${allResults.length} results for panel "${panelName}".`);
        return allResults;
    } catch (error) {
        console.error('Error fetching panel pages:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { fetchDiscoveryPanelPages };