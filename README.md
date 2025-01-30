# Ecommerce-Follow-Along

## Project Description

This project is a full-fledged E-Commerce Application using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It's designed to provide hands-on experience with real-world development concepts and tools, focusing on building a scalable and feature-rich online shopping platform.

## Key Features

- Built using MERN Stack (MongoDB, Express.js, React.js, Node.js)
- REST API Creation for scalable backend services
- User Authentication for secure login and registration
- Database Schema Design using MongoDB
- Robust Backend Development with Node.js and Express

---

## Milestone 1: Project Overview

- **Introduction to MERN Stack**: Overview of the stack and its benefits.
- **REST API Structure**: Planning endpoints for user authentication and product management.
- **Database Schema Basics**: Understanding MongoDB schema design.
- **Authentication Role**: Importance of secure login and registration.
- **Project Vision**: Discussing key features and goals.
- **Live Demo**: Showcasing the application's functionality.

---

## Milestone 2: Project Setup and Login Page

- **Folder Structure**: Organized `frontend` and `backend` directories.
- **React Setup**: Initialized the React application.
- **Node.js Setup**: Configured a simple Node.js server.
- **Tailwind CSS**: Integrated for responsive styling.
- **Login Page**: Developed a responsive login interface.
- **GitHub Updates**: Committed changes to the repository.

---

## Milestone 3: Project Setup for Backend

- **Backend Structure**: Organized routes, controllers, models, and middleware.
- **Server Setup**: Configured Node.js server with Express.
- **Database Connection**: Integrated MongoDB for data storage.
- **Error Handling**: Implemented basic error handling.
- **GitHub Updates**: Updated repository with backend structure.

```
project-root/
├── backend/
│   ├── routes/         # Defines API routes
│   ├── controllers/    # Contains route handling logic
│   ├── models/         # Defines MongoDB schemas using Mongoose
│   ├── middlewares/    # Includes middleware for error handling
│   ├── config/         # Stores database configuration
│   ├── utils/          # (Optional) Helper functions
│   └── server.js       # Main server file
└── frontend/           # Frontend-related code
```

---

## Milestone 4: User Model and File Uploads

- **User Model**: Designed a schema for user data.
- **User Controller**: Managed user data interactions.
- **File Uploads**: Configured Multer for file uploads.
- **GitHub Updates**: Committed changes for user model and file uploads.

---

## Milestone 5: Sign-Up Page and Form Validation

- **Sign-Up Page**: Developed a user-friendly registration page.
- **Form Validation**: Implemented validation for user inputs.
- **GitHub Updates**: Updated repository with the sign-up page.

---

## Milestone 6: Password Encryption and User Data Storage

- **Password Encryption**: Used bcrypt to hash passwords.
- **User Data Storage**: Saved user data securely in the database.
- **GitHub Updates**: Committed changes for password encryption.

---

## Milestone 7: User Login Endpoint and Credential Validation

- **Login Endpoint**: Created a backend endpoint for user login.
- **User Data Retrieval**: Retrieved user records based on credentials.
- **Password Validation**: Compared hashed passwords securely.
- **Authentication Response**: Provided feedback based on login success.
- **Security Measures**: Implemented protections against common threats.
- **Testing**: Verified login functionality.
- **GitHub Updates**: Updated repository with login endpoint.

---

## Milestone 8: Card Component Creation and Homepage Layout

- **Card Component**: Developed a reusable product card component.
- **Dynamic Rendering**: Implemented mapping for product display.
- **Homepage Layout**: Designed a responsive grid layout.
- **User Experience**: Enhanced browsing and interaction.
- **Testing**: Verified card rendering and layout consistency.
- **GitHub Updates**: Committed changes for card component and layout.

---

## Milestone 9: Product Form Creation and Image Uploads

- **Product Form**: Designed a form for product details.
- **Multiple Image Uploads**: Enabled users to upload multiple images.
- **Form Validation**: Added validation for product inputs.
- **Admin Access**: Discussed restricting uploads to admins.
- **Testing**: Verified form functionality and image uploads.
- **GitHub Updates**: Updated repository with product form.

```
project-root/
├── frontend/
│   ├── dist/               # Production build output
│   ├── node_modules/       # Dependencies
│   ├── src/                # Main source code
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── styles/         # CSS or Tailwind styles
│   │   ├── App.jsx         # Root component
│   │   ├── main.jsx        # React entry point
│   │   ├── index.html      # Main HTML file
│   ├── .gitignore          # Git ignore file
│   ├── eslint.config.js    # ESLint configuration
│   ├── package-lock.json   # Dependency lock file
│   ├── package.json        # Project dependencies and scripts
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # TailwindCSS configuration
│   ├── vite.config.js      # Vite configuration
├── .gitignore              # Global Git ignore file
├── package.json            # Root package file
└── README.md               # Documentation

```

---

## Milestone 10: Product Schema and API Endpoint Creation

- **Product Schema**: Defined product data structure with Mongoose.
- **API Endpoint**: Created a POST endpoint for product data.
- **Data Validation**: Ensured valid data is saved in the database.
- **Testing**: Verified endpoint functionality with Postman.
- **Future Enhancements**: Discussed admin restrictions and user roles.
- **GitHub Updates**: Committed changes for product schema and endpoint.

---

## Milestone 11: Fetching and Displaying Products

- **Backend API**: Created an endpoint to send all product data from MongoDB.
- **Frontend Data Fetching**: Implemented a function to retrieve product data from the backend.
- **Dynamic Display**: Passed fetched data to the `ProductCard` component to render dynamically.
- **Component Reusability**: Utilized `ProductCard` to display multiple products efficiently.
- **Understanding Data Flow**: Learned how to send, receive, and display data using API calls.
- **GitHub Updates**: Committed changes for API integration and dynamic rendering.

```
project-root/
├── backend/
│   ├── config/         # Stores database and multer configurations
│   │   ├── database.js
│   │   └── multer.js
│   ├── controllers/    # Contains route handling logic
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── models/         # Defines MongoDB schemas using Mongoose
│   │   ├── product.model.js
│   │   └── user.model.js
│   ├── routes/         # Defines API routes
│   │   ├── product.routes.js
│   │   └── user.routes.js
│   ├── uploads/        # Stores uploaded files
│   ├── utils/          # (Optional) Helper functions
│   ├── node_modules/   # Node.js dependencies
│   ├── .env            # Environment variables
│   ├── package-lock.json
│   ├── package.json
│   └── server.js       # Main server file
├── frontend/           # Frontend-related code
├── .gitignore          # Git ignore file
├── package.json        # Root package file
└── README.md           # Documentation

```

---

## Milestone 12: My Products Page with User-Specific Product Display

- **Endpoint Creation**: Developed a GET endpoint to fetch all products associated with the logged-in user's email from MongoDB.
- **Frontend Integration**: Wrote a function in the frontend to retrieve user-specific product data from the backend.
- **Dynamic Display**: Utilized the existing product card component to dynamically display the fetched products on the "My Products" page.
- **Data Filtering**: Implemented filtering logic on the backend to ensure only products associated with the user's email are retrieved.
- **Testing**: Verified the functionality of the endpoint and the dynamic display using browser tools and Postman.
- **Future Enhancements**: Considered adding options for editing or deleting user-specific products.
- **GitHub Updates**: Committed all changes related to the endpoint, frontend integration, and dynamic display to the repository.

---
