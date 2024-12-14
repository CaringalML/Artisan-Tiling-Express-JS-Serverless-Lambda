// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`
    🎉 ============================== 🎉
    🚀 MongoDB Connected Successfully!
    👉 Status: 🟢 Connected
    🏠 Host: ${conn.connection.host}
    🗄️  Database: ${conn.connection.name}
    📡 Connection State: ${conn.connection.readyState}
    🎉 ============================== 🎉
    `);

    // Monitor database connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn(`
      ⚠️  ============================== ⚠️
      ⚠️  MongoDB disconnected
      👉 Status: 🔴 Disconnected
      🔄 Attempting to reconnect...
      ⚠️  ============================== ⚠️
      `);
    });

    mongoose.connection.on('reconnected', () => {
      console.log(`
      ✨ ============================== ✨
      🔄 MongoDB reconnected successfully!
      👉 Status: 🟢 Connected
      ✨ ============================== ✨
      `);
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log(`
        👋 ============================== 👋
        👋 MongoDB connection closed through app termination
        👉 Status: 🟡 Closed
        👋 ============================== 👋
        `);
        process.exit(0);
      } catch (err) {
        console.error('💥 Error during MongoDB disconnection:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error(`
    ❌ ============================== ❌
    ❌ MongoDB connection error:
    👉 Status: 🔴 Failed
    🔍 Error: ${error.message}
    🔐 Connection URI: ${process.env.MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@')}
    ❌ ============================== ❌
    `);
    process.exit(1);
  }
};

module.exports = connectDB;