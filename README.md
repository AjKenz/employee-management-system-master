<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## .ENV.EXAMPLE

Create and update the env file

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tobiloba500
DB_DATABASE=scelloo_ecommerce

JWT_SECRET=your_jwt_secret


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

**Project Documentation: Role-Based Management System**

---

**Overview:**  
This project is a **Role-Based Management System** designed to handle different user roles: **Employee**, **Manager**, and **Admin**. Each role has specific permissions, and the project enforces these permissions at both the route and business logic levels.  

**Roles & Permissions:**  
- **Admin:** Full access to manage employees, roles, and departments.  
- **Manager:** Can manage employees within their own department, but cannot manage roles or departments.  
- **Employee:** Can view their own personal information but cannot make changes to any data.  

---

**First User Creation Flow:**  
- The system starts with no users, roles, or departments.  
- The **first user created** will automatically be assigned the **Admin** role.  
  - During this process, the system will create an `Admin` role and `Admin` department if they don't already exist.
- After the first user, any new users must be created by an authenticated Admin.  

---

**Authentication & Authorization:**  
- Users must **login** to receive a JWT token.  
- This token must be included in the `Authorization` header (`Bearer <token>`) for subsequent requests to protected endpoints.  
- Access to endpoints is controlled by role-based guards and checked in business logic where applicable.  

---

**Dockerized Environment:**  
The project is designed to run seamlessly in a Dockerized environment. To get started:
1. **Build the Docker image:**  
   ```bash
   docker-compose build
   ```
2. **Run the container:**  
   ```bash
   docker-compose up -d
   ```
3. **Access the application:**  
   Visit the API documentation at: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)  

---

**API Documentation:**  
- The documentation was generated using **Swagger** and is accessible at:  
  [http://localhost:3000/api/docs](http://localhost:3000/api/docs)  
- Explore the endpoints to understand what actions each role can perform.

---

**Setting Up Locally (without Docker):**  
1. **Install dependencies:**  
   ```bash
   npm install
   ```
2. **Run migrations:**  
   ```bash
   npm run typeorm migration:run
   ```
3. **Start the server:**  
   ```bash
   npm run start:dev
   ```
4. **Access Swagger docs:**  
   Visit [http://localhost:3000/api/docs](http://localhost:3000/api/docs)  

---

**Getting Started:**  
1. Register the first user to create the initial Admin.  
2. Login with the Admin account to get a JWT token.  
3. Use the token to manage employees, roles, and departments via the Swagger UI or your favorite API client.

---

**Notes:**  
- Keep your JWT token secure—only Admins can create new users after the first one.  
- Managers can update employees only within their own department—this is enforced at the business logic level.  


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
