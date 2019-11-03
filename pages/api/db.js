const mongoose = require('mongoose')
// mongoose.set('debug', true)
const dotenv = require('dotenv')
dotenv.config()

module.exports = async () => {
  if (mongoose.connections[0].readyState) return mongoose
  await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  return mongoose
}

// const mongoose = require("mongoose").set("debug", true);
// const connection = {};

// module.exports = async () => {
//   if (connection.isConnected) {
//     // Using existing database connection
//     return;
//   }

//   // Using new database connection
//   const db = await mongoose.connect("mongodb://localhost:27017/my-app",
//     { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true }
//   );

//   connection.isConnected = db.connections[0].readyState;
// };