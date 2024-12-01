const { MongoClient } = require('mongodb');
require('dotenv').config();

const databaseName = 'FNStats'; // Your database name
const collectionName = 'creatorMapDB'; // Your collection name

// Initialize the MongoDB client without deprecated options
const client = new MongoClient(process.env.MONGO_URI);

async function testConnection() {
    try {
        console.log('Connecting to MongoDB...');
        // Connect to the client
        await client.connect();

        console.log('Connected to MongoDB!');
        const db = client.db(databaseName);
        const collection = db.collection(collectionName);

        // Test: List collections in the database
        const collections = await db.listCollections().toArray();
        console.log('Collections in database:', collections.map(col => col.name));

        // Test: Insert a document into the collection
        const testDoc = { message: 'Test connection successful', timestamp: new Date() };
        await collection.insertOne(testDoc);
        console.log('Inserted document:', testDoc);

        // Test: Retrieve the inserted document
        const result = await collection.findOne({ message: 'Test connection successful' });
        console.log('Retrieved document:', result);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    } finally {
        // Close the client
        await client.close();
        console.log('MongoDB connection closed.');
    }
}

testConnection();