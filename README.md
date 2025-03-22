🐦 X Clone Backend
Welcome to the X Clone Backend! This is the backend service for a full-featured X-like application built using the MERN (MongoDB, Express, React, Node.js) stack.

✅ Backend Complete
✅ Fully Tested on Postman
✅ Ready for Deployment

🚀 Features
✔ User Authentication (JWT-based login/register)
✔ CRUD Operations for Tweets (Create, Read, Update, Delete)
✔ Follow/Unfollow Users
✔ Like & Retweet Functionality
✔ Commenting on Tweets
✔ Real-time Updates (Future WebSockets Implementation)

🛠 Tech Stack
🔹 Node.js - JavaScript runtime environment
🔹 Express.js - Backend framework
🔹 MongoDB + Mongoose - NoSQL database & ODM
🔹 JWT (JSON Web Token) - Secure authentication
🔹 Postman - API testing

📌 Installation & Setup
Prerequisites
Ensure you have the following installed:
🔹 Node.js
🔹 MongoDB/Atlas

Steps to Run the Backend
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/twitter-clone-backend.git
   cd twitter-clone-backend

2. Install dependencies:
   ```
   npm install

3. Create a .env file in the root directory and configure the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

4. Start the development server:
   ```
   npm run dev
   
The backend should now be running at http://localhost:5000

🔗 API Endpoints
🔐 Auth Routes
📌 POST /api/auth/register ➝ Register a new user
📌 POST /api/auth/login ➝ Login & get JWT token

👤 User Routes
📌 GET /api/users/:id ➝ Get user details
📌 POST /api/users/follow/:id ➝ Follow/unfollow user

📝 Tweet Routes
📌 POST /api/tweets ➝ Create a tweet
📌 GET /api/tweets ➝ Get all tweets
📌 DELETE /api/tweets/:id ➝ Delete a tweet



























   
