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

- Node.js
- PostgreSQL

---

## Backend

Install dependencies

```bash
cd backend
npm install
```

Create a `.env` file

```env
DATABASE_URL=your_database_connection_string
PORT=3000
```

Seed the database

```bash
npm run seed
```

Start the backend

```bash
npm run dev
```

---

## Frontend

Install dependencies

```bash
cd frontend
npm install
```

Start the frontend

```bash
npm run dev
```

---

# Running Tests

The automated test suite resets the database before execution.

```bash
cd backend
npm test
```

The test verifies that two concurrent booking requests for the same appointment slot result in:

- Exactly one successful booking (HTTP 201)
- Exactly one rejected booking (HTTP 409)
- Exactly one booking record stored in the database

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

Responsibilities are separated to improve maintainability and testability.

---

## Transaction

Booking creation and slot reservation are executed within a single database transaction to ensure data consistency.

---

## Optimistic Concurrency Control

Instead of locking database rows, the application performs an atomic conditional update.

- The slot is updated only if its current status is `AVAILABLE`.
- If another request has already booked the slot, no rows are updated.
- The request returns **HTTP 409 Conflict**.

This approach prevents double booking while remaining simple and scalable.

---

# Future Improvements

Potential enhancements include:

- Authentication and authorization
- Booking cancellation
- Additional booking lifecycle states
- Pagination and filtering
- Deployment to a cloud environment
- CI/CD pipeline
