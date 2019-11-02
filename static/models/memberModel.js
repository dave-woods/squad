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

// {
//     "id": 1,
//     "name": "Dave Woods",
//     "email": "dwoods@tcd.ie",
//     "entries": [
//       {
//         "date": 1562865725502,
//         "competitiveLevel": "Elite"
//       }
//     ]
//   },


// compile to model
module.exports = mongoose.model('Member', memberSchema)

