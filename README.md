# FoodZone - Pure Veg Food Ordering App

A full-stack food ordering web app built during my internship at Ithena Tech.

## Tech Stack
- **Frontend:** React (Vite), React Router, Tailwind CSS
- **Backend:** Spring Boot, Spring Security, JWT, Spring Data JPA
- **Database:** PostgreSQL
- **Build:** Maven, JDK 21

## Features
- Browse a pure veg menu with category filters and photos
- Cart with quantity controls (saved in localStorage)
- Checkout and order history
- JWT signup and login with CUSTOMER and ADMIN roles
- Admin panel: manage menu items and move orders through PLACED > PREPARING > DELIVERED (or CANCELLED)

## Run Locally

### Backend
1. Create a PostgreSQL database named `foodzone`
2. Copy `src/main/resources/application.properties.example` to `application.properties` and fill in your database password and JWT secret
3. Run `mvn spring-boot:run` (starts on http://localhost:8081)

### Frontend
```
cd frontend
npm install
npm run dev
```
Opens on http://localhost:5173

## API Overview
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /api/auth/signup, /api/auth/login | Public |
| GET | /api/menu | Public |
| POST, PUT | /api/menu | Admin |
| POST, GET | /api/orders | Logged-in user |
| GET | /api/admin/orders | Admin |
| PATCH | /api/admin/orders/{id}/status | Admin |