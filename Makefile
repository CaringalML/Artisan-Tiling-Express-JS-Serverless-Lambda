# Makefile for deployment (Ubuntu/Linux)

# Variables
LAMBDA_ZIP = lambda.zip
PROJECT_ROOT = $(shell pwd)
TERRAFORM_DIR = terraform

.PHONY: all clean deploy package terraform verify

# Default target
all: deploy

# Verify directories and commands exist
verify:
	@echo "🔍 Verifying environment..."
	@test -d "$(TERRAFORM_DIR)" || (echo "❌ Terraform directory not found!" && exit 1)
	@test -d "src" || (echo "❌ src directory not found!" && exit 1)
	@test -d "node_modules" || (echo "❌ node_modules not found! Run 'make install' first" && exit 1)
	@test -f "app.js" || (echo "❌ app.js not found!" && exit 1)
	@which zip > /dev/null || (echo "❌ zip command not found! Install with: sudo apt-get install zip" && exit 1)
	@which terraform > /dev/null || (echo "❌ terraform not found! Please install terraform" && exit 1)
	@echo "✅ Environment verified"

# Clean old artifacts
clean:
	@echo "🧹 Cleaning old deployment files..."
	@rm -f $(LAMBDA_ZIP)

# Package Lambda function
package: clean verify
	@echo "📦 Creating $(LAMBDA_ZIP)..."
	@zip -r $(LAMBDA_ZIP) app.js src/ node_modules/ package.json

# Run Terraform
terraform:
	@echo "🏗️  Running Terraform..."
	@cd $(TERRAFORM_DIR) && \
	terraform init && \
	terraform apply -auto-approve
	@cd $(PROJECT_ROOT)

# Full deployment
deploy: package terraform
	@echo "✅ Deployment completed successfully!"

# Development server
dev:
	@echo "🚀 Starting development server..."
	@npm run dev

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	@npm install

# Help
help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make clean     - Remove deployment artifacts"
	@echo "  make package   - Create Lambda zip package"
	@echo "  make terraform - Run Terraform apply"
	@echo "  make deploy    - Full deployment (package + terraform)"
	@echo "  make dev      - Start development server"
	@echo "  make verify   - Verify environment"