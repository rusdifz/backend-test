markdown
Copy

# NestJS API Project

REST API built with NestJS framework.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
- [ Installation And Running the Application](#installation-and-how-run-application)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- Git

## Installation And How Run Application

Here are the steps you need to follow to install the dependencies.

1. Clone this repository to ur local

2. After that **cd** into the template directory then run this command to install all the dependencies

```
npm install
```

3. Now run this command to start the developement server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### API Documentation

untuk dokumentasi penggunaan endpoint jalankan : http://localhost:3000/doc

karena disini saya menambahkan auth jwt, untuk itu bisa login menggunakan curl ini :

curl --location 'http://localhost:3000/v1/auth/login' \
--header 'api-key: https://rb.gy/1e7y4t' \
--header 'Content-Type: application/json' \
--data '{
"username": "rusdifz",
"password": "Salwasalsabil98\_"
}'

### Project Structure

src/
├── common/           # Shared utilities and constants
│ ├── consts/         # Application constants
│ ├── decorators/     # Custom decorators
│ ├── dummy-json/     # Dummy JSON data for testing
│ ├── enums/          # Application enums
│ ├── helpers/        # Helper functions
│ ├── interfaces/     # Shared interfaces
│ ├── repositories/   # Base repository classes
│ └── swaggers/       # Swagger documentation utilities
│
├── config/           # Configuration files
│ ├── db/             # Database configuration
│ └── redis/          # Redis configuration
│
├── libs/             # Reusable libraries
│ ├── axios/          # Axios HTTP client wrapper
│ └── redis/          # Redis client wrapper
│
├── middlewares/      # Custom middlewares
│ ├── guards/         # Authentication guards
│ └── interceptors/   # Response interceptors
│
├── modules/          # Feature modules
│ ├── users/          # User management module
│ │ ├── dto/          # Data Transfer Objects (DTOs)
│ │ ├── interfaces/   # User-related interfaces
│ │ ├── entities/     # User entities
│ │ ├── mappings/     # Data mapping utilities
│ │ └── swaggers/     # Swagger documentation for users
│ │
│ └── auth/           # Authentication module
│ ├── dto/            # Auth-related DTOs
│ └── swaggers/       # Swagger documentation for auth
│
├── app.module.ts     # Root application module
└── main.ts           # Application entry point

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

