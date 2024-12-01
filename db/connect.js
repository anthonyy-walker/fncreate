const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbClient; // Holds the MongoDB client

/**
 * Connects to the MongoDB database.
 * @returns {Promise<MongoClient>} The connected MongoDB client instance.
 */
async function connectDB() {
    if (!dbClient) {
        try {
            console.log('Connecting to MongoDB...');
            const client = new MongoClient(process.env.MONGO_URI);
            await client.connect();
            console.log('MongoDB Connected!');
            dbClient = client;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error.message);
            process.exit(1);
        }
    }
    return dbClient;
}

/**
 * Retrieves the specified MongoDB database.
 * @param {string} dbName - The name of the database to retrieve.
 * @returns {Db} The MongoDB database instance.
 */
function getDB(dbName) {
    return dbClient.db(dbName);
}

module.exports = {
    connectDB,
    getDB,
};
