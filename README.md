# 🏠 Flatmates

**Flatmates** is a full-stack web application that helps users **list, search, and find flatmates or roommates** within a city. Whether you're moving to a new place or looking for someone to share your apartment, Flatmates offers an easy-to-use platform to connect with potential roommates.

Live Demo: [https://flatmates.vercel.app](https://flatmates.vercel.app)

---

## 🚀 Features

- 👤 User Authentication (Signup, Login, Logout)
- 📋 Create and Manage Listings
- 💾 Save Listings for Later
- 🔍 Search and Filter Listings
- 🗑️ Delete Listings
- 🧠 Responsive and modern UI
- 🔐 JWT-based Auth and bcrypt password hashing
- 💡 Clean UX with toast notifications

---

## 🛠️ Tech Stack

### Frontend
- [React.js](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (state management)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (for fast development)
- [Vercel](https://vercel.com/) (for frontend deployment)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
- [Render](https://render.com/) (for backend deployment)

---

## 📂 Folder Structure

```
/client
├── components         # Reusable React components
├── pages              # Route-based pages
├── redux              # Redux Toolkit store and slices
├── assets             # Images and static files
└── styles             # Tailwind and global styles

/server
├── controllers        # Logic for listing and auth routes
├── models             # Mongoose models (User, Listing)
├── routes             # Express route handlers
├── middleware         # JWT auth, error handling
└── config             # DB connection and environment configs
```

---

## 🔐 Environment Variables


**Backend (`.env`)**

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Getting Started

```bash
# Clone the repo
git clone https://github.com/sushilkrg/flatmates-backend.git
cd flatmates-backend

# Install backend dependencies
npm install

# Start the backend
npm run dev
```

---

## 📸 Screenshots

![Screenshot (191)](https://github.com/user-attachments/assets/438afe3f-a724-48b4-baf7-f93a709bfe5b)

![Screenshot (190)](https://github.com/user-attachments/assets/32cc6c0e-ff5f-43d9-8172-2571af0c00e7)


---

## ✍️ Author

**Sushil Kumar**  
---

## ⭐️ Star the Repo

If you find this project helpful, please consider giving it a ⭐️ to show your support!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
