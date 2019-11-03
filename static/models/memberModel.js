import mongoose from 'mongoose'
const Schema = mongoose.Schema

// define Schema
const memberSchema = new Schema({
    id: Number,
    name: String,
    email: String,
    competitiveLevel: String,
    updated: { type: Date, default: Date.now },
    skills: [String],
    // stickers: [Date]
    comments: [String]
})

// compile to model if it doesn't already exist
module.exports = mongoose.models.Member ? mongoose.model('Member') : mongoose.model('Member', memberSchema)

