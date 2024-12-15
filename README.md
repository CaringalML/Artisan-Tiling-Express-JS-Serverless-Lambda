# Artisan Tiling Express API

A serverless Node.js/Express API built for Artisan Tiling NZ, leveraging AWS Lambda with MongoDB integration. This API handles customer inquiries with comprehensive logging and monitoring capabilities, deployed using Terraform for infrastructure management.

## 🌟 Overview

This serverless API is designed to handle customer inquiries for Artisan Tiling NZ, providing a robust backend system with:
- Automated serverless deployment on AWS Lambda
- MongoDB integration for data persistence
- Complete infrastructure as code using Terraform
- Comprehensive logging and monitoring
- Custom domain and SSL configuration
- Development and production environments

## 🚀 Features

### API Features
- Full customer inquiry management system
- MongoDB integration with connection monitoring
- Lambda-optimized with cold/warm start detection
- Comprehensive request/response logging
- CORS support for Artisan Tiling website
- Environment-based configuration
- Error handling and graceful shutdown
- Health check endpoint

### Infrastructure Features
- Serverless architecture using AWS Lambda
- API Gateway with custom domain
- SSL/TLS encryption
- CloudWatch logging and monitoring
- Terraform-based infrastructure deployment
- Automated deployment using Make
- Route53 DNS configuration

## 📋 Prerequisites

### System Requirements
- Ubuntu/Linux operating system (Commands are Ubuntu/Linux specific)
- WSL2 (Windows Subsystem for Linux) if using Windows
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance
- Git

### Development Requirements
- Code editor (VS Code recommended)
- Postman or similar API testing tool
- MongoDB Compass (optional, for database management)

### Deployment Requirements
- Ubuntu/Linux environment for deployment scripts
- AWS CLI configured with appropriate credentials
- Terraform (latest version)
- Make (Install with `sudo apt-get install make`)
- zip utility (Install with `sudo apt-get install zip`)
- Domain registered in Route53
- SSH client for server access

### AWS Requirements
- AWS Account with administrative access
- AWS CLI installed and configured
- IAM user with appropriate permissions:
  - Lambda
  - API Gateway
  - Route53
  - CloudWatch
  - Certificate Manager
  - IAM

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/CaringalML/Artisan-Tiling-Express-JS-Serverless-Lambda.git
cd Artisan-Tiling-Express-JS-Serverless-Lambda
```

2. Install dependencies:
```bash
make install
```

3. Configure local environment:
Create `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
```

4. Configure deployment variables:
- Copy `cp.example.variables` to `terraform/variables.tf`
- Update the variables:
```hcl
variable "domain_name" {
  default = "your-domain.com"
}

variable "subdomain" {
  default = "api"
}

variable "mongodb_uri" {
  default = "your-mongodb-connection-string"
}
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
make dev
```
Starts the development server at `http://localhost:3000`

### Production Deployment

1. Verify deployment environment:
```bash
make verify
```

2. Create deployment package:
```bash
make package
```

3. Deploy to AWS:
```bash
make deploy
```

### Available Make Commands
- `make install`: Install dependencies
- `make clean`: Remove deployment artifacts
- `make package`: Create Lambda deployment package
- `make terraform`: Apply Terraform configuration
- `make deploy`: Full deployment (package + terraform)
- `make verify`: Verify deployment environment
- `make dev`: Start development server

## 🏗️ Project Structure

```
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB configuration
│   ├── middleware/
│   │   └── requestLogger.js  # Request logging middleware
│   ├── models/
│   │   └── Customer.js       # Customer mongoose model
│   ├── routes/
│   │   └── customers.js      # Customer routes
│   ├── services/
│   │   └── customerService.js # Business logic
│   └── utils/
│       └── systemUsage.js    # System monitoring utilities
├── terraform/
│   ├── api_gateway.tf        # API Gateway configuration
│   ├── cloudwatch.tf         # Logging configuration
│   ├── dns.tf               # Domain configuration
│   ├── lambda.tf            # Lambda configuration
│   ├── outputs.tf           # Terraform outputs
│   ├── providers.tf         # AWS provider config
│   └── variables.tf         # Terraform variables
├── app.js                    # Main application file
├── testing-dev.js           # Development server
└── Makefile                 # Deployment automation
```

## 🔌 API Endpoints

### Base URL
```
https://{subdomain}.{domain_name}/api/customers
```

### Endpoints

#### Get All Customers
```
GET /api/customers
```
Returns a list of all customers.

#### Create Customer
```
POST /api/customers
```
Creates a new customer inquiry.

Request Body:
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "service": "string",
  "message": "string"
}
```

#### Get Customer
```
GET /api/customers/{id}
```
Retrieves a specific customer by ID.

#### Update Customer
```
PUT /api/customers/{id}
```
Updates a specific customer.

#### Delete Customer
```
DELETE /api/customers/{id}
```
Deletes a specific customer.

## 🔒 Security

### API Security
- CORS configured for specific domains:
  - https://www.artisantiling.co.nz
  - https://artisantiling.co.nz
  - http://localhost:5173 (development only)
- Request/Response logging with sanitized data
- Environment variables for sensitive data
- Error messages sanitized in production

### Infrastructure Security
- SSL/TLS encryption
- IAM roles and policies
- CloudWatch logging
- API Gateway request throttling
- Secure MongoDB connection

## 📊 Monitoring

### CloudWatch Logging
- Lambda function logs (`/aws/lambda/customer-api`)
- API Gateway logs (`/aws/api-gateway/customer-api`)
- 14-day log retention

### System Monitoring
- Memory usage tracking
- CPU usage monitoring
- Request/Response timing
- Lambda container lifecycle monitoring
- MongoDB connection state monitoring

## 🔧 Infrastructure

### AWS Resources
- **Lambda Function**
  - Runtime: Node.js 18.x
  - Memory: 512MB
  - Timeout: 30 seconds

- **API Gateway**
  - REST API
  - Custom domain
  - CORS configuration
  - SSL certificate

- **Route53**
  - DNS configuration
  - SSL certificate validation

- **CloudWatch**
  - Logging
  - Monitoring
  - Alerts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## 🐛 Issue Reporting

- Open an issue on GitHub
- Include steps to reproduce
- Include expected and actual behavior
- Include any relevant logs or screenshots

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **CaringalML** - *Initial work* - [GitHub Profile](https://github.com/CaringalML)

## 🙏 Acknowledgments

- Artisan Tiling NZ for the opportunity to develop their customer inquiry system
- Contributors who have participated in this project