import mongoose from 'mongoose'
const dotenv = require('dotenv')
dotenv.config()

export default async () => {
  if (mongoose.connections[0].readyState) return mongoose
  
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/squad`, {useNewUrlParser: true})
  return mongoose
};