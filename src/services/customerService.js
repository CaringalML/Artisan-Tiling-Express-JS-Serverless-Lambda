// src/services/customerService.js
const Customer = require('../models/Customer');
const getSystemUsage = require('../utils/systemUsage');

const customerService = {
  async getAllCustomers(requestId) {
    const startUsage = getSystemUsage();
    console.log(`
    🔍 ====== GET Request: Fetching Customers [${requestId}] ======
    🕒 Start Time: ${new Date().toISOString()}
    💾 Initial Memory Usage: ${startUsage.memory.heapUsed}
    `);

    const customers = await Customer.find();
    const endUsage = getSystemUsage();

    console.log(`
    ✅ ====== GET Success [${requestId}] ======
    📊 Customers Found: ${customers.length}
    💾 Final Memory Usage: ${endUsage.memory.heapUsed}
    `);

    return customers;
  },

  async createCustomer(customerData, requestId) {
    const startUsage = getSystemUsage();
    const { name, email, phone, service, message } = customerData;

    console.log(`
    📝 ====== POST Request: New Customer [${requestId}] ======
    🕒 Start Time: ${new Date().toISOString()}
    💾 Initial Memory Usage: ${startUsage.memory.heapUsed}
    `);

    const customer = new Customer({ name, email, phone, service, message });
    await customer.save();
    
    const endUsage = getSystemUsage();
    console.log(`
    ✅ ====== POST Success [${requestId}] ======
    🆔 Customer ID: ${customer._id}
    💾 Final Memory Usage: ${endUsage.memory.heapUsed}
    `);

    return customer;
  }
};

module.exports = customerService;