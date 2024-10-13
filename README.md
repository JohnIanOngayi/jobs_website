# Jobs Website

This repository contains the full stack code for a locally hosted jobs website. The backend is built using Node.js, Express, and MongoDB with Mongoose as the ODM. The frontend is built using Vite, React, and JavaScript.

## Features

- **Company Management**: Create, read, update, and delete company profiles.
- **Job Management**: Create, read, update, and delete job postings.
- **Validation**: Input validation using the `validator` library.
- **User Management**: Create, read, update, and delete user accounts. (Not yet implemented)
- **Authentication**: Secure user authentication with hashed passwords. (Not yet implemented)

## Backend

### Models

#### Company

Defines the schema for the Company model.

- `name`: The name of the company. It is required and must be unique.
- `description`: A description of the company. It is required.
- `email`: The email address of the company. It is required, unique, and must be a valid email format.
<!-- - `hashedPassword`: The hashed password for the company's account. It is required and must be at least 8 characters long. -->
- `phone`: The phone number of the company. It must be a valid phone number format.
- `timestamps`: Automatically adds `createdAt` and `updatedAt` timestamps to the schema.

#### Job

Defines the schema for the Job model.

- `title`: The title of the job. It is required.
- `type`: The type of the job. It is required and must be one of "Remote", "Onsite", "Hybrid", or "Full-Time".
- `description`: A description of the job. It is required.
- `salaryRange`: The salary range for the job. It defaults to "Not Specified" and must be one of the predefined ranges.
- `country`: The country where the job is located. It is required.
- `location`: The specific location of the job within the country. It is required.
- `expiresAt`: The expiration date of the job posting. It defaults to one year from the current date and time.
- `company`: The reference to the Company model. It is required.
- `timestamps`: Automatically adds `createdAt` and `updatedAt` timestamps to the schema.

#### User (Not yet integrated!)

Defines the schema for the User model.

- `firstName`: The first name of the user. It is required.
- `lastName`: The last name of the user. It is required.
- `email`: The email address of the user. It is required, unique, and must be a valid email format.
- `phone`: The phone number of the user. It defaults to an empty string and must be a valid phone number format.
- `hashedPassword`: The hashed password for the user's account. It is required.
- `timestamps`: Automatically adds `createdAt` and `updatedAt` timestamps to the schema.

### API

The following api endpoints are supported:
```http
GET /companies
GET /jobs
GET /users
GET /companies/:id
GET /jobs/:id
GET /users/:id
POST /companies
POST /jobs
POST /users
PUT /companies/:id
PUT /jobs/:id
PUT /users/:id
DELETE /companies/:id
DELETE /jobs/:id
DELETE /users/:id
```

### Getting Started with Backend

#### Prerequisites

- Node.js
- MongoDB

#### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/JohnIanOngayi/jobs_website.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   ENVIRONMENT=dev
   ```

4. Start the development server:
   ```sh
   npm run server
   ```

## Frontend

### Getting Started with Frontend

#### Prerequisites

- Node.js

#### Installation

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

### Usage

- The backend api server will be running at `http://localhost:3000`.
- The frontend server will be running at `http://localhost:5173`.
- Use the web interface to interact with the application.
