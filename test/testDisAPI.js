const { fetchDiscoverySurface } = require('../services/api/discoverySurfaceAPI'); // Replace with the correct path

/**
 * Test for fetchDiscoverySurface function.
 */
(async () => {
    try {
        console.log('Starting test for fetchDiscoverySurface...');

        // Define the surface name to test
        const surfaceName = 'CreativeDiscoverySurface_Frontend'; // Default value or change as needed

        // Call the function and get the result
        const panels = await fetchDiscoverySurface(surfaceName, '1e6e0e7ec02c4208a2bb229d89bea1f5');
        // Log the results
        if (panels.length > 0) {
            console.log(`Successfully fetched ${panels.length} panels.`);
            panels.forEach((panel, index) => {
                console.log(`Panel ${index + 1}:`, JSON.stringify(panel, null, 2));
            });
        } else {
            console.warn('No panels were returned from the Discovery Surface API.');
        }

        console.log('Test for fetchDiscoverySurface completed.');
    } catch (error) {
        console.error('Error during test for fetchDiscoverySurface:', error.message);
        console.error(error.stack);
    }
})();