const axios = require('axios');

(async () => {
    const creatorName = 'theboydilly';
    const url = `https://www.fortnite.com/@${creatorName}?lang=en-US&_data=routes%2F%24creatorCode._index`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
            },
        });

        console.log('Creator Data Response:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.status, error.response.statusText);
            console.error('Response Body:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error:', error.message);
        }
    }
})();
