// src/utils/systemUsage.js
const process = require('process');

const getSystemUsage = () => {
  const usage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  return {
    memory: {
      heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024 * 100) / 100} MB`,
      heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024 * 100) / 100} MB`,
      rss: `${Math.round(usage.rss / 1024 / 1024 * 100) / 100} MB`,
      external: `${Math.round(usage.external / 1024 / 1024 * 100) / 100} MB`,
    },
    cpu: {
      user: `${Math.round(cpuUsage.user / 1000000)} ms`,
      system: `${Math.round(cpuUsage.system / 1000000)} ms`,
    }
  };
};

module.exports = getSystemUsage;