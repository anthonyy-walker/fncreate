const { URL, URLSearchParams } = require('url');

/**
 * Generates a URL for Epic Games Id Web - Redirect API.
 * @returns {string} The constructed redirect URL.
 */
function generateRedirectUrl() {
    const baseUrl = 'https://www.epicgames.com/id/api/redirect';
    const params = new URLSearchParams({
        clientId: '7e2addef050245a5a41c06d177ff2676', // Your Client ID
        responseType: 'code', // Indicates you want an authorization code
        scope: 'basic_profile', // Replace with the desired scope
    });

    // Add optional parameters if needed
    // params.append('state', 'random-state-string'); // Add if you use state
    // params.append('codeChallenge', 'your-code-challenge'); // For PKCE
    // params.append('codeChallengeMethod', 'S256'); // For PKCE

    return `${baseUrl}?${params.toString()}`;
}

// Generate the URL and print it
console.log('Generated Redirect URL:', generateRedirectUrl());
