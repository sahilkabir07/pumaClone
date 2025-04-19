# 🐾 Puma Clone – Full Stack E-Commerce Application

A full-stack e-commerce web application inspired by [PUMA](# 🐾 Puma Clone – Full Stack E-Commerce Application

A full-stack e-commerce web application inspired by [PUMA](https://puma-clone-zpmn.vercel.app/), built with **React**, **Node.js**, **Express.js**, **MongoDB**, and **JWT-based authentication**.

> 🔐 Recently migrated from Firebase Authentication to a fully custom **JWT Auth system** for enhanced control, scalability, and real-world backend integration.

---

## 🚀 Tech Stack

### Frontend

- ✅ React.js with React Router DOM
- ✅ Tailwind CSS for responsive, utility-first styling
- ✅ Axios for API communication
- ✅ JWT token-based authentication stored in `localStorage`

### Backend

- ✅ Node.js + Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT for secure authentication
- ✅ bcrypt.js for password hashing and protection

---

## 🔐 Authentication Flow

- Users sign up and log in using **email & password**
- Backend generates a **JWT token** on login
- Token is stored in `localStorage` on the frontend
- Authenticated requests include token in the `Authorization` header
- Express middleware validates the token before allowing access to protected routes

---

## 🛒 Core Features

- 🔐 Secure Signup & Login (JWT Auth)
- 👟 Dynamic product listings (Men, Women, Kids categories)
- 🛍️ Add to Cart (Stored in MongoDB per user)
- ➖ Decrease Item Quantity
- ❌ Remove Item from Cart
- 🧹 Clear Cart Functionality
- ❤️ Like/Wishlist system
- 🔍 Global Search Bar
- 👤 Auth-protected Routes
- 🚪 Logout Functionality

---

## 📁 Project Structure

```bash
pumaClone/
├── client/             # Frontend React App
│   ├── public/
│   └── src/
│       ├── components/ # Reusable components (Header, ProductCard, etc.)
│       ├── pages/      # Page-based routes (Home, Login, Cart, etc.)
│       ├── utils/      # Utility functions (e.g., addToCart.js)
│       └── App.jsx
├── server/             # Express.js Backend
│   ├── models/         # Mongoose Models (User, Cart, Product)
│   ├── routes/         # API Routes (auth, cart, products)
│   ├── middleware/     # JWT Auth middleware
│   └── server.js
└── README.md
), built with **React**, **Node.js**, **Express.js**, **MongoDB**, and **JWT-based authentication**.

> 🔐 Recently migrated from Firebase Authentication to a fully custom **JWT Auth system** for enhanced control, scalability, and real-world backend integration.

---

## 🚀 Tech Stack

### Frontend

- ✅ React.js with React Router DOM
- ✅ Tailwind CSS for responsive, utility-first styling
- ✅ Axios for API communication
- ✅ JWT token-based authentication stored in `localStorage`

### Backend

- ✅ Node.js + Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT for secure authentication
- ✅ bcrypt.js for password hashing and protection

---

## 🔐 Authentication Flow

- Users sign up and log in using **email & password**
- Backend generates a **JWT token** on login
- Token is stored in `localStorage` on the frontend
- Authenticated requests include token in the `Authorization` header
- Express middleware validates the token before allowing access to protected routes

---

## 🛒 Core Features

- 🔐 Secure Signup & Login (JWT Auth)
- 👟 Dynamic product listings (Men, Women, Kids categories)
- 🛍️ Add to Cart (Stored in MongoDB per user)
- ➖ Decrease Item Quantity
- ❌ Remove Item from Cart
- 🧹 Clear Cart Functionality
- ❤️ Like/Wishlist system
- 🔍 Global Search Bar
- 👤 Auth-protected Routes
- 🚪 Logout Functionality

---

## 📁 Project Structure

```bash
pumaClone/
├── client/             # Frontend React App
│   ├── public/
│   └── src/
│       ├── components/ # Reusable components (Header, ProductCard, etc.)
│       ├── pages/      # Page-based routes (Home, Login, Cart, etc.)
│       ├── utils/      # Utility functions (e.g., addToCart.js)
│       └── App.jsx
├── server/             # Express.js Backend
│   ├── models/         # Mongoose Models (User, Cart, Product)
│   ├── routes/         # API Routes (auth, cart, products)
│   ├── middleware/     # JWT Auth middleware
│   └── server.js
└── README.md
