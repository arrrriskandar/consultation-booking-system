# Consultation Booking System

A full-stack consultation booking system built with **React**, **Express.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

The system allows patients to:

- View available doctors
- View available appointment slots for a selected doctor
- Book an appointment
- Prevent double booking under concurrent requests

The primary focus of this implementation is ensuring **correctness under concurrent booking requests**, while maintaining a clean layered architecture and a simple user experience.

---

# Tech Stack

## Frontend

- React
- TypeScript
- Ant Design
- Axios
- Vite

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Testing

- Mocha
- Chai
- Supertest

---

# Project Structure

```text
consultation-booking-system
│
├── backend
│   ├── prisma
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── repositories
│   │   ├── routes
│   │   ├── services
│   │   └── app.ts
│   └── test
│
└── frontend
    └── src
        ├── api
        ├── components
        ├── pages
        └── types
```

---

# Features

- View doctors
- View available consultation slots
- Book an appointment
- Prevent double booking under concurrent requests
- Meaningful error handling
- Automated concurrency test

---

# API Endpoints

| Method | Endpoint                       | Description                           |
| ------ | ------------------------------ | ------------------------------------- |
| GET    | `/api/doctors`                 | Retrieve all doctors                  |
| GET    | `/api/doctors/:doctorId/slots` | Retrieve available slots for a doctor |
| POST   | `/api/bookings`                | Create a booking                      |

---

# Booking Flow

1. Patient selects a doctor.
2. Available appointment slots are retrieved.
3. Patient selects a slot.
4. Backend attempts to reserve the slot.
5. If successful:
   - Slot status changes from `AVAILABLE` to `BOOKED`
   - Booking is created with status `CONFIRMED`
6. If another request has already reserved the same slot, the request returns **HTTP 409 Conflict**.

---

# Preventing Double Booking

The booking operation is protected using a **database transaction** together with an **atomic conditional update**.

The appointment slot is updated only when its current status is `AVAILABLE`.

If another concurrent request has already reserved the same slot, the update affects zero rows and the booking request is rejected with **HTTP 409 Conflict**.

This guarantees that only one booking can be successfully created for the same appointment slot.

---

# Booking States

For this implementation, bookings are created directly as:

```text
CONFIRMED
```

Additional states such as:

- Pending
- Cancelled
- Completed

were intentionally not implemented to keep the scope focused on the required booking flow and concurrency handling.

---

# Running the Project

## Prerequisites

- Node.js (v20 or later)
- Docker Desktop (or Docker Engine with Docker Compose)

---

## 1. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

This starts a PostgreSQL database with the configuration expected by the backend.

---

## 2. Backend Setup

Navigate to the backend project:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file from `.env.example`.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/consultation_booking?schema=public"
PORT=3000
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply the database schema:

```bash
npx prisma db push
```

Seed the database:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

---

## 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# Running Tests

The automated test suite reseeds the database before execution.

```bash
cd backend

npm test
```

The concurrency test verifies that two simultaneous booking requests for the same appointment slot result in:

- Exactly one successful booking (HTTP 201)
- Exactly one rejected booking (HTTP 409 Conflict)
- Exactly one booking record persisted in the database

---

# Design Decisions

## Layered Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

Each layer has a single responsibility:

- **Controller** – Handles HTTP requests and responses.
- **Service** – Contains business logic.
- **Repository** – Encapsulates database access.
- **Prisma** – ORM for interacting with PostgreSQL.

This separation improves readability, maintainability, and testability.

---

## Transaction

Booking creation and appointment slot reservation are executed within a single database transaction to ensure consistency.

If any step fails, the transaction is rolled back.

---

## Optimistic Concurrency Control

To prevent double booking, the application uses an atomic conditional update rather than explicit database locks.

The appointment slot is updated only if:

```text
status = AVAILABLE
```

If another concurrent request has already booked the slot:

- Zero rows are updated.
- The booking is rejected.
- The API returns **HTTP 409 Conflict**.

This approach keeps the implementation simple while remaining safe under concurrent requests.

---

# Assumptions & Scope

To keep the implementation focused on the assignment requirements, the following features were intentionally excluded:

- User authentication and authorization
- Appointment cancellation
- Additional booking lifecycle states (Pending, Cancelled, Completed)
- Pagination and filtering
- Cloud deployment

The implementation prioritizes correctness, concurrency handling, and maintainable architecture over additional features.
