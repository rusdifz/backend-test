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

Authentication
This API uses JWT for authentication. You can use the following test token for authorization:

Bearer Token:

Copy
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoicnVzZGlmeiIsIm5hbWUiOiJmYXV6YW4gcnVzZGkiLCJlbWFpbCI6ImZhdXphbnJ1c2RpMjBAZ21haWwuY29tIiwicGhvbmUiOm51bGwsIndlYnNpdGUiOm51bGwsInN0cmVldCI6bnVsbCwic3VpdGUiOm51bGwsImNpdHkiOm51bGwsInppcGNvZGUiOm51bGwsImdlb19sYXQiOm51bGwsImdlb19sbmciOm51bGwsImNvbXBhbnlfbmFtZSI6bnVsbCwiY29tcGFueV9jYXRjaFBocmFzZSI6bnVsbCwiY29tcGFueV9icyI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjUtMDItMjdUMjM6MjA6NDIuMjUyWiIsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDI1LTAyLTI3VDIzOjIwOjQyLjI1MloiLCJ1cGRhdGVkX2J5IjpudWxsLCJkZWxldGVkX2F0IjpudWxsfSwiaWF0IjoxNzQwNjk4NDU5fQ.CSBc-uQUgDq7eVpWgshVS0I7tH6VyjxE6VUs0_Z2W3E
Usage:

http
Copy
GET /protected-route
Authorization: Bearer <your-token>

### Project Structure

src/
├── auth/ # Authentication module
├── users/ # User management module
├── common/ # Shared utilities
├── config/ # Configuration files
└── main.ts # Application entry file

Environment Variables
Create .env file in root directory:

env
Copy
PORT=3000
DATABASE_URL=your-db-connection-string
JWT_SECRET=your-jwt-secret-key
API Documentation
API documentation is available via Swagger UI when running in development mode:

http
Copy
http://localhost:3000/api
License
This project is licensed under the MIT License.

Acknowledgements
Built with NestJS

Authentication powered by JWT

```

```
