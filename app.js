const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const connectDB = require('./src/config/database');
const customerRoutes = require('./src/routes/customers');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://www.artisantiling.co.nz','https://artisantiling.co.nz'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));


app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/customers', customerRoutes);

// Export the serverless handler
module.exports.handler = serverless(app);