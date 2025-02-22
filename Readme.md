# Serverless API Development

Welcome to the Serverless API Development repository! This repository contains resources and examples to help you create APIs using serverless architecture and AWS Lambda.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Serverless architecture allows you to build and run applications without managing infrastructure. This repository provides a collection of examples and resources to help you get started with creating APIs using serverless development on AWS Lambda.

## Prerequisites

Before you begin, ensure you have the following:

- An AWS account
- Basic knowledge of AWS services
- AWS CLI installed and configured

## How to get the token

To obtain the token, follow these steps:

1. Use the URL of the domain along with the client ID of the web client added to the user pool:
    ```
    https://mynotescdbhtestqa-dev.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id={use client id}&redirect_uri=http://localhost:3000
    ```
2. This URL will prompt you to enter the credentials of the user created in the user pool.
3. After logging in, you will be redirected to the specified redirect URI with an `id_token` in the URL fragment.
4. Extract the `id_token` from the URL fragment.
5. Use this `id_token` in the authorization header to make authenticated requests to the API.

Example of using the `id_token` in the authorization header:
```sh
curl -H "Authorization: Bearer {id_token}" https://yourapiendpoint.com/resource
```

## Getting Started

To get started with serverless API development, follow these steps:

1. Clone this repository:
    ```sh
    git clone https://github.com/yourusername/ServerlessAPIDevelopment.git
    ```
2. Navigate to the project directory:
    ```sh
    cd ServerlessAPIDevelopment
    ```
3. Follow the instructions in each example directory to deploy and test the serverless APIs.

## Examples

This repository includes the following examples:

- **Example 1:** Simple Lambda Function
- **Example 2:** API Gateway with Lambda Integration
- **Example 3:** DynamoDB with Lambda
- **Example 4:** S3 Trigger for Lambda

## Resources

Here are some useful resources to help you learn more about serverless architecture:

- [AWS Serverless Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Serverless Framework](https://www.serverless.com/)

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.