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

In this initial milestone, we covered the following aspects of the project:

1. **Introduction to MERN Stack**: 
   - Overview of MongoDB, Express.js, React.js, and Node.js
   - Understanding the benefits of using a JavaScript-only approach for full-stack development

2. **REST API Structure and Endpoints**:
   - Introduction to RESTful architecture
   - Planning API endpoints for user authentication, product management, and order handling

3. **Database Schema Design Basics**:
   - Introduction to MongoDB schema design
   - Understanding the structure and relationships of data in the e-commerce context

4. **Role of Authentication**:
   - Importance of user authentication in web applications
   - Overview of implementing secure login and registration functionalities

5. **Project Vision and Goals**:
   - Detailed explanation of the e-commerce application's overall vision
   - Discussion of key features to be implemented in upcoming milestones

6. **Live Demonstration**:
   - Observation of the completed application's functionality
   - Overview of user interface and backend integration

---

## Milestone 2: Project Setup and Login Page

In this milestone, we achieved the following:

1. **Project Folder Structure**:
   - Organized project files into separate `frontend` and `backend` directories for better maintainability.

2. **React Frontend Setup**:
   - Initialized a React application for building the user interface.

3. **Node.js Backend Setup**:
   - Set up a simple Node.js server to prepare for API integration in future milestones.

4. **Tailwind CSS Configuration**:
   - Integrated and configured Tailwind CSS for modern, responsive, and utility-based styling.

5. **Login Page Development**:
   - Designed and implemented the first user interface of the application, focusing on functionality and styling.
   - The login page includes a responsive layout with Tailwind CSS and essential input fields for email and password.

6. **GitHub Repository Updates**:
   - Ensured the repository includes:
     - Separate folders for `frontend` and `backend`.
     - The functional Login Page in the `frontend` directory.

---

## Milestone 3: Project Setup for Backend

In this milestone, we focused on setting up the backend of the application:

1. **Backend Folder Structure**:
   - Created a structured hierarchy for organizing routes, controllers, models, and middleware.

2. **Server Setup**:
   - Initialized and configured a Node.js server using Express to handle API requests.
   - Configured the server to listen on a designated port.

3. **Database Connection**:
   - Integrated MongoDB for efficient data storage and confirmed the connection between the server and MongoDB.

4. **Error Handling**:
   - Implemented basic error handling to provide clear error messages for better debugging and user feedback.

5. **GitHub Repository Updates**:
   - Updated the repository with the new backend structure and ensured all changes were committed.

---

## Milestone 4: User Model and File Uploads

In this milestone, we created the necessary components for user management:

1. **User Model**:
   - Designed a User Model to define how user data (like name, email, and password) is stored in the database using MongoDB schemas.

2. **User Controller**:
   - Created a User Controller to manage user data interactions, such as adding new users and retrieving user information.

3. **File Uploads with Multer**:
   - Enabled and configured Multer to allow the application to accept and store files uploaded by users, such as profile pictures.

4. **GitHub Repository Updates**:
   - Updated the repository with the new User Model and Controller, along with Multer configuration.

---

## Milestone 5: Sign-Up Page and Form Validation

In this milestone, we focused on the frontend user registration process:

1. **Sign-Up Page Development**:
   - Built a user-friendly Sign-Up page where users can enter their details (name, email, password) to create an account.

2. **Form Validation**:
   - Implemented form validation to ensure user inputs are correct and in the right format, preventing errors before submission.

3. **GitHub Repository Updates**:
   - Updated the repository with the new Sign-Up page and validation logic.

---

## Milestone 6: Password Encryption and User Data Storage

In this milestone, we enhanced security for user data:

1. **Password Encryption**:
   - Used bcrypt to hash user passwords during signup, ensuring that only encrypted passwords are stored in the database.

2. **Complete User Data Storage**:
   - Saved all user data (e.g., name, email) in the database while ensuring that passwords remain encrypted.

3. **GitHub Repository Updates**:
   - Updated the repository with the password encryption logic and complete user data storage implementation.
  
---

## Milestone 7: User Login Endpoint and Credential Validation

In this milestone, we focused on implementing the user login functionality, ensuring secure authentication through credential validation:

1. **Login Endpoint Creation**:
   - Developed a backend endpoint to accept user credentials (email/username and password).
   - Implemented a route that handles POST requests for user login.

2. **User Data Retrieval**:
   - Retrieved user records from the database based on the provided email/username.
   - Implemented error handling to return a clear message if the user does not exist.

3. **Password Validation**:
   - Utilized bcrypt to hash the entered password and compare it with the stored hashed password.
   - Ensured that the comparison process is secure and efficient, allowing for quick authentication.

4. **Authentication Response**:
   - Provided appropriate responses based on the authentication outcome:
     - If the credentials are valid, the user is authenticated, and a success message is returned.
     - If the credentials are invalid, an error message is sent back to the user.

5. **Security Considerations**:
   - Emphasized the importance of password hashing as a one-way process, ensuring that passwords are never decrypted.
   - Implemented measures to protect against common security threats, such as SQL injection and brute force attacks.

6. **Testing the Login Functionality**:
   - Conducted thorough testing of the login endpoint to ensure it works as expected under various scenarios.
   - Verified that the system correctly handles both successful and failed login attempts.

7. **GitHub Repository Updates**:
   - Committed and pushed the changes to the repository, including the new login endpoint and validation logic.
   - Updated the README to reflect the progress made in this milestone.

---

## Milestone 8: Card Component Creation and Homepage Layout

In this milestone, we focused on enhancing the user interface by creating a reusable card component to showcase products effectively:

1. **Card Component Development**:
   - Designed a reusable card component that accepts product details as props, including product name, image, and price.
   - Ensured the card component is visually appealing and maintains a consistent layout across different products.

2. **Dynamic Rendering of Products**:
   - Implemented array mapping to dynamically render a card for each product in the product list.
   - Passed unique product information to each card, allowing for a personalized display of product details.

3. **Homepage Layout Design**:
   - Set up a grid layout using CSS Grid or Flexbox to organize multiple product cards neatly on the homepage.
   - Ensured that the layout is responsive and adapts well to different screen sizes, enhancing the user experience.

4. **Improved User Experience**:
   - Focused on creating an organized and structured homepage that allows users to easily browse and interact with products.
   - Ensured that the card component design contributes to a clean and visually appealing interface.

5. **Testing and Validation**:
   - Conducted testing to ensure that the card component renders correctly for various products and that the layout remains consistent.
   - Verified that all product details are displayed accurately and that the user interface is intuitive.

6. **GitHub Repository Updates**:
   - Committed and pushed the changes to the repository, including the new card component and homepage layout.
   - Updated the README file to summarize the progress made in this milestone.

---

## Milestone 9: Product Form Creation and Image Uploads

In this milestone, we focused on creating a form for product details and enabling multiple image uploads:

1. **Product Form Development**:
   - Designed a comprehensive form to input all necessary product details, including name, description, price, and category.
   - Ensured the form is user-friendly and visually appealing using Tailwind CSS.

2. **Multiple Image Uploads**:
   - Implemented functionality to allow users to upload multiple images for a product using the file input element.
   - Configured the backend to handle and store multiple images efficiently.

3. **Form Validation**:
   - Added validation to ensure that all required fields are filled out correctly before submission.
   - Provided user feedback for any validation errors to enhance the user experience.

4. **Admin Access Considerations**:
   - Discussed potential features for restricting product uploads to admin users only, enhancing security and control over product listings.

5. **Testing and Validation**:
   - Conducted thorough testing of the product form to ensure all functionalities work as expected, including image uploads and validation.

6. **GitHub Repository Updates**:
   - Committed and pushed the changes to the repository, including the new product form and image upload functionality.
   - Updated the README file to summarize the progress made in this milestone.

![Product Form Screenshot](https://drive.google.com/file/d/1IjgZSDO8ssWdggO0GH5_-P4pHnOpFVGd/view?usp=sharing)
