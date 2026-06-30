# 🏋️ FitVerse

FitVerse is a full-stack fitness and trainer booking platform where users can discover fitness classes, book sessions securely using Stripe, interact through a community forum, and apply to become trainers. The platform also includes role-based dashboards for Users, Trainers, and Admins with dedicated management features.

---

## 🌐 Live Demo

* **Client:** https://fitverse-client-delta.vercel.app
* **Server:** https://fitverse-server.onrender.com

---

## ✨ Features

### Authentication

* Email & Password authentication
* Google Sign-In
* JWT Authentication using HTTP-only Cookies
* Protected Routes
* Role-Based Access Control (User, Trainer, Admin)

### User Features

* Browse available fitness classes
* View class details
* Book classes with Stripe payment
* Save favorite classes
* View booking history
* Apply to become a trainer
* Participate in the community forum

### Trainer Features

* Dashboard overview
* Add new fitness classes
* View personal forum posts
* Manage trainer content

### Admin Features

* Dashboard overview with platform statistics
* Manage users
* Promote users to Admin
* Manage classes
* View transaction history

### Community Forum

* Create forum posts
* Upvote and downvote posts
* Comment system
* Reply to comments
* Edit and delete own comments

### Payment System

* Secure payments using Stripe
* Booking created only after successful payment
* Transaction records

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* DaisyUI
* Axios
* React Hook Form
* Firebase Authentication (Google Login)
* Stripe React SDK
* Sonner

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Stripe
* Bcrypt
* Cookie Parser
* CORS

---

## 📂 Project Structure

### Client

* Next.js App Router
* Protected Routes
* Dashboard Layout
* Reusable Components
* API Service Layer

### Server

* Express REST API
* MongoDB Collections
* JWT Authentication
* Role-based Middleware
* Stripe Payment Integration

---

## 📦 Installation

### Clone the repositories

```bash
git clone https://github.com/segfaulted11/fitverse-server

git clone https://github.com/segfaulted11/fitverse-client
```

### Client Setup

```bash
cd client

npm install

npm run dev
```

### Server Setup

```bash
cd server

npm install

npm start
```

---

## 🔑 Environment Variables

### Client

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Server

```env
PORT=

CLIENT_URL=

MONGODB_URI=
DB_NAME=

JWT_SECRET=

STRIPE_SECRET_KEY=
```

---

## 📚 Main Packages Used

### Client

* next
* react
* axios
* react-hook-form
* firebase
* @stripe/react-stripe-js
* @stripe/stripe-js
* sonner
* tailwindcss
* daisyui

### Server

* express
* mongodb
* bcrypt
* jsonwebtoken
* stripe
* cors
* cookie-parser
* dotenv

---

## 👨‍💻 Author

Developed as a full-stack fitness booking platform using the MERN ecosystem with Next.js for the frontend and Express + MongoDB for the backend.
