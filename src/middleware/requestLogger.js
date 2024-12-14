// src/middleware/requestLogger.js
const getSystemUsage = require('../utils/systemUsage');

// Track Lambda cold start
let isLambdaColdStart = true;

const requestLogger = (req, res, next) => {
  req.requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  req._startTime = Date.now();
  req._startUsage = process.cpuUsage();

  // Log Lambda container status
  if (isLambdaColdStart) {
    console.log(`
    🚀 ====== Lambda Container Status ======
    🕒 Timestamp: ${new Date().toISOString()}
    ♨️  Status: Cold Start (New Container)
    🆔 Request ID: ${req.requestId}
    =======================================
    `);
    isLambdaColdStart = false;
  } else {
    console.log(`
    ♻️  ====== Lambda Container Status ======
    🕒 Timestamp: ${new Date().toISOString()}
    ✅ Status: Warm Start (Reused Container)
    🆔 Request ID: ${req.requestId}
    =======================================
    `);
  }

  // Log incoming request
  const systemUsage = getSystemUsage();
  console.log(`
    📥 ====== Incoming Request [${req.requestId}] ======
    🕒 Timestamp: ${new Date().toISOString()}
    📍 Method: ${req.method}
    🌐 URL: ${req.originalUrl}
    👤 IP: ${req.ip}
    
    🖥️  System Usage:
    💾 Memory:
       - Heap Used: ${systemUsage.memory.heapUsed}
       - Heap Total: ${systemUsage.memory.heapTotal}
       - RSS: ${systemUsage.memory.rss}
       - External: ${systemUsage.memory.external}
    
    ⚡ CPU Usage:
       - User: ${systemUsage.cpu.user}
       - System: ${systemUsage.cpu.system}
    
    📦 Body: ${JSON.stringify(req.body)}
    =======================================
  `);

  // Override res.json for response logging
  const originalJson = res.json;
  res.json = function(body) {
    const responseTime = Date.now() - req._startTime;
    const endUsage = process.cpuUsage(req._startUsage);
    const systemUsage = getSystemUsage();
    
    console.log(`
      📤 ====== Outgoing Response [${req.requestId}] ======
      🕒 Timestamp: ${new Date().toISOString()}
      ⏱️  Response Time: ${responseTime}ms
      📊 Status: ${res.statusCode}
      
      🖥️  System Usage:
      💾 Memory:
         - Heap Used: ${systemUsage.memory.heapUsed}
         - Heap Total: ${systemUsage.memory.heapTotal}
         - RSS: ${systemUsage.memory.rss}
         - External: ${systemUsage.memory.external}
      
      ⚡ CPU Usage for this request:
         - User: ${Math.round(endUsage.user / 1000000)} ms
         - System: ${Math.round(endUsage.system / 1000000)} ms
      
      📦 Body: ${JSON.stringify(body)}
      =======================================
    `);
    
    return originalJson.call(this, body);
  };

  next();
};

module.exports = requestLogger;