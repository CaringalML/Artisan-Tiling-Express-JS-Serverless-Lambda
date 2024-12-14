# outputs.tf
output "api_url" {
  value = "https://${var.subdomain}.${var.domain_name}/api/customers"
}

output "lambda_log_group" {
  value = aws_cloudwatch_log_group.lambda.name
  description = "CloudWatch Log Group for Lambda function"
}

output "api_gateway_log_group" {
  value = aws_cloudwatch_log_group.api_gateway.name
  description = "CloudWatch Log Group for API Gateway"
}