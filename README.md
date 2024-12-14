zip -r lambda.zip app.js src/ node_modules/ package.json



Key settings:

Memory: 512MB (gives good performance for Express.js apps)
CPU: Automatically scales with memory (~0.25 vCPU)
Timeout: 30 seconds
Basic execution role for CloudWatch logs




The timeout = 30 setting in Lambda means:

Your function has a maximum of 30 seconds to complete its execution
If it takes longer than 30 seconds, Lambda will forcefully stop it
The request will fail with a timeout error

For example:

If your API request takes 5 seconds → Success
If it takes 25 seconds → Success
If it takes 31 seconds → Timeout Error

In your Express.js API:

GET /api/customers: Usually fast, unlikely to timeout
POST /api/customers: MongoDB operations might take longer, but still within 30s

Maximum possible timeout in Lambda is 900 seconds (15 minutes), but 30 seconds is usually good for APIs because:

Web clients usually timeout after 30 seconds anyway
Helps identify performance issues
Keeps costs down
Forces better API design

timeout = 60  # Increase to 60 seconds if needed



run locally:

npm run dev



note: First install make file command and terraform CLI in Ubuntu CLI

to deploy using Makefile commands for Ubuntu

make deploy