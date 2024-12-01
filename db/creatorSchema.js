const mongoose = require('mongoose');

const creatorSchema = new mongoose.Schema({
    creatorId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    bio: { type: String },
    images: {
        avatar: { type: String },
        banner: { type: String },
    },
    social: {
        discord: { type: String },
        instagram: { type: String },
        tiktok: { type: String },
        twitter: { type: String },
        youtube: { type: String },
    },
    totalPlayers: { type: Number, default: 0 },
    playerHistory: [
        {
            timestamp: { type: Date, default: Date.now },
            totalPlayers: { type: Number },
        },
    ],
    changeLog: [
        {
            fieldChanged: { type: String },
            oldValue: { type: String },
            newValue: { type: String },
            timestamp: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Creator', creatorSchema);
