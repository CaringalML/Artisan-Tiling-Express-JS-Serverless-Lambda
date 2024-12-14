// testing-dev.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const customerRoutes = require('./src/routes/customers');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use('/api/customers', customerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`
  ❌ ====== Error Handler ======
  🕒 Timestamp: ${new Date().toISOString()}
  💥 Error: ${err.message}
  🔍 Stack: ${err.stack}
  `);
  
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

// Handle unhandled routes
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404
    }
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start listening for requests
    app.listen(PORT, () => {
      console.log(`
      🚀 ====== Development Server Started ======
      ⏰ Time: ${new Date().toISOString()}
      🌐 Server running on http://localhost:${PORT}
      🛣️  Available routes:
         - GET    /health
         - GET    /api/customers
         - POST   /api/customers
      🔧 Environment: ${process.env.NODE_ENV || 'development'}
      ==========================================
      `);
    });
  } catch (error) {
    console.error(`
    ❌ ====== Server Start Error ======
    💥 Error: ${error.message}
    🔍 Stack: ${error.stack}
    `);
    process.exit(1);
  }
};

// Handle unexpected errors
process.on('unhandledRejection', (reason, promise) => {
  console.error(`
  ❌ ====== Unhandled Rejection ======
  🕒 Time: ${new Date().toISOString()}
  💥 Reason: ${reason}
  `);
});

process.on('uncaughtException', (error) => {
  console.error(`
  ❌ ====== Uncaught Exception ======
  🕒 Time: ${new Date().toISOString()}
  💥 Error: ${error.message}
  🔍 Stack: ${error.stack}
  `);
  process.exit(1);
});

// Start the server
startServer();