# Appointment API

A RESTful API for managing appointments. This service allows you to create, find, list, and cancel appointments while ensuring proper validation of dates, client information, and business rules.

## Features

- Create new appointments
- List all appointments
- Find appointments by ID, client name, or CPF
- Cancel appointments
- List available appointment hours

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rafaeltmbr/appointment-agent.git
cd appointment-agent
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Open the `.env` file and configure the following variables:

- `REST_PORT`: The port number for the REST server (default: 3000)

Example `.env` file:

```env
# REST server Port number
REST_PORT=3000
```

## Running the Application

For development (with hot reload):

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The server will start at `http://localhost:3000` by default.

## API Documentation

The API documentation is available through Swagger UI when the application is running.

Access the documentation at:

```
http://localhost:3000/api-docs
```

In the Swagger UI you can:

- View all available endpoints
- Test the API directly from the browser
- See request/response formats
- View validation rules and examples

## API Endpoints

- `GET /appointment` - List all appointments
- `POST /appointment` - Create a new appointment
- `GET /appointment/{query}` - Find appointment by ID, client name, or CPF
- `DELETE /appointment/{id}` - Cancel an appointment
- `GET /appointment/available-hours` - List available appointment hours

## Error Handling

The API uses consistent error responses:

```json
{
  "code": "error_code",
  "message": "Human readable error message"
}
```

Common error codes:

- `appointment_not_found` - When the requested appointment doesn't exist
- `appointment_past_date` - When trying to create an appointment for a past date
- `invalid_value` - When input validation fails (e.g., invalid CPF format)
