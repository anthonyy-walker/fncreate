const { getMnemonicInfo } = require('../retired/linkService.js');
require('dotenv').config();

(async () => {
    try {
        const namespace = 'fn'; // Fortnite namespace
        const mnemonic = '4590-4493-7113'; // Replace with a valid mnemonic
        const queryParams = {
            type: 'valkyrie:application', // Replace with the desired type
            includeActivationHistory: true, // Optional
        };

        const mnemonicInfo = await getMnemonicInfo(namespace, mnemonic, queryParams);
        console.log('Mnemonic Info:', mnemonicInfo);
    } catch (error) {
        console.error('Mnemonic Info Test Failed:', error.message);
    }
})();
//        node test/testMnemonicInfo.js 