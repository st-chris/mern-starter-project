# MERN Stack Starter (TypeScript) with User Authentication

This repository is a starter template for building full-stack applications using the **MERN stack** (MongoDB, Express, React, Node.js) with **TypeScript**. It includes a robust **user authentication system** featuring JWT-based access tokens and refresh tokens for secure session management.

---

## Features

- **TypeScript** throughout client and server for better developer experience and type safety
- **React** frontend with modern hooks and state management
- **Express** backend API with RESTful endpoints
- **MongoDB** for data persistence
- Secure **user authentication**:
  - Password hashing with bcrypt
  - JWT access tokens for protected routes
  - Refresh tokens for session renewal without re-login
- Separate `client/` and `server/` folders to organize frontend and backend code

---

## Project Structure

- /client # React frontend (TypeScript)
- /server # Express backend API (TypeScript)
- .gitignore
- README.md

## Authentication Flow

- Users register/login with email & password
- Backend:
  - Access token (short-lived)
  - Refresh token (long-lived)
- Client stores tokens securely
- Access token protects API routes
- Refresh token endpoint allows renewing access tokens
