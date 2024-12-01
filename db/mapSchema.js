const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
    mapId: { type: String, required: true, unique: true }, // Unique identifier for the map
    creatorId: { type: String, required: true }, // Reference to the creator's ID
    linkCode: { type: String, required: true }, // Unique link code for the map
    name: { type: String, required: true }, // Map's display name
    description: { type: String }, // Description of the map
    genre: { type: String }, // Genre of the map
    globalCCU: { type: Number, default: 0 }, // Current player count
    totalPlayers: { type: Number, default: 0 }, // Total players across time
    allTimeHigh: { type: Number, default: 0 }, // Highest player count
    playerHistory: [
        {
            timestamp: { type: Date, default: Date.now }, // Time of the record
            playerCount: { type: Number }, // Player count at that time
        },
    ], // Tracks player counts over time
    discoveryTimestamps: [
        {
            timestamp: { type: Date, default: Date.now },
            inDiscovery: { type: Boolean, default: false },
            withPage: { type: String, default: null },
        },
    ], // Tracks when the map was in discovery
    metadata: {
        parentSet: { type: String }, // e.g., "set_br_playlists"
        imageUrl: { type: String }, // Main image URL for the map
        imageUrls: {
            small: { type: String },
            medium: { type: String },
            large: { type: String },
        },
        matchmaking: { overridePlaylist: { type: String } }, // Matchmaking metadata
        videoVuid: { type: String }, // Associated video ID if any
    }, // Metadata from the Mnemonic Info API
    creationDate: { type: Date }, // When the map was first created
    lastUpdatedDate: { type: Date }, // Last update timestamp for the map
    changelog: [
        {
            fieldChanged: { type: String },
            oldValue: { type: String },
            newValue: { type: String },
            timestamp: { type: Date, default: Date.now },
        },
    ], // Tracks changes to the map's details
}, { timestamps: true });

module.exports = mongoose.model('Map', mapSchema);
