const { getDiscoverySurfacePage } = require('../retired/discoverySurfaceService');
require('dotenv').config();

(async () => {
    try {
        const surfaceName = 'CreativeDiscoverySurface_CreatorPage'; // Example surface name
        const requestBody = {
            testVariantName: '32.10_CreatorPage',
            panelName: 'PublishedIslands',
            pageIndex: 0,
            //playerId: "7e2addef050245a5a41c06d177ff2676",

        };
        const appId = 'Fortnite';
        const stream = '%2B%2BFortnite%2BRelease-31.30'; // URL-encoded branch

        const discoveryResponse = await getDiscoverySurfacePage(surfaceName, requestBody, appId, stream);
        console.log('Discovery Surface Page:', discoveryResponse);
    } catch (error) {
        console.error('Discovery Surface Page Test Failed:', error.message);
    }
})();
