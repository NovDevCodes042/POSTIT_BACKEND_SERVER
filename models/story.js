const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storySchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    tags: {
        type: String,
        required: true,
        enum: ['nature', 'technology', 'sport', 'lifestyle', 'others']
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    writtenBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true})

module.exports = mongoose.model('Story', storySchema)