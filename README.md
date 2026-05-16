# ShimmerNest ✨

ShimmerNest is a premium handmade crochet e-commerce platform built with the MERN stack.

## ✨ Features

- **Dynamic Homepage**: Categorized view of handcrafted treasures with beautiful animations.
- **Advanced Admin Dashboard**: Manage orders, inventory, and site configuration with ease.
- **Secure Backend**: Rate limiting to prevent abuse and centralized error handling.
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Modern UI/UX**: Sparkle effects, smooth transitions, and a "Scroll to Top" feature.

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Security**: express-rate-limit, JWT (planned), CORS

## 🚀 Getting Started

### Backend
1. `cd server`
2. `npm install`
3. Create a `.env` file with `MONGO_URI` and `PORT`.
4. `npm start` (or `node server.js`)

### Frontend
1. `cd client`
2. `npm install`
3. Create a `.env` file with `REACT_APP_API_URL`.
4. `npm start`

## 📝 Recent Improvements

- Refactored `Home.js` and `App.js` into modular components.
- Added `express-rate-limit` to protect API endpoints.
- Implemented a centralized `errorMiddleware` for consistent error handling.
- Added a floating "Scroll to Top" button for improved navigation.
- Enhanced mobile responsiveness of the category grid.
