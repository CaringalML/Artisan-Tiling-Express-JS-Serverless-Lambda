# lambda.tf

resource "aws_lambda_function" "api" {
  filename         = "${path.module}/../lambda.zip"
  function_name    = "customer-api"
  role            = aws_iam_role.lambda_role.arn
  handler         = "app.handler"
  runtime         = "nodejs18.x"
  
  # Main performance settings
  memory_size     = 512  # 512MB memory (provides ~0.25 vCPU)
  timeout         = 30   # 30 seconds timeout

  environment {
    variables = {
      MONGODB_URI = var.mongodb_uri
      NODE_ENV    = "production"
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name = "customer_api_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_role.name
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}