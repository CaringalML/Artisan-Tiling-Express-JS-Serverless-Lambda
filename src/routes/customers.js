// src/routes/customers.js
const express = require('express');
const router = express.Router();
const customerService = require('../services/customerService');
const requestLogger = require('../middleware/requestLogger');
const getSystemUsage = require('../utils/systemUsage');

// Monitor Lambda container shutdown
process.on('SIGTERM', () => {
  console.log(`
    💤 ====== Lambda Container Shutdown ======
    🕒 Timestamp: ${new Date().toISOString()}
    🛑 Status: Container Terminating
    💾 Final Memory State: ${JSON.stringify(getSystemUsage().memory)}
    =======================================
  `);
});

// Apply request logger middleware
router.use(requestLogger);

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers(req.requestId);
    res.json(customers);
  } catch (error) {
    console.error(`
    ❌ ====== GET Error [${req.requestId}] ======
    💥 Error: ${error.message}
    🔍 Stack: ${error.stack}
    `);
    res.status(500).json({ error: error.message });
  }
});

// Create new customer
router.post('/', async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body, req.requestId);
    res.status(201).json(customer);
  } catch (error) {
    console.error(`
    ❌ ====== POST Error [${req.requestId}] ======
    💥 Error: ${error.message}
    🔍 Stack: ${error.stack}
    📦 Failed Request Body: ${JSON.stringify(req.body)}
    `);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;