🛒 Green Basket – Grocery E-Commerce Web App
📌 Overview

Green Basket is a full-stack Grocery E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
The platform allows users to browse grocery products, manage their shopping cart, and place orders securely. It also includes seller/admin functionality to manage products and orders efficiently.

This project demonstrates real-world full-stack development including authentication, REST APIs, cloud database integration, and deployment.

🚀 Features
👤 User Features

User Registration & Login (JWT Authentication)

Browse Grocery Products

Add / Remove Items from Cart

Secure Checkout

View Order History

Responsive UI

🛍 Seller/Admin Features

Seller Login

Add New Products

Update Product Details

Delete Products

Manage Orders

🛠 Tech Stack
🔹 Frontend

React.js

Vite

Context API (State Management)

Axios

CSS / Tailwind CSS

🔹 Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Cloudinary (Image Upload)

---

## 🚀 Deployment Guide

This section walks you through deploying the application using cloud services.

### 1. MongoDB Atlas

1. Create a free cluster at [Atlas](https://www.mongodb.com/cloud/atlas).
2. Whitelist your IP or `0.0.0.0/0` (for testing).
3. Add a database user and password.
4. Copy the connection string (replace `<username>` and `<password>`).
5. Migrate local data via MongoDB Compass if needed.

### 2. Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
MONGO_URI=your_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://your-frontend.vercel.app
```

Also configure the same variables in your hosting service (Railway or Vercel).

### 3. Deploy Backend

- **Railway**: create a new project, link GitHub repo, set env vars, deploy.
- **Vercel**: import repo, choose `backend` directory, add env vars.

### 4. Deploy Frontend (Vercel)

1. Create a new Vercel project pointing to `client` folder.
2. Set `VITE_API_URL` env var to backend URL.
3. Deploy.

### 5. Final Testing

- Visit the frontend URL.
- Register/login, add products to cart, and place an order.
- Verify orders appear in MongoDB Atlas.

Good luck! 🎉
